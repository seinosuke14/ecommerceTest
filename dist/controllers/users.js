"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAll = getAll;
exports.getById = getById;
exports.Post = Post;
exports.Put = Put;
exports.deleteById = deleteById;
const users_1 = __importDefault(require("../models/users"));
async function getAll(_req, res) {
    try {
        const rows = await users_1.default.findAll({ attributes: [
                'id',
                'name',
                'correo',
                'clave'
            ]
        });
        res.json(rows);
    }
    catch (error) {
        console.error('Error fetching users:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
async function getById(req, res) {
    try {
        const row = await users_1.default.findByPk(req.params.id, {
            attributes: [
                'id',
                'name',
                'correo',
                'clave'
            ]
        });
        if (!row)
            return res.sendStatus(404);
        res.json(row);
    }
    catch (error) {
        console.error('Error fetching user by ID:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
async function Post(req, res) {
    try {
        const { name, correo, clave } = req.body;
        if (!name)
            return res.status(400).json({ error: 'name requerido' });
        const row = await users_1.default.create({ name, correo, clave });
        res.status(201).json(row);
    }
    catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
async function Put(req, res) {
    try {
        const row = await users_1.default.findByPk(req.params.id);
        if (!row)
            return res.sendStatus(404);
        await row.update(req.body);
        res.json(row);
    }
    catch (error) {
        console.error('Error updating user:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
async function deleteById(req, res) {
    try {
        const n = await users_1.default.destroy({ where: { id: req.params.id } });
        res.status(n ? 204 : 404).end();
    }
    catch (error) {
        console.error('Error deleting user:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
