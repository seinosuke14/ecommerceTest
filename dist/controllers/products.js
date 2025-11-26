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
const products_1 = __importDefault(require("../models/products"));
async function getAllProducts(_req, res) {
    try {
        const rows = await products_1.default.findAll({
            attributes: ["id", "name", "price", "sku"],
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
            attributes: ["id", "name", "price", "sku"],
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
        const { name, price, sku } = req.body;
        if (!name)
            return res.status(400).json({ error: "name is a required field" });
        const row = await products_1.default.create({ name, price, sku });
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
