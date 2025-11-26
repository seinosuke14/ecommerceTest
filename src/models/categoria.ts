import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db';

class Categoria extends Model { }
Categoria.init({
    id: {
        type: DataTypes.UUID,
        autoIncrement: true,
        primaryKey: true
    },
    vch_nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'vch_nombre'
    }


}, { sequelize, tableName: 'categorias', timestamps: false });
export default Categoria;