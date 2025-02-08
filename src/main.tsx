import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/main.scss';
import HomePage from './pages/UI/HomePage.tsx'
import AuthPage from './pages/AuthPage.tsx';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Router>
            <Routes>
                <Route path="/login" element={<AuthPage />} />
                <Route path="/HomePage" element={<HomePage />} />
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </Router>
    </StrictMode>,
)