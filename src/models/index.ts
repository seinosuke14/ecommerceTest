import Products from './products';
import Categoria from './categoria';
import Productoxcategoria from './productoxcategoria';
import ProductImg from './productimg';




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