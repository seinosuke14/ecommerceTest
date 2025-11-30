import { Router } from 'express';
import { getAll, getById, Post, Put, deleteById, login } from '../controllers/users';
import { authenticateToken } from '../middleware/auth';
const r = Router();

r.post('/login', login);
r.post('/register', Post);


r.get('/users', authenticateToken, getAll);
r.get('/:id', authenticateToken, getById);
r.put('/:id', authenticateToken, Put);
r.delete('/:id', authenticateToken, deleteById);


export default r;