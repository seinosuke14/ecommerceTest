import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db';

export class Venta extends Model {
    declare id: number;
    declare usuario_id: number | null;
    declare nombre_cliente: string;
    declare email_cliente: string | null;
    declare telefono_cliente: string | null;
    declare fecha_venta: Date;
    declare subtotal: number;
    declare descuento: number;
    declare total: number;
    declare metodo_pago: string | null;
    declare estado: string;
    declare notas: string | null;
}

Venta.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'usuarios',
            key: 'id'
        }
    },
    nombre_cliente: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    email_cliente: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    telefono_cliente: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    fecha_venta: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    subtotal: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    descuento: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0
    },
    total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    metodo_pago: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    estado: {
        type: DataTypes.STRING(50),
        defaultValue: 'completada'
    },
    notas: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    sequelize,
    tableName: 'ventas',
    timestamps: false
});

export default Venta;