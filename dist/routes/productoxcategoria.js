"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/productoCategoriaRoutes.ts
const express_1 = require("express");
const productoxcategoria_1 = require("../controllers/productoxcategoria");
const router = (0, express_1.Router)();
// Asignar múltiples categorías
router.post('/productos/:producto_id/categorias', productoxcategoria_1.ProductoCategoriaController.asignarCategorias);
// Agregar una categoría
router.post('/productos/:producto_id/categorias/:categoria_id', productoxcategoria_1.ProductoCategoriaController.agregarCategoria);
// Obtener categorías de un producto
router.get('/productos/:producto_id/categorias', productoxcategoria_1.ProductoCategoriaController.obtenerCategoriasPorProducto);
// Obtener productos por categoría
router.get('/categorias/:categoria_id/productos', productoxcategoria_1.ProductoCategoriaController.obtenerProductosPorCategoria);
// Eliminar una categoría de un producto
router.delete('/productos/:producto_id/categorias/:categoria_id', productoxcategoria_1.ProductoCategoriaController.eliminarCategoria);
// Eliminar todas las categorías de un producto
router.delete('/productos/:producto_id/categorias', productoxcategoria_1.ProductoCategoriaController.eliminarTodasCategorias);
// Ver todas las relaciones
router.get('/producto-categorias', productoxcategoria_1.ProductoCategoriaController.obtenerTodasRelaciones);
exports.default = router;
