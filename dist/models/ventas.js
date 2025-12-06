"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
const Venta = db_1.sequelize.define('Venta', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    usuario_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'usuarios',
            key: 'id'
        }
    },
    nombre_cliente: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false
    },
    email_cliente: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true
    },
    telefono_cliente: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: true
    },
    fecha_venta: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW
    },
    subtotal: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    descuento: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: 0
    },
    total: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    metodo_pago: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: true
    },
    estado: {
        type: sequelize_1.DataTypes.STRING(50),
        defaultValue: 'completada'
    },
    notas: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'ventas',
    timestamps: false
});
module.exports = Venta;
