import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db';
import bcrypt from 'bcrypt';
class User extends Model {

  public id!: number;
  public name!: string;
  public correo!: string;
  public contraseña!: string;
  public rol!: string;

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.contraseña);
  }
}
User.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING(100), allowNull: false, field: 'nombre' },
  correo: { type: DataTypes.STRING(100), allowNull: true, field: 'email' },
  contraseña: { type: DataTypes.STRING(100), allowNull: true, field: 'contraseña' },
  rol: { type: DataTypes.STRING(100), allowNull: true, field: 'rol' },

}, { sequelize, tableName: 'usuarios', timestamps: false });

User.beforeCreate(async (user: any) => {
  if (user.contraseña) {
    const salt = await bcrypt.genSalt(10);
    user.contraseña = await bcrypt.hash(user.contraseña, salt);
  }
});

User.beforeUpdate(async (user: any) => {
  if (user.changed('contraseña')) {
    const salt = await bcrypt.genSalt(10);
    user.contraseña = await bcrypt.hash(user.contraseña, salt);
  }
});



export default User;