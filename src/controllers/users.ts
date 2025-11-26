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
          'edad'
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
        'edad'
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
    const { name, correo, clave } = req.body;
    if (!name) return res.status(400).json({ error: 'name requerido' });
    const row = await User.create({ name, correo, clave });
    res.status(201).json(row);
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