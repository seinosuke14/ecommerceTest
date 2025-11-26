// src/controllers/productoCategoriaController.ts
import { Request, Response } from 'express';
import { Products, Categoria, Productoxcategoria } from '../models';



export class ProductoCategoriaController {

    // ============================================
    // ASIGNAR CATEGORÍAS A UN PRODUCTO
    // POST /api/productos/:producto_id/categorias
    // Body: { "categoria_ids": ["uuid1", "uuid2"] }
    // ============================================
    static async asignarCategorias(req: Request, res: Response) {
        try {
            const { producto_id } = req.params;
            const { categoria_ids } = req.body;

            // Validar que el producto existe
            const producto = await Products.findByPk(producto_id);
            if (!producto) {
                return res.status(404).json({
                    success: false,
                    message: 'Producto no encontrado'
                });
            }

            // Validar que es un array
            if (!Array.isArray(categoria_ids)) {
                return res.status(400).json({
                    success: false,
                    message: 'categoria_ids debe ser un array de UUIDs'
                });
            }

            // Validar que las categorías existen
            const categorias = await Categoria.findAll({
                where: { id: categoria_ids }
            });

            if (categorias.length !== categoria_ids.length) {
                return res.status(404).json({
                    success: false,
                    message: 'Una o más categorías no existen'
                });
            }

            // Asignar categorías (reemplaza las existentes)
            await (producto as any).setCategorias(categoria_ids);

            // Obtener producto con categorías actualizadas
            const productoActualizado = await Products.findByPk(producto_id, {
                include: [{
                    model: Categoria,
                    as: 'categorias',
                    through: { attributes: [] }
                }]
            });

            return res.status(200).json({
                success: true,
                message: 'Categorías asignadas correctamente',
                data: productoActualizado
            });

        } catch (error: any) {
            console.error('Error al asignar categorías:', error);

            if (error.name === 'SequelizeUniqueConstraintError') {
                return res.status(400).json({
                    success: false,
                    message: 'Una o más categorías ya están asignadas a este producto'
                });
            }

            return res.status(500).json({
                success: false,
                message: 'Error al asignar categorías',
                error: error.message
            });
        }
    }

    // ============================================
    // AGREGAR UNA CATEGORÍA A UN PRODUCTO
    // POST /api/productos/:producto_id/categorias/:categoria_id
    // ============================================
    static async agregarCategoria(req: Request, res: Response) {
        try {
            const { producto_id, categoria_id } = req.params;

            // Validar que el producto existe
            const producto = await Products.findByPk(producto_id);
            if (!producto) {
                return res.status(404).json({
                    success: false,
                    message: 'Producto no encontrado'
                });
            }

            // Validar que la categoría existe
            const categoria = await Categoria.findByPk(categoria_id);
            if (!categoria) {
                return res.status(404).json({
                    success: false,
                    message: 'Categoría no encontrada'
                });
            }

            // Verificar si ya existe la relación
            const existe = await Productoxcategoria.findOne({
                where: {
                    producto_id: parseInt(producto_id),
                    categoria_id: categoria_id
                }
            });

            if (existe) {
                return res.status(400).json({
                    success: false,
                    message: 'Esta categoría ya está asignada al producto'
                });
            }

            // Crear la relación
            await Productoxcategoria.create({
                producto_id: parseInt(producto_id),
                categoria_id: categoria_id
            });

            return res.status(201).json({
                success: true,
                message: 'Categoría agregada correctamente',
                data: {
                    producto_id: parseInt(producto_id),
                    categoria_id: categoria_id
                }
            });

        } catch (error: any) {
            console.error('Error al agregar categoría:', error);
            return res.status(500).json({
                success: false,
                message: 'Error al agregar categoría',
                error: error.message
            });
        }
    }

    // ============================================
    // OBTENER CATEGORÍAS DE UN PRODUCTO
    // GET /api/productos/:producto_id/categorias
    // ============================================
    static async obtenerCategoriasPorProducto(req: Request, res: Response) {
        try {
            const { producto_id } = req.params;

            const producto = await Products.findByPk(producto_id, {
                include: [{
                    model: Categoria,
                    as: 'categorias',
                    through: { attributes: [] }
                }]
            });

            if (!producto) {
                return res.status(404).json({
                    success: false,
                    message: 'Producto no encontrado'
                });
            }

            return res.status(200).json({
                success: true,
                data: {
                    producto: {
                        id: producto.get('id'),
                        nombre: producto.get('nombre'),
                        sku: producto.get('sku')
                    },
                    categorias: (producto as any).categorias
                }
            });

        } catch (error: any) {
            console.error('Error al obtener categorías:', error);
            return res.status(500).json({
                success: false,
                message: 'Error al obtener categorías',
                error: error.message
            });
        }
    }

    // ============================================
    // OBTENER PRODUCTOS POR CATEGORÍA
    // GET /api/categorias/:categoria_id/productos
    // ============================================
    static async obtenerProductosPorCategoria(req: Request, res: Response) {
        try {
            const { categoria_id } = req.params;

            const categoria = await Categoria.findByPk(categoria_id, {
                include: [{
                    model: Products,
                    as: 'productos',
                    through: { attributes: [] }
                }]
            });

            if (!categoria) {
                return res.status(404).json({
                    success: false,
                    message: 'Categoría no encontrada'
                });
            }

            return res.status(200).json({
                success: true,
                data: {
                    categoria: {
                        id: categoria.get('id'),
                        nombre: categoria.get('vch_nombre')
                    },
                    productos: (categoria as any).productos
                }
            });

        } catch (error: any) {
            console.error('Error al obtener productos:', error);
            return res.status(500).json({
                success: false,
                message: 'Error al obtener productos',
                error: error.message
            });
        }
    }

    // ============================================
    // ELIMINAR UNA CATEGORÍA DE UN PRODUCTO
    // DELETE /api/productos/:producto_id/categorias/:categoria_id
    // ============================================
    static async eliminarCategoria(req: Request, res: Response) {
        try {
            const { producto_id, categoria_id } = req.params;

            const relacion = await Productoxcategoria.findOne({
                where: {
                    producto_id: parseInt(producto_id),
                    categoria_id: categoria_id
                }
            });

            if (!relacion) {
                return res.status(404).json({
                    success: false,
                    message: 'Relación no encontrada'
                });
            }

            await relacion.destroy();

            return res.status(200).json({
                success: true,
                message: 'Categoría eliminada del producto correctamente'
            });

        } catch (error: any) {
            console.error('Error al eliminar categoría:', error);
            return res.status(500).json({
                success: false,
                message: 'Error al eliminar categoría',
                error: error.message
            });
        }
    }

    // ============================================
    // ELIMINAR TODAS LAS CATEGORÍAS DE UN PRODUCTO
    // DELETE /api/productos/:producto_id/categorias
    // ============================================
    static async eliminarTodasCategorias(req: Request, res: Response) {
        try {
            const { producto_id } = req.params;

            const producto = await Products.findByPk(producto_id);
            if (!producto) {
                return res.status(404).json({
                    success: false,
                    message: 'Producto no encontrado'
                });
            }

            const deleted = await Productoxcategoria.destroy({
                where: { producto_id: parseInt(producto_id) }
            });

            return res.status(200).json({
                success: true,
                message: `${deleted} categoría(s) eliminada(s) del producto`
            });

        } catch (error: any) {
            console.error('Error al eliminar categorías:', error);
            return res.status(500).json({
                success: false,
                message: 'Error al eliminar categorías',
                error: error.message
            });
        }
    }

    // ============================================
    // OBTENER TODAS LAS RELACIONES
    // GET /api/producto-categorias
    // ============================================
    static async obtenerTodasRelaciones(req: Request, res: Response) {
        try {
            const relaciones = await Productoxcategoria.findAll();

            // Obtener detalles completos
            const relacionesConDetalles = await Promise.all(
                relaciones.map(async (relacion: any) => {
                    const producto = await Products.findByPk(relacion.producto_id);
                    const categoria = await Categoria.findByPk(relacion.categoria_id);

                    return {
                        producto_id: relacion.producto_id,
                        categoria_id: relacion.categoria_id,
                        producto: producto ? {
                            id: producto.get('id'),
                            nombre: producto.get('nombre'),
                            sku: producto.get('sku')
                        } : null,
                        categoria: categoria ? {
                            id: categoria.get('id'),
                            nombre: categoria.get('vch_nombre')
                        } : null
                    };
                })
            );

            return res.status(200).json({
                success: true,
                total: relacionesConDetalles.length,
                data: relacionesConDetalles
            });

        } catch (error: any) {
            console.error('Error al obtener relaciones:', error);
            return res.status(500).json({
                success: false,
                message: 'Error al obtener relaciones',
                error: error.message
            });
        }
    }
}