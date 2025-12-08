import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db';


export class Menu extends Model {
    declare id: number;
    declare nombre: string;
    declare descripcion: string;
    declare precio_total: number;
    declare precio_con_descuento: number;
    declare descuento_porcentaje: number;
    declare disponible: boolean;
    declare imagen: string;
    declare sku: string;

}

Menu.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    precio_total: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    precio_con_descuento: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    descuento_porcentaje: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    disponible: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    imagen: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    sku: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fecha_creacion: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: 'fecha_creacion'
    }

}, {
    sequelize,
    tableName: 'menus',
    timestamps: false,
});

export default Menu;