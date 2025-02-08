import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { users } from '../users.ts';
import '../styles/main.scss';

const AuthPage = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const user = users.find((u) => u.username === username && u.password === password);

        if (!user) {
            setErrorMessage('Неверный логин или пароль');
        } else {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('role', user.role);
            navigate('/HomePage'); // Переход на главную страницу после успешной авторизации
        }
    };

    return (
        <div className="auth-page">
            <h1>Авторизация</h1>
            <form className='loginPassword' onSubmit={handleSubmit}>
                <label htmlFor="username">Логин:</label>
                <input
                    id="username"
                    type="text"
                    placeholder="Логин"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label htmlFor="password">Пароль:</label>
                <input
                    id="password"
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Войти</button>
            </form>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
    );
};

export default AuthPage;