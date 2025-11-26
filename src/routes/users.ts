import { Router } from 'express';
import { getAll, getById, Post, Put, deleteById } from '../controllers/users';
const r = Router();

r.get('/', getAll);
r.get('/:id', getById);
r.post('/', Post);
r.put('/:id', Put);
r.delete('/:id', deleteById);


export default r;