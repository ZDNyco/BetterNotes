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


async function testConnection() {
    try {
        const connection = await db.getConnection();

        console.log('Conexão com MySQL realizada com sucesso!');

        connection.release();
    } catch (error) {
        console.error('Erro ao conectar com MySQL:', error);
    }
}
testConnection();


app.listen(PORT, () => {
    console.log(`BetterNotes API rodando em http://localhost:${PORT}`);
});