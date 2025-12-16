import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const mainContainerStyle = {
    maxWidth: '800px',
    margin: '0 auto', // Ini yang membuat konten di tengah
    fontFamily: 'sans-serif',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    borderRadius: '10px',
    backgroundColor: '#fff'
};

export default function Layout() {
    return (
        <div style={mainContainerStyle}>
            <header style={{ borderBottom: '1px solid #ddd', paddingBottom: '15px', marginBottom: '20px' }}>
                <h1 style={{ margin: 0, color: '#333' }}>Task Manager 🚀</h1>
                
                <nav style={{ marginTop: '10px' }}>
                    {/* Link ke Daftar Task (Root /) */}
                    <Link to="/" style={{ marginRight: '15px', textDecoration: 'none', color: '#007bff', fontWeight: 'bold' }}>
                        Daftar Task
                    </Link>
                    
                    {/* Link BARU ke Halaman Informasi (/about) */}
                    <Link to="/about" style={{ marginRight: '15px', textDecoration: 'none', color: '#6c757d', fontWeight: 'bold' }}>
                        Informasi Aplikasi
                    </Link>
                </nav>
            </header>

            {/* <Outlet> akan merender Daftar Task, Detail Task, atau Halaman Informasi */}
            <main>
                <Outlet />
            </main>
        </div>
    );
}