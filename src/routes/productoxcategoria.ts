// src/routes/productoCategoriaRoutes.ts
import { Router } from 'express';
import { ProductoCategoriaController } from '../controllers/productoxcategoria';

const router = Router();

// Asignar múltiples categorías
router.post(
    '/productos/:producto_id/categorias',
    ProductoCategoriaController.asignarCategorias
);

// Agregar una categoría
router.post(
    '/productos/:producto_id/categorias/:categoria_id',
    ProductoCategoriaController.agregarCategoria
);

// Obtener categorías de un producto
router.get(
    '/productos/:producto_id/categorias',
    ProductoCategoriaController.obtenerCategoriasPorProducto
);

// Obtener productos por categoría
router.get(
    '/categorias/:categoria_id/productos',
    ProductoCategoriaController.obtenerProductosPorCategoria
);

// Eliminar una categoría de un producto
router.delete(
    '/productos/:producto_id/categorias/:categoria_id',
    ProductoCategoriaController.eliminarCategoria
);

// Eliminar todas las categorías de un producto
router.delete(
    '/productos/:producto_id/categorias',
    ProductoCategoriaController.eliminarTodasCategorias
);

// Ver todas las relaciones
router.get(
    '/producto-categorias',
    ProductoCategoriaController.obtenerTodasRelaciones
);

export default router;