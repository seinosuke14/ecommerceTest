// routes/menuRoutes.ts
import { Router } from 'express';
import {
    crearMenu,
    obtenerMenusDisponibles,
    obtenerMenuPorId,
    actualizarDisponibilidad,
    eliminarMenu
} from '../controllers/menu';

const router = Router();

// Rutas públicas
router.get('/menus/disponibles', obtenerMenusDisponibles);
router.get('/menus/:id', obtenerMenuPorId);

// Rutas admin (agrega tu middleware de autenticación si lo tienes)
router.post('/menus', crearMenu);
router.patch('/menus/:id/disponibilidad', actualizarDisponibilidad);
router.delete('/menus/:id', eliminarMenu);

export default router;