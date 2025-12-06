"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarMenu = exports.actualizarDisponibilidad = exports.obtenerMenuPorId = exports.obtenerMenusDisponibles = exports.crearMenu = void 0;
const menu_1 = __importDefault(require("../models/menu"));
const menuxproducto_1 = __importDefault(require("../models/menuxproducto"));
const products_1 = __importDefault(require("../models/products"));
// Crear un menú
const crearMenu = async (req, res) => {
    try {
        const { nombre, descripcion, productos, // [{id: 21, cantidad: 2}, {id: 22, cantidad: 1}]
        descuento_porcentaje, imagen, disponible } = req.body;
        // Validar que vengan productos
        if (!productos || productos.length === 0) {
            return res.status(400).json({ error: 'Debes incluir al menos un producto' });
        }
        // Obtener los productos con sus precios
        const productosData = await products_1.default.findAll({
            where: { id: productos.map((p) => p.id) }
        });
        if (productosData.length !== productos.length) {
            return res.status(404).json({ error: 'Algunos productos no existen' });
        }
        // Calcular precio total (precio × cantidad de cada producto)
        const precio_total = productosData.reduce((sum, prod) => {
            const productoMenu = productos.find((p) => p.id === prod.id);
            const cantidad = productoMenu?.cantidad || 1;
            return sum + (parseFloat(prod.price) * cantidad);
        }, 0);
        // Calcular precio con descuento
        const precio_con_descuento = descuento_porcentaje
            ? precio_total - (precio_total * descuento_porcentaje / 100)
            : precio_total;
        // Crear menú
        const menus = await menu_1.default.create({
            nombre,
            descripcion,
            precio_total: parseFloat(precio_total.toFixed(2)),
            precio_con_descuento: parseFloat(precio_con_descuento.toFixed(2)),
            descuento_porcentaje: descuento_porcentaje || 0,
            disponible: disponible !== undefined ? disponible : true,
            imagen: imagen || null,
            sku: `MENU${Date.now()}`
        });
        // Crear las relaciones en menu_productos
        const menuProductos = productos.map((p, index) => ({
            menu_id: menus.id,
            producto_id: p.id,
            cantidad: p.cantidad || 1,
            orden: p.orden !== undefined ? p.orden : index
        }));
        await menuxproducto_1.default.bulkCreate(menuProductos);
        // Obtener el menú completo con sus productos
        const menuCompleto = await menu_1.default.findByPk(menus.id, {
            include: [{
                    model: products_1.default,
                    as: 'productos',
                    through: {
                        attributes: ['cantidad', 'orden']
                    }
                }]
        });
        res.status(201).json({
            message: 'Menú creado exitosamente',
            data: menuCompleto
        });
    }
    catch (error) {
        console.error('Error al crear menú:', error);
        res.status(500).json({
            error: 'Error al crear el menú',
            details: error.message
        });
    }
};
exports.crearMenu = crearMenu;
// Obtener todos los menús disponibles
const obtenerMenusDisponibles = async (req, res) => {
    try {
        const menus = await menu_1.default.findAll({
            where: { disponible: true },
            include: [{
                    model: products_1.default,
                    as: 'productos',
                    through: {
                        attributes: ['cantidad', 'orden']
                    }
                }],
            order: [
                ['fecha_creacion', 'DESC']
            ]
        });
        // Filtrar por fechas de vigencia
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);
        const menusFiltrados = menus.filter((menu) => {
            if (!menu.fecha_inicio && !menu.fecha_fin)
                return true;
            const fechaInicio = menu.fecha_inicio ? new Date(menu.fecha_inicio) : null;
            const fechaFin = menu.fecha_fin ? new Date(menu.fecha_fin) : null;
            if (fechaInicio && fechaInicio > hoy)
                return false;
            if (fechaFin && fechaFin < hoy)
                return false;
            return true;
        });
        res.json({
            total: menusFiltrados.length,
            data: menusFiltrados
        });
    }
    catch (error) {
        console.error('Error al obtener menús:', error);
        res.status(500).json({ error: 'Error al obtener los menús' });
    }
};
exports.obtenerMenusDisponibles = obtenerMenusDisponibles;
// Obtener menú por ID
const obtenerMenuPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const menus = await menu_1.default.findByPk(id, {
            include: [{
                    model: products_1.default,
                    as: 'productos',
                    through: {
                        attributes: ['cantidad', 'orden']
                    }
                }]
        });
        if (!menu_1.default) {
            return res.status(404).json({ error: 'Menú no encontrado' });
        }
        res.json(menu_1.default);
    }
    catch (error) {
        console.error('Error al obtener menú:', error);
        res.status(500).json({ error: 'Error al obtener el menú' });
    }
};
exports.obtenerMenuPorId = obtenerMenuPorId;
// Actualizar disponibilidad
const actualizarDisponibilidad = async (req, res) => {
    try {
        const { id } = req.params;
        const { disponible } = req.body;
        const menus = await menu_1.default.findByPk(id);
        if (!menus) {
            return res.status(404).json({ error: 'Menú no encontrado' });
        }
        menus.disponible = disponible;
        await menus.save();
        res.json({
            message: 'Disponibilidad actualizada',
            data: menus
        });
    }
    catch (error) {
        console.error('Error al actualizar disponibilidad:', error);
        res.status(500).json({ error: 'Error al actualizar disponibilidad' });
    }
};
exports.actualizarDisponibilidad = actualizarDisponibilidad;
// Eliminar menú
const eliminarMenu = async (req, res) => {
    try {
        const { id } = req.params;
        const menus = await menu_1.default.findByPk(id);
        if (!menus) {
            return res.status(404).json({ error: 'Menú no encontrado' });
        }
        await menu_1.default.destroy();
        res.json({ message: 'Menú eliminado exitosamente' });
    }
    catch (error) {
        console.error('Error al eliminar menú:', error);
        res.status(500).json({ error: 'Error al eliminar el menú' });
    }
};
exports.eliminarMenu = eliminarMenu;
