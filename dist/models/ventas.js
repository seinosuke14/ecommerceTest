"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Venta = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
class Venta extends sequelize_1.Model {
}
exports.Venta = Venta;
Venta.init({
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
    sequelize: db_1.sequelize,
    tableName: 'ventas',
    timestamps: false
});
exports.default = Venta;
