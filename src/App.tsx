import React, { useState, useEffect } from 'react';
import { ITask } from './types/types.ts';
import { users } from './users';
import Header from './components/Header';
import TaskInput from './components/TaskInput';
import SearchAndFilter from './components/SearchAndFilter'; // Импортируем новый компонент

const App = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [role, setRole] = useState<string>(''); // Для хранения роли пользователя
    const [tasks, setTasks] = useState<ITask[] | []>([]); //в useState мы можем передавать объект ITask или пустой массив
    const [filter, setFilter] = useState<string>('all'); //<в этих скобочках типизация хука useState> а в этих - [filter-само состояние setFilter-функция состояния] а в этих - (изначальное состояние)


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const user = users.find((u) => u.username === username && u.password === password);

        if (!user) {
            setErrorMessage('Неверный логин или пароль');
        } else {
            setIsLoggedIn(true);
            setRole(user.role); // Сохраняем роль пользователя
            setErrorMessage('');
        }
    };

// Проверяем наличие сохраненных задач в localStorage при монтировании компонента
    useEffect(() => {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            try {
                setTasks(JSON.parse(storedTasks)); // Восстанавливаем состояние задач из localStorage
            } catch (err) {
                console.error("Ошибка парсинга задач из localStorage:", err);
            }
        }
    }, []);

// Сохраняем задачи в localStorage только при изменении массива задач
    useEffect(() => {
        if (tasks.length > 0) { // Убедимся, что задачи существуют перед сохранением
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }, [tasks]);

    const addTask = (task: ITask) => {
        setTasks([...tasks, task]); // Добавляем новую задачу в список
    };

    return (
        <div className="app">
            {!isLoggedIn ? (
                <>
                    <h1>Авторизация</h1>
                    <form onSubmit={handleSubmit}>
                        <input type="text"
                               placeholder="Логин"
                               value={username}
                               onChange={(e) => setUsername(e.target.value)} />
                        <br />
                        <input type="password"
                               placeholder="Пароль"
                               value={password}
                               onChange={(e) => setPassword(e.target.value)} />
                        <br />
                        <button type="submit">Войти</button>
                    </form>
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                </>
            ) : (
                <>
                    <Header title='true База данных ИД' />
                    <TaskInput tasks={tasks} setTasks={setTasks} addTask={addTask} userRole={role} />
                    <SearchAndFilter tasks={tasks} setTasks={setTasks} filter={filter} setFilter={setFilter} role={role} />
                </>
            )}
        </div>
    );
};

export default App;