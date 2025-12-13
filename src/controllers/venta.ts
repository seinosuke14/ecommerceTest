import { Request, Response } from 'express';
import { Validator } from '../helpers/validator';
import Venta from '../models/ventas';
import DetalleVenta from '../models/detalleventa';
import Product from '../models/products';
import { sequelize } from '../config/db';

interface CarritoItem {
    producto_id: number;
    cantidad: number;
}

export async function getAll(req: Request, res: Response) {
    try {
        const { limit = '50', offset = '0', estado } = req.query;

        const where: any = {};
        if (estado && typeof estado === 'string') {
            where.estado = estado;
        }

        const ventas = await Venta.findAll({
            where,
            include: [{
                model: DetalleVenta,
                as: 'detalle_venta'
            }],
            order: [['fecha_venta', 'DESC']],
            limit: parseInt(limit as string),
            offset: parseInt(offset as string)
        });

        res.json(ventas);
    } catch (error) {
        console.error('Error al obtener ventas:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

export async function getById(req: Request, res: Response) {
    try {
        const { id } = req.params;

        const venta = await Venta.findByPk(id, {
            include: [{
                model: DetalleVenta,
                as: 'detalle_venta',
                include: [{
                    model: Product,
                    as: 'producto'
                }]
            }]
        });

        if (!venta) {
            return res.status(404).json({ error: 'Venta no encontrada' });
        }

        res.json(venta);
    } catch (error) {
        console.error('Error al obtener venta:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

export async function getByUsuarioId(req: Request, res: Response) {
    try {
        const { usuario_id } = req.params;

        const ventas = await Venta.findAll({
            where: { usuario_id },
            include: [{
                model: DetalleVenta,
                as: 'detalle_venta'
            }],
            order: [['fecha_venta', 'DESC']]
        });

        res.json(ventas);
    } catch (error) {
        console.error('Error al obtener ventas del usuario:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

export async function Post(req: Request, res: Response) {
    let transaction;

    try {
        const {
            usuario_id,
            nombre_cliente,
            metodo_pago,
            notas,
            carrito
        } = req.body;

        // ✅ VALIDACIONES ANTES DE CREAR LA TRANSACCIÓN
        if (!Validator.isNotEmpty(nombre_cliente)) {
            return res.status(400).json({ error: 'El nombre del cliente es obligatorio' });
        }
        if (!Validator.isNotEmpty(metodo_pago)) {
            return res.status(400).json({ error: 'El método de pago es obligatorio' });
        }
        if (!carrito || !Array.isArray(carrito) || carrito.length === 0) {
            return res.status(400).json({ error: 'El carrito está vacío' });
        }

        // Validar items del carrito
        for (const item of carrito) {
            if (!item.producto_id || !item.cantidad) {
                return res.status(400).json({
                    error: 'Cada item del carrito debe tener producto_id y cantidad'
                });
            }
            if (item.cantidad <= 0) {
                return res.status(400).json({ error: 'La cantidad debe ser mayor a 0' });
            }
        }

        // ✅ OBTENER PRODUCTOS ANTES DE LA TRANSACCIÓN
        const productosIds = carrito.map((item: CarritoItem) => item.producto_id);
        const productos = await Product.findAll({
            where: { id: productosIds }
        });

        if (productos.length !== productosIds.length) {
            return res.status(404).json({ error: 'Algunos productos no existen' });
        }

        // ✅ CALCULAR TOTALES ANTES DE LA TRANSACCIÓN
        let subtotal = 0;
        let descuentoTotal = 0;
        const detalles: any[] = [];

        for (const item of carrito) {
            const producto = productos.find(p => p.id === item.producto_id);

            if (!producto) continue;

            const precioUnitario = parseFloat(producto.price?.toString() || '0');
            const descuentoUnitario = parseFloat(producto.discount?.toString() || '0');
            const cantidad = parseInt(item.cantidad.toString());

            const subtotalItem = (precioUnitario - descuentoUnitario) * cantidad;
            const descuentoItem = descuentoUnitario * cantidad;

            subtotal += precioUnitario * cantidad;
            descuentoTotal += descuentoItem;

            detalles.push({
                producto_id: producto.id,
                nombre_producto: producto.nombre,
                sku: producto.sku,
                cantidad: cantidad,
                precio_unitario: precioUnitario,
                descuento_unitario: descuentoUnitario,
                subtotal: subtotalItem
            });
        }

        const total = subtotal - descuentoTotal;

        // ✅ AHORA SÍ CREAR LA TRANSACCIÓN
        transaction = await sequelize.transaction();

        // Crear la venta
        const venta = await Venta.create({
            usuario_id: usuario_id || null,
            nombre_cliente,
            subtotal,
            descuento: descuentoTotal,
            total,
            metodo_pago: metodo_pago || null,
            notas: notas || null,
            estado: 'pendiente'
        }, { transaction });

        // Crear los detalles
        const detallesConVentaId = detalles.map(detalle => ({
            ...detalle,
            venta_id: venta.id
        }));

        await DetalleVenta.bulkCreate(detallesConVentaId, { transaction });

        // ✅ COMMIT EXITOSO
        await transaction.commit();
        transaction = null; // Marcar como finalizada para evitar rollback

        // ✅ CONSULTA POST-COMMIT (si falla, no importa, la venta ya está guardada)
        try {
            const ventaCompleta = await Venta.findByPk(venta.id, {
                include: [{
                    model: DetalleVenta,
                    as: 'detalle_venta'
                }]
            });

            return res.status(201).json({
                message: 'Venta creada exitosamente',
                venta: ventaCompleta
            });
        } catch (fetchError) {
            // Si falla al obtener, devolver datos básicos (la venta YA está en la BD)
            console.error('Error al obtener venta completa (venta creada exitosamente):', fetchError);
            return res.status(201).json({
                message: 'Venta creada exitosamente',
                venta: {
                    id: venta.id,
                    usuario_id: venta.usuario_id,
                    nombre_cliente: venta.nombre_cliente,
                    subtotal: venta.subtotal,
                    descuento: venta.descuento,
                    total: venta.total,
                    metodo_pago: venta.metodo_pago,
                    estado: venta.estado,
                    notas: venta.notas,
                    detalles: detallesConVentaId
                }
            });
        }

    } catch (error) {
        // ✅ Solo rollback si la transacción existe y NO ha sido finalizada
        if (transaction) {
            try {
                await transaction.rollback();
            } catch (rollbackError) {
                console.error('Error en rollback:', rollbackError);
            }
        }

        console.error('Error al crear venta:', error);
        return res.status(500).json({
            error: 'Internal server error',
            details: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}

export async function Put(req: Request, res: Response) {
    try {
        const venta = await Venta.findByPk(req.params.id);
        if (!venta) return res.sendStatus(404);

        const { estado, notas, metodo_pago } = req.body;

        if (estado) {
            const estadosValidos = ['completada', 'cancelada', 'pendiente', 'en espera'];
            if (!estadosValidos.includes(estado)) {
                return res.status(400).json({
                    error: 'Estado inválido. Valores permitidos: completada, cancelada, pendiente'
                });
            }
        }

        if (estado) venta.estado = estado;
        if (notas !== undefined) venta.notas = notas;
        if (metodo_pago !== undefined) venta.metodo_pago = metodo_pago;

        await venta.save();

        res.json({
            message: 'Venta actualizada exitosamente',
            venta
        });

    } catch (error) {
        console.error('Error al actualizar venta:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

export async function deleteById(req: Request, res: Response) {
    try {
        const n = await Venta.destroy({ where: { id: req.params.id } });
        res.status(n ? 204 : 404).end();
    } catch (error) {
        console.error('Error al eliminar venta:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}