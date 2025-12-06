"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllProducts = getAllProducts;
exports.getByIdProducts = getByIdProducts;
exports.PostProducts = PostProducts;
exports.PutProducts = PutProducts;
exports.DeletebyId = DeletebyId;
exports.bulkCreateProduct = bulkCreateProduct;
const models_1 = require("../models");
const products_1 = __importDefault(require("../models/products"));
const models_2 = require("../models");
const db_1 = require("../config/db");
async function getAllProducts(_req, res) {
    try {
        const rows = await products_1.default.findAll({
            attributes: ["id", "nombre", "price", "sku", "discount", "descriptions"],
            include: [{
                    model: models_1.Categoria,
                    as: "categorias",
                    through: { attributes: [] }
                },
                {
                    model: models_2.ProductImg,
                    as: "imagenes",
                    attributes: ["id", "url_image", "orden", "es_principal"],
                }
            ],
            order: [[{ model: models_2.ProductImg, as: 'imagenes' }, 'orden', 'ASC']]
        });
        res.json(rows);
    }
    catch (error) {
        console.error("Error fetching products:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}
async function getByIdProducts(req, res) {
    try {
        const row = await products_1.default.findByPk(req.params.id, {
            attributes: ["id", "nombre", "price", "sku", "discount", "descriptions"],
            include: [
                {
                    model: models_1.Categoria,
                    as: "categorias",
                    through: { attributes: [] }
                },
                {
                    model: models_2.ProductImg,
                    as: "imagenes",
                    attributes: ["id", "url_image", "orden", "es_principal"]
                }
            ],
            order: [
                [{ model: models_2.ProductImg, as: 'imagenes' }, 'orden', 'ASC']
            ]
        });
        if (!row)
            return res.sendStatus(404);
        res.json(row);
    }
    catch (error) {
        console.error("Error fetching product by ID:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}
async function PostProducts(req, res) {
    try {
        const { nombre, price, sku, discount, descriptions } = req.body;
        if (!nombre)
            return res.status(400).json({ error: "nombre is a required field" });
        const row = await products_1.default.create({ nombre, price, sku, discount, descriptions });
        res.status(201).json(row);
    }
    catch (error) {
        console.error("Error creating product:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}
async function PutProducts(req, res) {
    try {
        const row = await products_1.default.findByPk(req.params.id);
        if (!row)
            return res.sendStatus(404);
        await row.update(req.body);
        res.json(row);
    }
    catch (error) {
        console.error("Error updating product:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}
async function DeletebyId(req, res) {
    try {
        const n = await products_1.default.destroy({ where: { id: req.params.id } });
        res.status(n ? 204 : 404).end();
    }
    catch (error) {
        console.error("Error deleting product:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}
async function bulkCreateProduct(req, res) {
    const { productos } = req.body;
    if (!Array.isArray(productos) || productos.length === 0) {
        return res.status(400).json({ error: "Debes enviar un array de productos." });
    }
    const t = await db_1.sequelize.transaction();
    try {
        const productosCreated = [];
        for (const prod of productos) {
            // 1. Crear producto base
            const nuevoProducto = await products_1.default.create({
                nombre: prod.nombre,
                price: prod.price,
                sku: prod.sku,
                discount: prod.discount,
                descriptions: prod.descriptions
            }, { transaction: t });
            // 2. Insertar categorías manualmente (evita error de TS con setCategorias)
            if (Array.isArray(prod.categorias)) {
                const rowsPivot = prod.categorias.map((idCat) => ({
                    producto_id: nuevoProducto.id,
                    categoria_id: idCat
                }));
                await models_1.Productoxcategoria.bulkCreate(rowsPivot, { transaction: t });
            }
            // 3. Guardar para retornar
            productosCreated.push(nuevoProducto);
            if (Array.isArray(prod.productimg)) {
                const rowsPivot = prod.productimg.map((img) => ({
                    product_id: nuevoProducto.id,
                    url_image: img.url_image,
                    orden: img.orden,
                    es_principal: img.es_principal
                }));
                await models_2.ProductImg.bulkCreate(rowsPivot, { transaction: t });
            }
        }
        await t.commit();
        return res.status(201).json({
            message: "Carga masiva completada",
            productos: productosCreated
        });
    }
    catch (error) {
        await t.rollback();
        console.error("Error en carga masiva:", error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
}
