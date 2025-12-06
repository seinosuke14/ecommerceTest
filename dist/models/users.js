"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
const bcrypt_1 = __importDefault(require("bcrypt"));
class User extends sequelize_1.Model {
    async validatePassword(password) {
        return bcrypt_1.default.compare(password, this.contraseña);
    }
}
User.init({
    id: { type: sequelize_1.DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: sequelize_1.DataTypes.STRING(100), allowNull: false, field: 'nombre' },
    correo: { type: sequelize_1.DataTypes.STRING(100), allowNull: true, field: 'email' },
    contraseña: { type: sequelize_1.DataTypes.STRING(100), allowNull: true, field: 'contraseña' },
    rol: { type: sequelize_1.DataTypes.STRING(100), allowNull: true, field: 'rol' },
}, { sequelize: db_1.sequelize, tableName: 'usuarios', timestamps: false });
User.beforeCreate(async (user) => {
    if (user.contraseña) {
        const salt = await bcrypt_1.default.genSalt(10);
        user.contraseña = await bcrypt_1.default.hash(user.contraseña, salt);
    }
});
User.beforeUpdate(async (user) => {
    if (user.changed('contraseña')) {
        const salt = await bcrypt_1.default.genSalt(10);
        user.contraseña = await bcrypt_1.default.hash(user.contraseña, salt);
    }
});
exports.default = User;
