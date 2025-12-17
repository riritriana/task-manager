// C:\...\task-app\frontend\src\components\TaskDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'https://task-manager-apii.vercel.app/tasks';

export default function TaskDetail() {
    const { id } = useParams(); // Ambil parameter 'id' dari URL
    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTaskDetail = async () => {
            try {
                setLoading(true);
                // Panggil API backend untuk mendapatkan detail task berdasarkan ID
                const response = await axios.get(`${API_URL}/${id}`);
                setTask(response.data);
                setError(null);
            } catch (err) {
                setError('Gagal memuat detail task. Mungkin task tidak ditemukan.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchTaskDetail();
    }, [id]); // Jalankan lagi jika ID berubah

    if (loading) return <p style={{ textAlign: 'center' }}>Memuat detail task...</p>;
    if (error) return <p style={{ color: 'red', textAlign: 'center' }}>Error: {error}</p>;
    if (!task) return <p style={{ textAlign: 'center' }}>Task tidak ditemukan.</p>;

    // Styling status (bisa disalin dari TaskList.jsx)
    const getStatusStyle = (status) => {
        switch (status) {
            case 'completed': return { backgroundColor: '#d4edda', color: '#155724', padding: '5px', borderRadius: '4px' };
            case 'in-progress': return { backgroundColor: '#fff3cd', color: '#856404', padding: '5px', borderRadius: '4px' };
            default: return { backgroundColor: '#f8d7da', color: '#721c24', padding: '5px', borderRadius: '4px' };
        }
    };

    return (
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h2>Detail Task: {task.title}</h2>
            
            <p><strong>ID:</strong> {task.id}</p>
            <p><strong>Deskripsi:</strong> {task.description || 'Tidak ada deskripsi.'}</p>
            <p><strong>Status:</strong> 
                <span style={getStatusStyle(task.status)}>
                    {task.status.toUpperCase()}
                </span>
            </p>
            <p><strong>Dibuat pada:</strong> {new Date(task.created_at).toLocaleString()}</p>
            
            <Link to="/" style={{ display: 'inline-block', marginTop: '20px', textDecoration: 'none', color: '#007bff' }}>
                &larr; Kembali ke Daftar Task
            </Link>
        </div>
    );
}