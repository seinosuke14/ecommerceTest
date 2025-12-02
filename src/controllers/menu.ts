// controllers/menuController.ts
import { Request, Response } from 'express';
import menu from '../models/menu';
import menuxproducto from '../models/menuxproducto';
import products from '../models/products';

// Crear un menú
export const crearMenu = async (req: Request, res: Response) => {
    try {
        const {
            nombre,
            descripcion,
            productos, // [{id: 21, cantidad: 2}, {id: 22, cantidad: 1}]
            descuento_porcentaje,
            imagen,
            disponible
        } = req.body;

        // Validar que vengan productos
        if (!productos || productos.length === 0) {
            return res.status(400).json({ error: 'Debes incluir al menos un producto' });
        }

        // Obtener los productos con sus precios
        const productosData = await products.findAll({
            where: { id: productos.map((p: any) => p.id) }
        });

        if (productosData.length !== productos.length) {
            return res.status(404).json({ error: 'Algunos productos no existen' });
        }

        // Calcular precio total (precio × cantidad de cada producto)
        const precio_total = productosData.reduce((sum: number, prod: any) => {
            const productoMenu = productos.find((p: any) => p.id === prod.id);
            const cantidad = productoMenu?.cantidad || 1;
            return sum + (parseFloat(prod.price) * cantidad);
        }, 0);

        // Calcular precio con descuento
        const precio_con_descuento = descuento_porcentaje
            ? precio_total - (precio_total * descuento_porcentaje / 100)
            : precio_total;

        // Crear menú
        const menus = await menu.create({
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
        const menuProductos = productos.map((p: any, index: number) => ({
            menu_id: menus.id,
            producto_id: p.id,
            cantidad: p.cantidad || 1,
            orden: p.orden !== undefined ? p.orden : index
        }));

        await menuxproducto.bulkCreate(menuProductos);

        // Obtener el menú completo con sus productos
        const menuCompleto = await menu.findByPk(menus.id, {
            include: [{
                model: products,
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

    } catch (error: any) {
        console.error('Error al crear menú:', error);
        res.status(500).json({
            error: 'Error al crear el menú',
            details: error.message
        });
    }
};

// Obtener todos los menús disponibles
export const obtenerMenusDisponibles = async (req: Request, res: Response) => {
    try {
        const menus = await menu.findAll({
            where: { disponible: true },
            include: [{
                model: products,
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

        const menusFiltrados = menus.filter((menu: any) => {
            if (!menu.fecha_inicio && !menu.fecha_fin) return true;

            const fechaInicio = menu.fecha_inicio ? new Date(menu.fecha_inicio) : null;
            const fechaFin = menu.fecha_fin ? new Date(menu.fecha_fin) : null;

            if (fechaInicio && fechaInicio > hoy) return false;
            if (fechaFin && fechaFin < hoy) return false;

            return true;
        });

        res.json({
            total: menusFiltrados.length,
            data: menusFiltrados
        });

    } catch (error: any) {
        console.error('Error al obtener menús:', error);
        res.status(500).json({ error: 'Error al obtener los menús' });
    }
};

// Obtener menú por ID
export const obtenerMenuPorId = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const menus = await menu.findByPk(id, {
            include: [{
                model: products,
                as: 'productos',
                through: {
                    attributes: ['cantidad', 'orden']
                }
            }]
        });

        if (!menu) {
            return res.status(404).json({ error: 'Menú no encontrado' });
        }

        res.json(menu);

    } catch (error: any) {
        console.error('Error al obtener menú:', error);
        res.status(500).json({ error: 'Error al obtener el menú' });
    }
};

// Actualizar disponibilidad
export const actualizarDisponibilidad = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { disponible } = req.body;

        const menus = await menu.findByPk(id);

        if (!menus) {
            return res.status(404).json({ error: 'Menú no encontrado' });
        }

        menus.disponible = disponible;
        await menus.save();

        res.json({
            message: 'Disponibilidad actualizada',
            data: menus
        });

    } catch (error: any) {
        console.error('Error al actualizar disponibilidad:', error);
        res.status(500).json({ error: 'Error al actualizar disponibilidad' });
    }
};

// Eliminar menú
export const eliminarMenu = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const menus = await menu.findByPk(id);

        if (!menus) {
            return res.status(404).json({ error: 'Menú no encontrado' });
        }

        await menu.destroy();

        res.json({ message: 'Menú eliminado exitosamente' });

    } catch (error: any) {
        console.error('Error al eliminar menú:', error);
        res.status(500).json({ error: 'Error al eliminar el menú' });
    }
};