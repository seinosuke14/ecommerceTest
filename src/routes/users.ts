import { Router } from 'express';
import { getAll, getById, Post, Put, deleteById, login } from '../controllers/users';
const r = Router();

r.post('/login', login);  // ⬅️ Nueva ruta
r.post('/register', Post);
r.get('/users', getAll);
r.get('/:id', getById);
r.put('/:id', Put);
r.delete('/:id', deleteById);


export default r;