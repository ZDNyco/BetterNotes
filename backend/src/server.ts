import express from 'express';
import { db } from './database/connection';

const app = express();
app.use(express.json());

const PORT = 3000;

app.get('/', (req, res) => {
    res.json({
        message: 'BetterNotes API funcionando!'
    });
});

app.get('/users', async (req, res) => {
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

app.listen(PORT, () => {
    console.log(`BetterNotes API rodando em http://localhost:${PORT}`);
});