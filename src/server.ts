import 'dotenv/config';
import { app } from './app';
import { sequelize } from './config/db';
import './models/users';

const port = Number(process.env.PORT) || 3001;

(async () => {
  await sequelize.authenticate();
  // await sequelize.sync({ alter: true }); // DEV: crea/ajusta tablas según modelos
  app.listen(port, '0.0.0.0', () => console.log(`API :${port}`));
})();