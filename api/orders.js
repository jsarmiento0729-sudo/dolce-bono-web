import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
    // Enable CORS for frontend requests
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    const databaseUrl = process.env.DATABASE_URL;

    // GET /api/orders - List all orders with full details for Admin Dashboard
    if (req.method === 'GET') {
        if (!databaseUrl) {
            return res.status(200).json({
                message: "Neon Database URL not configured yet. Set DATABASE_URL in Vercel environment variables.",
                orders: []
            });
        }

        try {
            const sql = neon(databaseUrl);
            const orders = await sql`
                SELECT 
                    id, 
                    correlativo, 
                    cliente_nombre, 
                    cliente_telefono, 
                    tipo_entrega, 
                    direccion_delivery,
                    metodo_pago,
                    referencia_pago,
                    comprobante_img,
                    notas,
                    total, 
                    items, 
                    estado, 
                    creado_en
                FROM pedidos
                ORDER BY creado_en DESC
                LIMIT 100;
            `;
            return res.status(200).json({ success: true, count: orders.length, orders });
        } catch (error) {
            console.error('Error fetching orders:', error);
            return res.status(500).json({ error: 'Error al consultar pedidos en la base de datos', details: error.message });
        }
    }

    // PATCH /api/orders - Update order status (Admin)
    if (req.method === 'PATCH') {
        if (!databaseUrl) {
            return res.status(400).json({ error: 'DATABASE_URL no configurada' });
        }

        try {
            const { id, estado } = req.body || {};
            if (!id || !estado) {
                return res.status(400).json({ error: 'Se requiere id y nuevo estado' });
            }

            const sql = neon(databaseUrl);
            const updated = await sql`
                UPDATE pedidos
                SET estado = ${estado}, actualizado_en = CURRENT_TIMESTAMP
                WHERE id = ${id}
                RETURNING id, correlativo, estado, actualizado_en;
            `;

            if (updated.length === 0) {
                return res.status(404).json({ error: 'Pedido no encontrado' });
            }

            return res.status(200).json({ success: true, order: updated[0] });
        } catch (error) {
            console.error('Error updating order:', error);
            return res.status(500).json({ error: 'Error al actualizar pedido', details: error.message });
        }
    }

    // POST /api/orders - Create new order
    if (req.method === 'POST') {
        try {
            const {
                cliente_nombre,
                cliente_telefono,
                tipo_entrega,
                direccion_delivery,
                metodo_pago,
                referencia_pago,
                comprobante_img,
                notas,
                total,
                items,
                correlativo_propuesto
            } = req.body || {};

            // Basic validation
            if (!cliente_nombre || !cliente_telefono || !items || !Array.isArray(items) || items.length === 0) {
                return res.status(400).json({
                    error: 'Datos incompletos. Se requiere nombre, teléfono y al menos un producto en el pedido.'
                });
            }

            // Generate unique correlative
            const randomCode = Math.floor(1000 + Math.random() * 9000);
            const correlativo = correlativo_propuesto || `#DB-${randomCode}`;

            // If Neon database is configured, insert into PostgreSQL
            if (databaseUrl) {
                const sql = neon(databaseUrl);

                // Auto-create table if it doesn't exist
                await sql`
                    CREATE TABLE IF NOT EXISTS pedidos (
                        id SERIAL PRIMARY KEY,
                        correlativo VARCHAR(20) UNIQUE NOT NULL,
                        cliente_nombre VARCHAR(150) NOT NULL,
                        cliente_telefono VARCHAR(50) NOT NULL,
                        tipo_entrega VARCHAR(50) NOT NULL,
                        direccion_delivery TEXT,
                        metodo_pago VARCHAR(50) NOT NULL,
                        referencia_pago VARCHAR(100),
                        comprobante_img TEXT,
                        notas TEXT,
                        total NUMERIC(10, 2) NOT NULL,
                        items JSONB NOT NULL,
                        estado VARCHAR(30) DEFAULT 'Pendiente',
                        creado_en TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                        actualizado_en TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
                    );
                `;

                // Add columns if table already existed without them
                await sql`ALTER TABLE pedidos ADD COLUMN IF NOT EXISTS referencia_pago VARCHAR(100);`;
                await sql`ALTER TABLE pedidos ADD COLUMN IF NOT EXISTS comprobante_img TEXT;`;

                // Insert the new order
                const result = await sql`
                    INSERT INTO pedidos (
                        correlativo,
                        cliente_nombre,
                        cliente_telefono,
                        tipo_entrega,
                        direccion_delivery,
                        metodo_pago,
                        referencia_pago,
                        comprobante_img,
                        notas,
                        total,
                        items,
                        estado
                    ) VALUES (
                        ${correlativo},
                        ${cliente_nombre},
                        ${cliente_telefono},
                        ${tipo_entrega || 'Pasaje Pirineos'},
                        ${direccion_delivery || null},
                        ${metodo_pago || 'Pago Móvil'},
                        ${referencia_pago || null},
                        ${comprobante_img || null},
                        ${notas || null},
                        ${total || 0},
                        ${JSON.stringify(items)},
                        'Pendiente'
                    )
                    RETURNING id, correlativo, creado_en;
                `;

                return res.status(201).json({
                    success: true,
                    saved_in_db: true,
                    correlativo: result[0].correlativo,
                    order_id: result[0].id,
                    creado_en: result[0].creado_en,
                    message: "Pedido guardado con éxito en Neon PostgreSQL"
                });
            } else {
                // Fallback for local preview without DATABASE_URL
                return res.status(200).json({
                    success: true,
                    saved_in_db: false,
                    correlativo: correlativo,
                    message: "Pedido procesado (DATABASE_URL no configurada aún en Vercel)"
                });
            }
        } catch (error) {
            console.error('Error creating order:', error);
            return res.status(500).json({
                error: 'Error al registrar el pedido en la base de datos',
                details: error.message
            });
        }
    }

    return res.status(405).json({ error: 'Método no permitido' });
}
