import express from 'express';
import usersRoutes from './routes/users.routes';
import notesRoutes from './routes/notes.routes';

const app = express();
app.use(express.json());

const PORT = 3000;

app.get('/', (req, res) => {
    res.json({
        message: 'BetterNotes API funcionando!'
    });
});

app.use('/users', usersRoutes);
app.use('/notes', notesRoutes);

app.listen(PORT, () => {
    console.log(`BetterNotes API rodando em http://localhost:${PORT}`);
});