"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
class User extends sequelize_1.Model {
}
User.init({
    id: { type: sequelize_1.DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: sequelize_1.DataTypes.STRING(120), allowNull: false, field: 'nombre' },
    correo: { type: sequelize_1.DataTypes.STRING(120), allowNull: true, field: 'email' },
    edad: { type: sequelize_1.DataTypes.STRING(120), allowNull: true, field: 'edad' },
}, { sequelize: db_1.sequelize, tableName: 'usuarios', timestamps: false });
exports.default = User;
