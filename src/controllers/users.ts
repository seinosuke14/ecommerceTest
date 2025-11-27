import { Validator } from '../helpers/validator';
import User from '../models/users';
import { Request, Response } from 'express';

export async function getAll(_req: Request, res: Response) {
  try {
    const rows = await User.findAll(
      {
        attributes: [
          'id',
          'nombre',
          'email',
          'rol'
        ]
      }
    );
    res.json(rows);
  } catch (error) {
    console.error('Error fetching users:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }

}

export async function getById(req: Request, res: Response) {
  try {
    const row = await User.findByPk(req.params.id, {
      attributes: [
        'id',
        'nombre',
        'email',
        'rol'
      ]
    });
    if (!row) return res.sendStatus(404);
    res.json(row);
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export async function Post(req: Request, res: Response) {
  try {
    const { name, correo, contraseña, rol } = req.body;

    // Validaciones
    if (!Validator.isNotEmpty(name)) return res.status(400).json({ error: 'name requerido' });
    if (!Validator.isValidEmail(correo)) return res.status(400).json({ error: 'correo requerido' });
    if (!Validator.isValidPassword(contraseña, 6)) return res.status(400).json({ error: 'contraseña requerida' });


    // Verificar si el correo ya existe
    const existe = await User.findOne({ where: { correo } });
    if (existe) {
      return res.status(400).json({ error: 'El correo ya está registrado' });
    }

    // Crear usuario (el hook beforeCreate hasheará la contraseña)
    const row = await User.create({ name, correo, contraseña, rol });

    // Respuesta sin contraseña
    const userResponse = {
      id: row.id,
      name: row.name,
      correo: row.correo,
      rol: row.rol
    };

    res.status(201).json(userResponse);
  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export async function Put(req: Request, res: Response) {
  try {
    const row = await User.findByPk(req.params.id);
    if (!row) return res.sendStatus(404);
    await row.update(req.body);
    res.json(row);
  } catch (error) {
    console.error('Error updating user:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export async function deleteById(req: Request, res: Response) {
  try {
    const n = await User.destroy({ where: { id: req.params.id } });
    res.status(n ? 204 : 404).end();
  } catch (error) {
    console.error('Error deleting user:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}