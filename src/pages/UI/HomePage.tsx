import { useState, useEffect } from 'react';
import { ITask } from '../../types/types.ts';
import Header from '../../components/Header';
import TaskInput from '../../components/TaskInput';
import SearchAndFilter from '../../components/SearchAndFilter';

const HomePage = () => {
    const [tasks, setTasks] = useState<ITask[] | []>([]);
    const [filter, setFilter] = useState<string>('all');
    const [role, setRole] = useState<string>('');

    // Получаем роль из localStorage при монтировании компонента
    useEffect(() => {
        const userRole = localStorage.getItem('role'); // Загружаем роль из localStorage
        if (userRole) {
            setRole(userRole); // Устанавливаем роль
        }
    }, []);

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

    // Слушатель для отслеживания изменений в localStorage
    useEffect(() => {
        function handleLocalStorageChange(event: StorageEvent) {
            if (event.key === 'role') {
                setRole(event.newValue || ''); // Обновляем состояние роли
            }
        }

        window.addEventListener('storage', handleLocalStorageChange);

        return () => {
            window.removeEventListener('storage', handleLocalStorageChange);
        };
    }, []);

    const addTask = (task: ITask) => {
        setTasks([...tasks, task]); // Добавляем новую задачу в список
    };

    return (
        <div className="app">
            <Header title='База данных ИД' />
            <TaskInput tasks={tasks} setTasks={setTasks} addTask={addTask} userRole={role} />
            <SearchAndFilter tasks={tasks} setTasks={setTasks} filter={filter} setFilter={setFilter} role={role} />
        </div>
    );
};

export default HomePage;