import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:3001/tasks';

// ==========================================================
// Komponen Form Tambah Task
// ==========================================================
function TaskForm({ onTaskAdded }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim()) return;

        try {
            const response = await axios.post(API_URL, {
                title: title.trim(),
                description: description.trim(),
            });
            onTaskAdded(response.data); 
            setTitle('');
            setDescription('');
        } catch (err) {
            alert('Gagal menambah task!');
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '30px', padding: '15px', border: '1px solid #ccc', borderRadius: '5px' }}>
            <h2>➕ Tambah Task Baru</h2>
            <input
                type="text"
                placeholder="Judul Task (Wajib)"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
                required
            />
            <textarea
                placeholder="Deskripsi Task (Opsional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '4px', resize: 'vertical' }}
            />
            <button type="submit" style={{ padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                Tambahkan Task
            </button>
        </form>
    );
}

// ==========================================================
// Logika Styling Status
// ==========================================================
const getStatusStyle = (status) => {
    switch (status) {
        case 'completed':
            return { backgroundColor: '#d4edda', color: '#155724' }; // Hijau
        case 'in-progress':
            return { backgroundColor: '#fff3cd', color: '#856404' }; // Kuning
        case 'pending':
        default:
            return { backgroundColor: '#f8d7da', color: '#721c24' }; // Merah Muda
    }
};

// ==========================================================
// Komponen Utama: Task List
// ==========================================================
export default function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchTasks = async () => {
        try {
            setLoading(true);
            const response = await axios.get(API_URL);
            setTasks(response.data);
            setError(null);
        } catch (err) {
            setError('Gagal memuat task. Pastikan server backend berjalan.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleTaskAdded = (newTask) => {
        setTasks([newTask, ...tasks]);
    };
    
    // UPDATE STATUS
    const handleUpdateStatus = async (id, currentStatus) => {
        let newStatus;
        if (currentStatus === 'pending') {
            newStatus = 'in-progress';
        } else if (currentStatus === 'in-progress') {
            newStatus = 'completed';
        } else {
            newStatus = 'pending';
        }

        try {
            await axios.put(`${API_URL}/${id}/status`, { status: newStatus });
            setTasks(tasks.map(task => 
                task.id === id ? { ...task, status: newStatus } : task
            ));
        } catch (err) {
            alert('Gagal mengubah status!');
            console.error(err);
        }
    };
    
    // DELETE TASK
    const handleDeleteTask = async (id) => {
        if (!window.confirm('Yakin hapus task ini?')) return;

        try {
            await axios.delete(`${API_URL}/${id}`);
            setTasks(tasks.filter(task => task.id !== id));
        } catch (err) {
            alert('Gagal menghapus task!');
            console.error(err);
        }
    };

    if (loading) return <div style={{ textAlign: 'center', marginTop: '50px' }}>Memuat tugas...</div>;
    if (error) return <div style={{ color: 'red', textAlign: 'center', marginTop: '50px' }}>Error: {error}</div>;


    return (
        <div>
            {/* Form Tambah Task */}
            <TaskForm onTaskAdded={handleTaskAdded} />

            {/* Daftar Task */}
            <h2>📋 Daftar Task ({tasks.length})</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {tasks.map((task) => (
                    <div key={task.id} style={{ 
                        padding: '15px', 
                        border: '1px solid #eee', 
                        borderRadius: '8px', 
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)' 
                    }}>
                        
                        {/* Judul Task (Sekarang Hanya Teks) */}
                        <h3 style={{ margin: '0 0 5px 0' }}>{task.title}</h3>
                        
                        {task.description && <p style={{ margin: '0 0 10px 0', color: '#555' }}>{task.description}</p>}
                        
                        <div style={{ ...getStatusStyle(task.status), display: 'inline-block', padding: '4px 8px', borderRadius: '4px', fontSize: '0.9em', fontWeight: 'bold' }}>
                            Status: {task.status.toUpperCase()}
                        </div>
                        
                        <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
                            
                            {/* Tombol LIHAT DETAIL (Menggunakan Link untuk Navigasi Halaman) */}
                            <Link to={`/task/${task.id}`} style={{ textDecoration: 'none' }}>
                                <button
                                    style={{ padding: '8px 12px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                                >
                                    Lihat Detail
                                </button>
                            </Link>

                            {/* Tombol Ganti Status */}
                            <button 
                                onClick={() => handleUpdateStatus(task.id, task.status)}
                                style={{ padding: '8px 12px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                            >
                                Ganti Status
                            </button>
                            
                            {/* Tombol Hapus */}
                            <button 
                                onClick={() => handleDeleteTask(task.id)}
                                style={{ padding: '8px 12px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                            >
                                Hapus
                            </button>
                        </div>
                    </div>
                ))}
                {tasks.length === 0 && <p>Tidak ada task. Tambahkan task baru!</p>}
            </div>
        </div>
    );
}