import { Routes, Route, Link } from 'react-router-dom';
import TaskList from './components/TaskList';
import TaskDetail from './components/TaskDetail'; 
import Layout from './components/Layout';   
import AboutPage from './components/AboutPage';



function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}> 
            
                <Route index element={<TaskList />} /> 
                
                <Route path="task/:id" element={<TaskDetail />} /> 
                
                <Route path="about" element={<AboutPage />} /> 
                
                <Route path="*" element={<p style={{ textAlign: 'center' }}>Halaman Tidak Ditemukan (404)</p>} />
            </Route>
        </Routes>
    );
}export default App;