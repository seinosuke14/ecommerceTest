import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db';

class Products extends Model {
  declare id: number;
  declare nombre: string;
  declare price?: string;
  declare sku?: string;
  declare discount?: string;
  declare descriptions?: string;
}
Products.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'nombre'
  },
  price:
  {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'price'
  },
  sku:
  {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'sku'
  },
  discount:
  {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'discount'
  },
  descriptions:
  {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'descriptions'
  },

}, { sequelize, tableName: 'products', timestamps: false });

export default Products;