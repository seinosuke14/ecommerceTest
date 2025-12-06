"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductImgController = void 0;
const productimg_1 = __importDefault(require("../models/productimg"));
class ProductImgController {
    // ============================================
    // OBTENER TODAS LAS IMÁGENES
    // GET /api/productimg
    // ============================================
    static async getAll(req, res) {
        try {
            const images = await productimg_1.default.findAll();
            return res.status(200).json({
                success: true,
                data: images
            });
        }
        catch (error) {
            console.error('Error al obtener imágenes:', error);
            return res.status(500).json({
                success: false,
                message: 'Error al obtener imágenes',
                error: error.message
            });
        }
    }
    // ============================================
    // OBTENER IMAGEN POR ID
    // GET /api/productimg/:id
    // ============================================
    static async getById(req, res) {
        try {
            const { id } = req.params;
            const image = await productimg_1.default.findByPk(id);
            if (!image) {
                return res.status(404).json({
                    success: false,
                    message: 'Imagen no encontrada'
                });
            }
            return res.status(200).json({
                success: true,
                data: image
            });
        }
        catch (error) {
            console.error('Error al obtener imagen:', error);
            return res.status(500).json({
                success: false,
                message: 'Error al obtener imagen',
                error: error.message
            });
        }
    }
    // ============================================
    // CREAR UNA IMAGEN
    // POST /api/productimg
    // ============================================
    static async create(req, res) {
        try {
            const { product_id, url_image, orden, es_principal } = req.body;
            // Validación básica
            if (!product_id || !url_image) {
                return res.status(400).json({
                    success: false,
                    message: 'Faltan campos obligatorios'
                });
            }
            const newImage = await productimg_1.default.create({
                product_id,
                url_image,
                orden: orden || 0,
                es_principal: es_principal || 0 // ✅ Cambiado de 'N' a 0
            });
            return res.status(201).json({
                success: true,
                message: 'Imagen creada correctamente',
                data: newImage
            });
        }
        catch (error) {
            console.error('Error al crear imagen:', error);
            return res.status(500).json({
                success: false,
                message: 'Error al crear imagen',
                error: error.message
            });
        }
    }
    // ============================================
    // ACTUALIZAR UNA IMAGEN
    // PUT /api/productimg/:id
    // ============================================
    static async update(req, res) {
        try {
            const { id } = req.params;
            const { url_img, orden, es_principal } = req.body;
            const image = await productimg_1.default.findByPk(id);
            if (!image) {
                return res.status(404).json({
                    success: false,
                    message: 'Imagen no encontrada'
                });
            }
            await image.update({
                url_img,
                orden,
                es_principal
            });
            return res.status(200).json({
                success: true,
                message: 'Imagen actualizada correctamente',
                data: image
            });
        }
        catch (error) {
            console.error('Error al actualizar imagen:', error);
            return res.status(500).json({
                success: false,
                message: 'Error al actualizar imagen',
                error: error.message
            });
        }
    }
    static async createBulk(req, res) {
        try {
            const { product_id, images } = req.body;
            if (!product_id || !Array.isArray(images) || images.length === 0) {
                return res.status(400).json({
                    success: false,
                    message: 'Faltan campos obligatorios o formato incorrecto'
                });
            }
            const imagesToCreate = images.map((url, index) => ({
                product_id, // ✅ Ahora es INT
                url_img: url,
                orden: index,
                es_principal: index === 0 ? 1 : 0
            }));
            const newImages = await productimg_1.default.bulkCreate(imagesToCreate);
            return res.status(201).json({
                success: true,
                message: `${newImages.length} imágenes creadas correctamente`,
                data: newImages
            });
        }
        catch (error) {
            console.error('Error al crear imágenes:', error);
            return res.status(500).json({
                success: false,
                message: 'Error al crear imágenes',
                error: error.message
            });
        }
    }
    // ============================================
    // ELIMINAR UNA IMAGEN
    // DELETE /api/productimg/:id
    // ============================================
    static async delete(req, res) {
        try {
            const { id } = req.params;
            const image = await productimg_1.default.findByPk(id);
            if (!image) {
                return res.status(404).json({
                    success: false,
                    message: 'Imagen no encontrada'
                });
            }
            await image.destroy();
            return res.status(200).json({
                success: true,
                message: 'Imagen eliminada correctamente'
            });
        }
        catch (error) {
            console.error('Error al eliminar imagen:', error);
            return res.status(500).json({
                success: false,
                message: 'Error al eliminar imagen',
                error: error.message
            });
        }
    }
}
exports.ProductImgController = ProductImgController;
