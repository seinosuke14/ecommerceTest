"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// routes/menuRoutes.ts
const express_1 = require("express");
const menu_1 = require("../controllers/menu");
const router = (0, express_1.Router)();
// Rutas públicas
router.get('/disponibles', menu_1.obtenerMenusDisponibles);
router.get('/menus/:id', menu_1.obtenerMenuPorId);
// Rutas admin (agrega tu middleware de autenticación si lo tienes)
router.post('/menus', menu_1.crearMenu);
router.patch('/menus/:id/disponibilidad', menu_1.actualizarDisponibilidad);
router.delete('/menus/:id', menu_1.eliminarMenu);
exports.default = router;
