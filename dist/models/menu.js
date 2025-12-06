"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.menu = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
class menu extends sequelize_1.Model {
}
exports.menu = menu;
menu.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    precio_total: {
        type: sequelize_1.DataTypes.DECIMAL,
        allowNull: false
    },
    precio_con_descuento: {
        type: sequelize_1.DataTypes.DECIMAL,
        allowNull: false
    },
    descuento_porcentaje: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    disponible: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false
    },
    imagen: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    sku: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    fecha_creacion: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
        field: 'fecha_creacion'
    }
}, {
    sequelize: db_1.sequelize,
    tableName: 'menus',
    timestamps: false,
});
exports.default = menu;
