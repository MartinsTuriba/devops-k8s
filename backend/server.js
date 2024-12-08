const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
// Get all todos
app.get('/api/todos', async (req, res) => {
    try {
        const allTodos = await pool.query('SELECT * FROM todos ORDER BY created_at DESC');
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Create a todo
app.post('/api/todos', async (req, res) => {
    try {
        const { title } = req.body;
        const newTodo = await pool.query(
            'INSERT INTO todos (title) VALUES($1) RETURNING *',
            [title]
        );
        res.json(newTodo.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Update a todo
app.put('/api/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { completed } = req.body;
        await pool.query(
            'UPDATE todos SET completed = $1 WHERE id = $2',
            [completed, id]
        );
        res.json({ message: 'Todo updated successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Delete a todo
app.delete('/api/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM todos WHERE id = $1', [id]);
        res.json({ message: 'Todo deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});