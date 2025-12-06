"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
exports.sequelize = new sequelize_1.Sequelize(process.env.MYSQLDATABASE || process.env.DB_NAME || '', process.env.MYSQLUSER || process.env.DB_USER || '', process.env.MYSQLPASSWORD || process.env.DB_PASS || '', {
    host: process.env.MYSQLHOST || process.env.DB_HOST || 'localhost',
    port: Number(process.env.MYSQLPORT || process.env.DB_PORT) || 3306,
    dialect: 'mysql',
    logging: false,
    define: { underscored: true },
    dialectOptions: process.env.NODE_ENV === 'production'
        ? {
            ssl: {
                rejectUnauthorized: false
            }
        }
        : {}
});
