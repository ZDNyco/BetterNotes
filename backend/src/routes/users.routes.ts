import { Router } from 'express';
import { db } from '../database/connection';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const [users] = await db.query(`
            SELECT id, name, email, created_at, updated_at
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

export default router;