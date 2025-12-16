import React from 'react';
import { Link } from 'react-router-dom';

export default function AboutPage() {
    return (
        <div style={{ padding: '20px', border: '1px solid #e0e0e0', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
            <h2>Tentang Task Manager 🧠</h2>
            
            <ul style={{ lineHeight: 1.8 }}>
                <li>**Frontend:** Dibangun menggunakan **React** dengan **Vite** dan **React Router DOM** untuk navigasi halaman yang mulus (single-page application).</li>
                <li>**Backend:** Ditenagai oleh **Node.js** dan *framework* **Express** untuk mengelola permintaan API.</li>
                <li>**Database:** Menggunakan **PostgreSQL (PG)** sebagai database relasional untuk penyimpanan data yang handal dan terstruktur.</li>
            </ul>

            
            <Link to="/" style={{ display: 'block', marginTop: '20px', textDecoration: 'none', color: '#007bff' }}>
                &larr; Kembali ke Daftar Task
            </Link>
        </div>
    );
}