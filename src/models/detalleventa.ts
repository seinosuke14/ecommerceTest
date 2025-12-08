import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db';

export class DetalleVenta extends Model {
    declare id: number;
    declare venta_id: number;
    declare producto_id: number;
    declare nombre_producto: string;
    declare sku: string | null;
    declare cantidad: number;
    declare precio_unitario: number;
    declare descuento_unitario: number;
    declare subtotal: number;
}

DetalleVenta.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    venta_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'ventas',
            key: 'id'
        }
    },
    producto_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'products',
            key: 'id'
        }
    },
    nombre_producto: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    sku: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    precio_unitario: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    descuento_unitario: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0
    },
    subtotal: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'detalle_ventas',
    timestamps: false
});

export default DetalleVenta;