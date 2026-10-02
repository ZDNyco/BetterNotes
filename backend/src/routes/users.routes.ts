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

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password } = req.body;

        if (password) {
            const passwordHash = await bcrypt.hash(password, 10);

            const [result] = await db.query(`
                UPDATE users
                SET name = ?, email = ?, password_hash = ?
                WHERE id = ?
            `, [name, email, passwordHash, id]);

            const updateResult = result as any;

            if (updateResult.affectedRows === 0) {
                return res.status(404).json({
                    error: 'Usuário não encontrado'
                });
            }
        } else {
            const [result] = await db.query(`
                UPDATE users
                SET name = ?, email = ?
                WHERE id = ?
            `, [name, email, id]);

            const updateResult = result as any;

            if (updateResult.affectedRows === 0) {
                return res.status(404).json({
                    error: 'Usuário não encontrado'
                });
            }
        }

        res.json({
            message: 'Usuário atualizado com sucesso!'
        });

    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);

        res.status(500).json({
            error: 'Erro interno do servidor'
        });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await db.query(`
            DELETE FROM users
            WHERE id = ?
        `, [id]);

        const deleteResult = result as any;

        if (deleteResult.affectedRows === 0) {
            return res.status(404).json({
                error: 'Usuário não encontrado'
            });
        }

        res.json({
            message: 'Usuário excluído com sucesso!'
        });

    } catch (error) {
        console.error('Erro ao excluir usuário:', error);

        res.status(500).json({
            error: 'Erro interno do servidor'
        });
    }
});

export default router;