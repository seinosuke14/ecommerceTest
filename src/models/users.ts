import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db';

class User extends Model { }
User.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING(100), allowNull: false, field: 'nombre' },
  correo: { type: DataTypes.STRING(100), allowNull: true, field: 'email' },
  edad: { type: DataTypes.STRING(100), allowNull: true, field: 'edad' },

}, { sequelize, tableName: 'usuarios', timestamps: false });

export default User;