# 🥖 Dolce Bono Web & Menú Digital

Sitio web oficial y Menú Digital Interactivo de Dolce Bono con carrito de compras, confirmación por WhatsApp y almacenamiento en **Neon Serverless PostgreSQL** listo para desplegar en **Vercel**.

---

## 🗄️ 1. Estructura de la Base de Datos (Neon PostgreSQL)

Puedes crear la tabla ejecutando el script [`db/schema.sql`](./db/schema.sql) en la consola SQL de Neon ([console.neon.tech](https://console.neon.tech)):

```sql
CREATE TABLE IF NOT EXISTS pedidos (
    id SERIAL PRIMARY KEY,
    correlativo VARCHAR(20) UNIQUE NOT NULL,
    cliente_nombre VARCHAR(150) NOT NULL,
    cliente_telefono VARCHAR(50) NOT NULL,
    tipo_entrega VARCHAR(50) NOT NULL,            -- 'Pasaje Pirineos', 'Multi Plazas', 'Delivery'
    direccion_delivery TEXT,                      -- Dirección si tipo_entrega es 'Delivery'
    metodo_pago VARCHAR(50) NOT NULL,             -- 'Pago Móvil', 'Efectivo USD / Bs', 'Zelle', 'Punto de Venta'
    notas TEXT,                                   -- Indicaciones opcionales del cliente
    total NUMERIC(10, 2) NOT NULL,               -- Monto total en USD ($)
    items JSONB NOT NULL,                         -- Lista de productos [{ id, name, price, qty, subtotal }]
    estado VARCHAR(30) DEFAULT 'Pendiente',       -- 'Pendiente', 'En preparación', 'Entregado', 'Cancelado'
    creado_en TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    actualizado_en TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_pedidos_correlativo ON pedidos(correlativo);
CREATE INDEX IF NOT EXISTS idx_pedidos_telefono ON pedidos(cliente_telefono);
CREATE INDEX IF NOT EXISTS idx_pedidos_fecha ON pedidos(creado_en DESC);
```

---

## 🚀 2. Pasos para Subir a Vercel

1. **Sube tus cambios a GitHub**:
   ```bash
   git add .
   git commit -m "Menú digital con carrito, Neon DB y WhatsApp"
   git push origin main
   ```

2. **Importa tu repositorio en Vercel**:
   - Entra a [vercel.com](https://vercel.com) e inicia sesión.
   - Haz clic en **"Add New..."** > **"Project"**.
   - Selecciona tu repositorio `dolce-bono-web`.

3. **Configura la Variable de Entorno de Neon**:
   - En la sección **Environment Variables** en Vercel, agrega:
     - **Key**: `DATABASE_URL`
     - **Value**: Tu connection string de Neon (ejemplo: `postgresql://neondb_owner:password@ep-xyz.us-east-2.aws.neon.tech/neondb?sslmode=require`).
   - Haz clic en **Deploy**.

---

## 🔌 3. Endpoints Disponibles en Vercel

- `POST /api/orders`: Registra un nuevo pedido en Neon DB, genera el correlativo y responde con el estado.
- `GET /api/orders`: Consulta los últimos 50 pedidos registrados en la base de datos.
