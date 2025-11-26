"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
class Products extends sequelize_1.Model {
}
Products.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING(300),
        allowNull: false,
        field: 'vch_nombre'
    },
    price: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        field: 'int_precio'
    },
    sku: {
        type: sequelize_1.DataTypes.STRING(150),
        allowNull: true,
        field: 'vch_sku'
    },
}, { sequelize: db_1.sequelize, tableName: 'products', timestamps: false });
exports.default = Products;
