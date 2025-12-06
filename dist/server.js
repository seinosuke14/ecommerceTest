"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const app_1 = require("./app");
const db_1 = require("./config/db");
require("./models/users");
const port = Number(process.env.PORT) || 3001;
(async () => {
    await db_1.sequelize.authenticate();
    // await sequelize.sync({ alter: true }); // DEV: crea/ajusta tablas según modelos
    app_1.app.listen(port, () => console.log(`API :${port}`));
})();
