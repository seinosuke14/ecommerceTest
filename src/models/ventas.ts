import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db';


const Venta = sequelize.define('Venta', {
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
    tableName: 'ventas',
    timestamps: false
});

module.exports = Venta;