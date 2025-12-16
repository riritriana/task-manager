// C:\...\task-app\backend\db.js (UPDATE UNTUK TYPE MODULE)
import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
    user: 'postgres',       
    host: 'localhost',
    database: 'task_manager_db',
    password: '12345678', 
    port: 5432, 
});

// Wrapper untuk menjalankan query
async function query(text, params) {
    const client = await pool.connect();
    try {
        const res = await client.query(text, params);
        return res;
    } finally {
        client.release();
    }
}

export { query };
