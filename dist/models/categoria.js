"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
class Categoria extends sequelize_1.Model {
}
Categoria.init({
    id: {
        type: sequelize_1.DataTypes.CHAR(36),
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true
    },
    vch_nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        field: 'vch_nombre'
    }
}, { sequelize: db_1.sequelize, tableName: 'categorias', timestamps: false });
exports.default = Categoria;
