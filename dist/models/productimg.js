"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
class ProductImg extends sequelize_1.Model {
}
ProductImg.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    product_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        field: 'product_id'
    },
    url_image: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        field: 'url_image'
    },
    orden: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        field: 'orden'
    },
    es_principal: {
        type: sequelize_1.DataTypes.TINYINT,
        allowNull: false,
        field: 'es_principal',
        defaultValue: 0
    }
}, { sequelize: db_1.sequelize, tableName: 'product_images', timestamps: false });
exports.default = ProductImg;
