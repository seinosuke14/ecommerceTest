import Products from './products';
import Categoria from './categoria';
import Productoxcategoria from './productoxcategoria';
import ProductImg from './productimg';
import Menu from './menu';
import MenuProducto from './menuxproducto';



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

// Relaciones adicionales para acceder a cantidad y orden
Menu.hasMany(MenuProducto, { foreignKey: 'menu_id', as: 'menu_productos' });
Products.hasMany(MenuProducto, { foreignKey: 'producto_id' });

MenuProducto.belongsTo(Menu, { foreignKey: 'menu_id' });
MenuProducto.belongsTo(Products, { foreignKey: 'producto_id', as: 'producto' });

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