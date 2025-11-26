import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db';


class productoxCategoria extends Model { }
productoxCategoria.init({
    producto_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    categoria_id: {
        type: DataTypes.STRING,
        allowNull: false
    }

}, { sequelize, tableName: 'producto_categorias', timestamps: false });
export default productoxCategoria;