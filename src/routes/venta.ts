import { Router } from 'express';
import * as ventasController from '../controllers/venta';

const router = Router();

// Obtener todas las ventas (con paginación y filtro por estado)
// GET /api/ventas?limit=50&offset=0&estado=completada
router.get('/', ventasController.getAll);

// Obtener ventas de un usuario específico
// GET /api/ventas/usuario/:usuario_id
router.get('/usuario/:usuario_id', ventasController.getByUsuarioId);

// Obtener una venta específica con sus detalles
// GET /api/ventas/:id
router.get('/:id', ventasController.getById);

// Crear una nueva venta
// POST /api/ventas
router.post('/', ventasController.Post);

// Actualizar una venta (estado, notas, método de pago)
// PUT /api/ventas/:id
router.put('/:id', ventasController.Put);

// Eliminar una venta
// DELETE /api/ventas/:id
router.delete('/:id', ventasController.deleteById);

export default router;