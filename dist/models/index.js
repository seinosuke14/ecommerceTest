"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductImg = exports.Productoxcategoria = exports.Categoria = exports.Products = void 0;
const products_1 = __importDefault(require("./products"));
exports.Products = products_1.default;
const categoria_1 = __importDefault(require("./categoria"));
exports.Categoria = categoria_1.default;
const productoxcategoria_1 = __importDefault(require("./productoxcategoria"));
exports.Productoxcategoria = productoxcategoria_1.default;
const productimg_1 = __importDefault(require("./productimg"));
exports.ProductImg = productimg_1.default;
const menu_1 = __importDefault(require("./menu"));
const menuxproducto_1 = __importDefault(require("./menuxproducto"));
const ventas_1 = __importDefault(require("./ventas"));
const detalleventa_1 = __importDefault(require("./detalleventa"));
const users_1 = __importDefault(require("./users"));
// Relación Many-to-Many: Products <-> Categorias
products_1.default.belongsToMany(categoria_1.default, {
    through: productoxcategoria_1.default,
    foreignKey: 'producto_id',
    otherKey: 'categoria_id',
    as: 'categorias'
});
categoria_1.default.belongsToMany(products_1.default, {
    through: productoxcategoria_1.default,
    foreignKey: 'categoria_id',
    otherKey: 'producto_id',
    as: 'productos'
});
// asociaciones de menus y productos
menu_1.default.belongsToMany(products_1.default, {
    through: menuxproducto_1.default,
    foreignKey: 'menu_id',
    otherKey: 'producto_id',
    as: 'productos'
});
products_1.default.belongsToMany(menu_1.default, {
    through: menuxproducto_1.default,
    foreignKey: 'producto_id',
    otherKey: 'menu_id',
    as: 'menus'
});
// asociaciones de ventas y detalle de venta
ventas_1.default.hasMany(detalleventa_1.default, { foreignKey: 'venta_id', as: 'detalle_venta' });
detalleventa_1.default.belongsTo(ventas_1.default, { foreignKey: 'venta_id', as: 'venta' });
// asociaciones de detalle de venta y productos
detalleventa_1.default.belongsTo(products_1.default, { foreignKey: 'producto_id', as: 'producto' });
//asociacion de venta con usuario
ventas_1.default.belongsTo(users_1.default, { foreignKey: 'usuario_id', as: 'user' });
// Relaciones adicionales para acceder a cantidad y orden
menu_1.default.hasMany(menuxproducto_1.default, { foreignKey: 'menu_id', as: 'menu_productos' });
products_1.default.hasMany(menuxproducto_1.default, { foreignKey: 'producto_id' });
// asociaciones de menus y productos
menuxproducto_1.default.belongsTo(menu_1.default, { foreignKey: 'menu_id' });
menuxproducto_1.default.belongsTo(products_1.default, { foreignKey: 'producto_id', as: 'producto' });
// asociaciones de productos y imagenes
products_1.default.hasMany(productimg_1.default, { foreignKey: 'product_id', as: 'imagenes' });
productimg_1.default.belongsTo(products_1.default, { foreignKey: 'product_id', as: 'producto' });
