import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db';


export class menuxproducto extends Model {

}

menuxproducto.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    menu_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    producto_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    cantidad: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    },
    orden: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }


}, { sequelize, tableName: 'menu_productos', timestamps: false });

export default menuxproducto;
