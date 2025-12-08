"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ventasController = __importStar(require("../controllers/venta"));
const router = (0, express_1.Router)();
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
exports.default = router;
