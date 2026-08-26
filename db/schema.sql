-- ==========================================================
-- ESTRUCTURA DE BASE DE DATOS PARA DOLCE BONO (NEON POSTGRES)
-- ==========================================================

-- 1. Tabla Principal: Pedidos
CREATE TABLE IF NOT EXISTS pedidos (
    id SERIAL PRIMARY KEY,
    correlativo VARCHAR(20) UNIQUE NOT NULL,
    cliente_nombre VARCHAR(150) NOT NULL,
    cliente_telefono VARCHAR(50) NOT NULL,
    tipo_entrega VARCHAR(50) NOT NULL,            -- 'Pasaje Pirineos', 'Multi Plazas', 'Delivery'
    direccion_delivery TEXT,                      -- Dirección si tipo_entrega es 'Delivery'
    metodo_pago VARCHAR(50) NOT NULL,             -- 'Pago Móvil', 'Bancolombia', 'Zelle'
    referencia_pago VARCHAR(100),                 -- Número de referencia o últimos dígitos
    comprobante_img TEXT,                         -- Comprobante de pago en imagen (Base64 / URL)
    notas TEXT,                                   -- Indicaciones opcionales del cliente
    total NUMERIC(10, 2) NOT NULL,               -- Monto total en USD ($)
    items JSONB NOT NULL,                         -- Lista de productos [{ id, name, price, qty, subtotal }]
    estado VARCHAR(30) DEFAULT 'Pendiente',       -- 'Pendiente', 'En preparación', 'Entregado', 'Cancelado'
    creado_en TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    actualizado_en TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Si la tabla ya existía, añadir las columnas nuevas si no existen:
ALTER TABLE pedidos ADD COLUMN IF NOT EXISTS referencia_pago VARCHAR(100);
ALTER TABLE pedidos ADD COLUMN IF NOT EXISTS comprobante_img TEXT;

-- 2. Índices para optimizar consultas rápidas
CREATE INDEX IF NOT EXISTS idx_pedidos_correlativo ON pedidos(correlativo);
CREATE INDEX IF NOT EXISTS idx_pedidos_telefono ON pedidos(cliente_telefono);
CREATE INDEX IF NOT EXISTS idx_pedidos_referencia ON pedidos(referencia_pago);
CREATE INDEX IF NOT EXISTS idx_pedidos_fecha ON pedidos(creado_en DESC);
CREATE INDEX IF NOT EXISTS idx_pedidos_estado ON pedidos(estado);
