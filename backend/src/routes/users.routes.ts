import { Router } from 'express';
import { db } from '../database/connection';
import bcrypt from 'bcrypt';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const [users] = await db.query(`
            SELECT 
                id,
                name,
                email,
                created_at,
                updated_at
            FROM users
        `);

        res.json(users);
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);

        res.status(500).json({
            error: 'Erro interno do servidor'
        });
    }
});

router.post('/', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const passwordHash = await bcrypt.hash(password, 10);

        const [result] = await db.query(`
            INSERT INTO users (name, email, password_hash)
            VALUES (?, ?, ?)
        `, [name, email, passwordHash]);

        res.status(201).json({
            message: 'Usuário criado com sucesso!',
            id: (result as any).insertId
        });
    } catch (error) {
        console.error('Erro ao criar usuário:', error);

        res.status(500).json({
            error: 'Erro interno do servidor'
        });
    }
});

export default router;