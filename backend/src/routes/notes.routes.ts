import { Router } from 'express';
import { db } from '../database/connection';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const [notes] = await db.query(`
            SELECT
                id,
                user_id,
                title,
                content,
                color,
                is_pinned,
                is_archived,
                created_at,
                updated_at
            FROM notes
            WHERE deleted_at IS NULL
        `);

        res.json(notes);
    } catch (error) {
        console.error('Erro ao buscar notas:', error);

        res.status(500).json({
            error: 'Erro interno do servidor'
        });
    }
});

router.post('/', async (req, res) => {
    try {
        const { user_id, title, content } = req.body;

        const [result] = await db.query(`
            INSERT INTO notes (user_id, title, content)
            VALUES (?, ?, ?)
        `, [user_id, title, content]);

        res.status(201).json({
            message: 'Nota criada com sucesso!',
            id: (result as any).insertId
        });
    } catch (error) {
        console.error('Erro ao criar nota:', error);

        res.status(500).json({
            error: 'Erro interno do servidor'
        });
    }
});

export default router;