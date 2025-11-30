import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db';


class ProductImg extends Model {
    declare id: number;
    declare product_id: number;
    declare url_image: string;
    declare orden: number;
    declare es_principal: number;
}
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
    url_image: {
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