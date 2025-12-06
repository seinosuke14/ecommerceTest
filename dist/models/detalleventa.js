"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
const DetalleVenta = db_1.sequelize.define('DetalleVenta', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    venta_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'ventas',
            key: 'id'
        }
    },
    producto_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'products',
            key: 'id'
        }
    },
    nombre_producto: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false
    },
    sku: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true
    },
    cantidad: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    precio_unitario: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    descuento_unitario: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: 0
    },
    subtotal: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
}, {
    tableName: 'detalle_ventas',
    timestamps: false
});
module.exports = DetalleVenta;
