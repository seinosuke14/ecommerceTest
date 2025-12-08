import Products from './products';
import Categoria from './categoria';
import Productoxcategoria from './productoxcategoria';
import ProductImg from './productimg';
import Menu from './menu';
import MenuProducto from './menuxproducto';
import Venta from './ventas';
import DetalleVenta from './detalleventa';
import User from './users';



// Relación Many-to-Many: Products <-> Categorias
Products.belongsToMany(Categoria, {
    through: Productoxcategoria,
    foreignKey: 'producto_id',
    otherKey: 'categoria_id',
    as: 'categorias'
});

Categoria.belongsToMany(Products, {
    through: Productoxcategoria,
    foreignKey: 'categoria_id',
    otherKey: 'producto_id',
    as: 'productos'
});

// asociaciones de menus y productos

Menu.belongsToMany(Products, {
    through: MenuProducto,
    foreignKey: 'menu_id',
    otherKey: 'producto_id',
    as: 'productos'
});

Products.belongsToMany(Menu, {
    through: MenuProducto,
    foreignKey: 'producto_id',
    otherKey: 'menu_id',
    as: 'menus'
});

// asociaciones de ventas y detalle de venta

Venta.hasMany(DetalleVenta, { foreignKey: 'venta_id', as: 'detalle_venta' });
DetalleVenta.belongsTo(Venta, { foreignKey: 'venta_id', as: 'venta' });

// asociaciones de detalle de venta y productos

DetalleVenta.belongsTo(Products, { foreignKey: 'producto_id', as: 'producto' });

//asociacion de venta con usuario
Venta.belongsTo(User, { foreignKey: 'usuario_id', as: 'user' });


// Relaciones adicionales para acceder a cantidad y orden
Menu.hasMany(MenuProducto, { foreignKey: 'menu_id', as: 'menu_productos' });
Products.hasMany(MenuProducto, { foreignKey: 'producto_id' });

// asociaciones de menus y productos
MenuProducto.belongsTo(Menu, { foreignKey: 'menu_id' });
MenuProducto.belongsTo(Products, { foreignKey: 'producto_id', as: 'producto' });

// asociaciones de productos y imagenes
Products.hasMany(ProductImg, { foreignKey: 'product_id', as: 'imagenes' });
ProductImg.belongsTo(Products, { foreignKey: 'product_id', as: 'producto' });







// ============================================
// EXPORTAR MODELOS
// ============================================
export {
    Products,
    Categoria,
    Productoxcategoria,
    ProductImg
};