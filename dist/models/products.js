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
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        field: 'nombre'
    },
    price: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        field: 'price'
    },
    sku: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        field: 'sku'
    },
    discount: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        field: 'discount'
    },
    descriptions: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        field: 'descriptions'
    },
}, { sequelize: db_1.sequelize, tableName: 'products', timestamps: false });
exports.default = Products;
