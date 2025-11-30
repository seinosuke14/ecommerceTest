import { Validator } from '../helpers/validator';
import User from '../models/users';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export async function getAll(_req: Request, res: Response) {
  try {
    const rows = await User.findAll({
      attributes: ['id', 'nombre', 'email', 'rol']
      // NUNCA incluir 'contraseña' aquí
    });
    res.json(rows);
  } catch (error) {
    console.error('Error fetching users:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export async function getById(req: Request, res: Response) {
  try {
    const row = await User.findByPk(req.params.id, {
      attributes: ['id', 'nombre', 'email', 'rol']
      // NUNCA incluir 'contraseña' aquí
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
    if (!Validator.isNotEmpty(name)) {
      return res.status(400).json({ error: 'Nombre es requerido' });
    }

    if (!Validator.isNotEmpty(correo)) {
      return res.status(400).json({ error: 'Correo es requerido' });
    }

    if (!Validator.isValidEmail(correo)) {
      return res.status(400).json({ error: 'Formato de correo inválido' });
    }

    if (!Validator.isNotEmpty(contraseña)) {
      return res.status(400).json({ error: 'Contraseña es requerida' });
    }

    if (!Validator.isValidPassword(contraseña, 6)) {
      return res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres' });
    }

    // Verificar si el correo ya existe
    const existe = await User.findOne({ where: { correo } });
    if (existe) {
      return res.status(400).json({ error: 'El correo ya está registrado' });
    }

    // Crear usuario (el hook beforeCreate hasheará la contraseña automáticamente)
    const row = await User.create({
      name,
      correo,
      contraseña,
      rol: rol || 'usuario'
    });

    // Respuesta sin contraseña
    res.status(201).json({
      id: row.id,
      name: row.name,
      correo: row.correo,
      rol: row.rol
    });

  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export async function Put(req: Request, res: Response) {
  try {
    const row = await User.findByPk(req.params.id);
    if (!row) return res.sendStatus(404);

    // Si se está actualizando el correo
    if (req.body.correo) {
      if (!Validator.isValidEmail(req.body.correo)) {
        return res.status(400).json({ error: 'Formato de correo inválido' });
      }

      // Verificar que no exista otro usuario con ese correo
      if (req.body.correo !== row.correo) {
        const existe = await User.findOne({ where: { correo: req.body.correo } });
        if (existe) {
          return res.status(400).json({ error: 'El correo ya está registrado' });
        }
      }
    }

    // Si se está actualizando la contraseña
    if (req.body.contraseña) {
      if (!Validator.isValidPassword(req.body.contraseña, 6)) {
        return res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres' });
      }
      // El hook beforeUpdate hasheará la contraseña automáticamente
    }

    // Actualizar usuario
    await row.update(req.body);

    // Respuesta sin contraseña
    res.json({
      id: row.id,
      name: row.name,
      correo: row.correo,
      rol: row.rol
    });

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

export async function login(req: Request, res: Response) {
  try {
    const { correo, contraseña } = req.body;

    // Validaciones
    if (!Validator.isNotEmpty(correo) || !Validator.isNotEmpty(contraseña)) {
      return res.status(400).json({ error: 'Correo y contraseña son obligatorios' });
    }

    // Buscar usuario por correo
    const user = await User.findOne({ where: { correo } });
    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Verificar contraseña usando el método del modelo
    const esValida = await user.validatePassword(contraseña);
    if (!esValida) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // ✨ GENERAR TOKEN JWT
    const token = jwt.sign(
      {
        id: user.id,
        correo: user.correo,
        rol: user.rol
      },
      process.env.JWT_SECRET || 'tu-secreto-super-seguro-cambiame', // ⚠️ IMPORTANTE: Cambiar en producción
      {
        expiresIn: '7d' // El token expira en 7 días
      }
    );

    // Login exitoso con token
    res.json({
      message: 'Login exitoso',
      token, // ⭐ Agregar el token en la respuesta
      user: {
        id: user.id,
        name: user.name,
        correo: user.correo,
        rol: user.rol
      }
    });

  } catch (error) {
    console.error('Error en login:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}