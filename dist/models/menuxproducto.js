"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuxproducto = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
class menuxproducto extends sequelize_1.Model {
}
exports.menuxproducto = menuxproducto;
menuxproducto.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    menu_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    producto_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    cantidad: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 1
    },
    orden: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0
    }
}, { sequelize: db_1.sequelize, tableName: 'menu_productos', timestamps: false });
exports.default = menuxproducto;
