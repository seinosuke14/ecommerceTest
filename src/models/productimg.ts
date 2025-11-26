import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db';


class ProductImg extends Model { }
ProductImg.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'product_id'
    },
    url_img: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'url_image'
    },
    orden: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'orden'
    },
    es_principal: {
        type: DataTypes.TINYINT,
        allowNull: false,
        field: 'es_principal',
        defaultValue: 0
    }


}, { sequelize, tableName: 'product_images', timestamps: false });

export default ProductImg;