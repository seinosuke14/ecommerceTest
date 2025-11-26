import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db';

class Products extends Model { }
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
  url_image:
  {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'url_image'
  },
  descriptions:
  {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'descriptions'
  },

}, { sequelize, tableName: 'products', timestamps: false });

export default Products;