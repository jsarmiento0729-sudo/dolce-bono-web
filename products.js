/**
 * =========================================================================
 * 🥖 CATÁLOGO DE PRODUCTOS - DOLCE BONO
 * =========================================================================
 * Para agregar un nuevo producto, solo copia uno de los bloques y completa:
 * - id: Identificador único sin espacios (ej: "mi-producto")
 * - name: Nombre del producto
 * - category: 'pan-de-bono', 'cafeteria', 'frappes', 'matcha-frios', o 'combos'
 * - price: Precio en USD ($)
 * - image: Ruta de la foto (ej: 'imagenes/IMG_3025.JPG' o 'fotos/CAFE.jpg')
 * - badge: Etiqueta opcional (ej: 'Nuevo ⭐', 'Favorito', 'Top Ventas', o dejar en "")
 * - badgeColor: Color de la etiqueta (ej: 'bg-[#1B5E55] text-[#C49F60]', 'bg-[#C49F60] text-white')
 * - description: Breve descripción de ingredientes y sabor
 * =========================================================================
 */

const categories = [
    { id: "todos", name: "✨ Todos", icon: "fa-border-all" },
    { id: "pan-de-bono", name: "🥐 Pan de Bono", icon: "fa-bread-slice" },
    { id: "cafeteria", name: "☕ Cafetería", icon: "fa-mug-hot" },
    { id: "frappes", name: "🍦 Frappés & Malteadas", icon: "fa-ice-cream" },
    { id: "matcha-frios", name: "🍵 Matcha & Fríos", icon: "fa-glass-water" },
    { id: "combos", name: "🎁 Combos Break", icon: "fa-box-open" }
];

const products = [
    // -------------------------------------------------------------
    // 🥐 1. PAN DE BONO TRADICIONAL & GOURMET
    // -------------------------------------------------------------
    {
        id: "pdb-tradicional",
        name: "Pan de Bono Tradicional",
        category: "pan-de-bono",
        price: 1.50,
        image: "imagenes/IMG_3025.JPG",
        badge: "El Clásico",
        badgeColor: "bg-[#1B5E55] text-[#C49F60]",
        description: "100% almidón de yuca y queso fresco seleccionado. Horneado al momento con textura suave y dorada."
    },
    {
        id: "pdb-pistacho",
        name: "Pan de Bono Relleno Pistacho",
        category: "pan-de-bono",
        price: 2.50,
        image: "imagenes/PSX_20240403_181921.jpg",
        badge: "Favorito ⭐",
        badgeColor: "bg-[#C49F60] text-white",
        description: "Masa tradicional rellena de auténtica crema de pistacho importada con tropezones crocantes."
    },
    {
        id: "pdb-arequipe",
        name: "Pan de Bono Relleno Arequipe",
        category: "pan-de-bono",
        price: 2.00,
        image: "imagenes/PSX_20240403_181949.jpg",
        badge: "Dulce",
        badgeColor: "bg-[#1B5E55] text-white",
        description: "Relleno generoso de arequipe artesanal cremoso que contrasta perfectamente con la sal del queso."
    },
    {
        id: "pdb-nutella",
        name: "Pan de Bono Nutella / Chocolate",
        category: "pan-de-bono",
        price: 2.20,
        image: "imagenes/PSX_20240403_182000.jpg",
        badge: "Especial",
        badgeColor: "bg-amber-800 text-white",
        description: "Relleno fundido de crema de avellanas y chocolate para los amantes del dulce."
    },
    {
        id: "pdb-caja-6",
        name: "Caja Degustación (6 Unidades)",
        category: "pan-de-bono",
        price: 9.50,
        image: "imagenes/IMG_3026.JPG",
        badge: "Para Compartir",
        badgeColor: "bg-[#C49F60] text-white",
        description: "Caja surtida con 3 tradicionales y 3 con rellenos a tu elección. Ideal para regalar o compartir."
    },

    // -------------------------------------------------------------
    // ☕ 2. CAFETERÍA DE ESPECIALIDAD
    // -------------------------------------------------------------
    {
        id: "cafe-latte",
        name: "Café Latte Especial",
        category: "cafeteria",
        price: 2.50,
        image: "fotos/CAFE.jpg",
        badge: "Especialidad",
        badgeColor: "bg-[#1B5E55] text-[#C49F60]",
        description: "Espresso doble de granos seleccionados con leche perfectamente texturizada y arte latte."
    },
    {
        id: "cafe-latte-baileys",
        name: "Café Latte con Baileys",
        category: "cafeteria",
        price: 4.00,
        image: "fotos/CAFE LATTE BAILYS.jpg",
        badge: "Premium 🍸",
        badgeColor: "bg-[#C49F60] text-white",
        description: "Combinación sublime de café de especialidad, leche cremada y un toque de crema irlandesa Baileys."
    },
    {
        id: "cafe-latte-pistacho",
        name: "Latte Pistacho Caliente",
        category: "cafeteria",
        price: 3.80,
        image: "fotos/LATTE PISTACHO.jpg",
        badge: "Imperdible",
        badgeColor: "bg-[#1B5E55] text-white",
        description: "Infusión aromática de pasta de pistacho con espresso doble y leche sedosa."
    },
    {
        id: "cafe-mocaccino",
        name: "Mocaccino Dolce",
        category: "cafeteria",
        price: 3.20,
        image: "fotos/MOCACCINNO.jpg",
        badge: "Cacao",
        badgeColor: "bg-amber-900 text-white",
        description: "Cacao puro venezolano, espresso intenso y crema chantilly con virutas de chocolate."
    },
    {
        id: "cafe-chocolate-caliente",
        name: "Chocolate Caliente Artesanal",
        category: "cafeteria",
        price: 2.80,
        image: "fotos/CHOCOLATE.jpg",
        badge: "100% Cacao",
        badgeColor: "bg-[#1B5E55] text-[#C49F60]",
        description: "Elaborado con cacao venezolano puro, espeso, aromático y reconfortante."
    },

    // -------------------------------------------------------------
    // 🍦 3. FRAPPÉS & MALTEADAS
    // -------------------------------------------------------------
    {
        id: "frappe-clasico",
        name: "Frappuccino Clásico",
        category: "frappes",
        price: 3.50,
        image: "fotos/FRAPUCCINNO.jpg",
        badge: "Refrescante",
        badgeColor: "bg-[#1B5E55] text-white",
        description: "Café batido con hielo, leche y coronado con abundante crema chantilly y sirope."
    },
    {
        id: "frappe-brownie",
        name: "Frappé Brownie Especial",
        category: "frappes",
        price: 4.50,
        image: "fotos/FRAPUCCINO BROWNIE.JPG",
        badge: "Top Ventas 🍫",
        badgeColor: "bg-[#C49F60] text-white",
        description: "Base cremosa de chocolate y café con trozos de brownie húmedo y fudge de chocolate."
    },
    {
        id: "malteada-toddy",
        name: "Malteada de Toddy",
        category: "frappes",
        price: 4.00,
        image: "fotos/TODDY.JPG",
        badge: "Tradición",
        badgeColor: "bg-amber-800 text-white",
        description: "Nuestra clásica y cremosa malteada preparada con auténtico Toddy venezolano y chantilly."
    },
    {
        id: "malteada-arequipe",
        name: "Malteada de Arequipe",
        category: "frappes",
        price: 4.00,
        image: "fotos/MALTEADA DE AREQUIPE.jpg",
        badge: "Cremosa",
        badgeColor: "bg-[#C49F60] text-white",
        description: "Helado artesanal de vainilla con capas de arequipe y topping crujiente."
    },
    {
        id: "malteada-fresa",
        name: "Malteada de Fresa Natural",
        category: "frappes",
        price: 3.80,
        image: "fotos/MALTEADA DE FRESA.jpg",
        badge: "Frutal",
        badgeColor: "bg-rose-700 text-white",
        description: "Fresas frescas seleccionadas, helado cremoso y sirope artesanal de frutos rojos."
    },

    // -------------------------------------------------------------
    // 🍵 4. MATCHA & ESPECIALES FRÍOS
    // -------------------------------------------------------------
    {
        id: "matcha-verde",
        name: "Matcha Verde Ceremonial",
        category: "matcha-frios",
        price: 3.80,
        image: "fotos/MATCHA VERDE.jpg",
        badge: "Antioxidante 🍵",
        badgeColor: "bg-[#1B5E55] text-white",
        description: "Té verde matcha grado ceremonial japonés batido con leche fría o caliente a tu gusto."
    },
    {
        id: "matcha-frutos-rojos",
        name: "Matcha Frutos Rojos",
        category: "matcha-frios",
        price: 4.20,
        image: "fotos/MATCHA FRUTOS ROJOS.jpg",
        badge: "Fusión",
        badgeColor: "bg-rose-800 text-white",
        description: "Capa de compota de frutos rojos naturales, leche sedosa y matcha ceremonial espumoso."
    },
    {
        id: "matcha-mango",
        name: "Matcha Mango Tropical",
        category: "matcha-frios",
        price: 4.20,
        image: "fotos/MATCHA MANGO.jpg",
        badge: "Exótico",
        badgeColor: "bg-[#C49F60] text-white",
        description: "Combinación refrescante de pulpa de mango natural con el perfil herbal del matcha."
    },
    {
        id: "avena-calena",
        name: "Avena Caleña Cremosa",
        category: "matcha-frios",
        price: 2.80,
        image: "fotos/AVENA CALEÑA.jpg",
        badge: "Tradicional",
        badgeColor: "bg-[#1B5E55] text-[#C49F60]",
        description: "Receta casera bien fría con canela aromática, leche condensada y textura súper cremosa."
    },
    {
        id: "frappe-mango",
        name: "Frappé Tropical de Mango",
        category: "matcha-frios",
        price: 3.20,
        image: "fotos/MANGO.jpg",
        badge: "100% Fruta",
        badgeColor: "bg-amber-600 text-white",
        description: "Batido granizado de mango dulce natural, sin conservantes, ideal para refrescar tu tarde."
    },

    // -------------------------------------------------------------
    // 🎁 5. COMBOS DOLCE BREAK
    // -------------------------------------------------------------
    {
        id: "combo-break-clasico",
        name: "Combo Break Clásico",
        category: "combos",
        price: 5.00,
        image: "imagenes/IMG_4746.JPG",
        badge: "Ahorro ⭐",
        badgeColor: "bg-[#C49F60] text-white",
        description: "Incluye 2 Panes de Bono Tradicionales recién horneados + 1 Café Latte Especial."
    },
    {
        id: "combo-pistacho-lover",
        name: "Combo Pistacho Lover",
        category: "combos",
        price: 6.00,
        image: "imagenes/PSX_20240403_181921.jpg",
        badge: "Favorito",
        badgeColor: "bg-[#1B5E55] text-[#C49F60]",
        description: "1 Pan de Bono relleno de Pistacho + 1 Latte de Pistacho (caliente o frío)."
    },
    {
        id: "combo-toddy-bono",
        name: "Combo Toddy & Bono",
        category: "combos",
        price: 6.50,
        image: "fotos/TODDY2.jpg",
        badge: "Doble Delicia",
        badgeColor: "bg-amber-900 text-white",
        description: "1 Malteada de Toddy con chantilly + 2 Panes de Bono calientitos."
    }
];
