import express from 'express';
import cors from 'cors';
import { query } from './db.js'; 

const app = express();
const PORT = 3001; 

// Middleware
app.use(cors()); 
app.use(express.json()); 

// A. Lihat Daftar Task (GET /tasks)
app.get('/tasks', async (req, res) => {
    try {
        const result = await query('SELECT * FROM tasks ORDER BY id DESC');
        res.json(result.rows); 
    } catch (err) {
        console.error('Error fetching tasks:', err);
        res.status(500).json({ error: 'Gagal mengambil daftar task' });
    }
});

// B. Tambah Task (POST /tasks)
app.post('/tasks', async (req, res) => {
    const { title, description } = req.body;
    if (!title) return res.status(400).json({ error: 'Judul task wajib diisi' });

    try {
        const result = await query(
            'INSERT INTO tasks (title, description) VALUES ($1, $2) RETURNING *',
            [title, description || null]
        );
        res.status(201).json(result.rows[0]); 
    } catch (err) {
        console.error('Error adding task:', err);
        res.status(500).json({ error: 'Gagal menambah task' });
    }
});

// C. Update Status Task (PUT /tasks/:id/status)
app.put('/tasks/:id/status', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const validStatuses = ['pending', 'in-progress', 'completed'];
    if (!status || !validStatuses.includes(status)) {
        return res.status(400).json({ error: 'Status tidak valid' });
    }

    try {
        const result = await query(
            'UPDATE tasks SET status = $1 WHERE id = $2',
            [status, id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Task tidak ditemukan' });
        }
        res.json({ message: 'Status berhasil diperbarui' });
    } catch (err) {
        console.error('Error updating status:', err);
        res.status(500).json({ error: 'Gagal update status task' });
    }
});

// D. Hapus Task (DELETE /tasks/:id)
app.delete('/tasks/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await query(
            'DELETE FROM tasks WHERE id = $1',
            [id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Task tidak ditemukan' });
        }
        res.json({ message: 'Task berhasil dihapus' });
    } catch (err) {
        console.error('Error deleting task:', err);
        res.status(500).json({ error: 'Gagal menghapus task' });
    }
});

app.get('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await query('SELECT * FROM tasks WHERE id = $1', [id]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Task tidak ditemukan' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Error fetching single task:', err);
        res.status(500).json({ error: 'Gagal mengambil detail task' });
    }
});
// Jalankan server
app.listen(PORT, () => {
    console.log(`Server Backend berjalan di http://localhost:${PORT}`);
});