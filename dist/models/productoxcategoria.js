"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
class productoxCategoria extends sequelize_1.Model {
}
productoxCategoria.init({
    producto_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    categoria_id: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
}, { sequelize: db_1.sequelize, tableName: 'producto_categorias', timestamps: false });
exports.default = productoxCategoria;
