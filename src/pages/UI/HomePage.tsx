import { useState, useEffect } from 'react';
import { ITask } from '../../types/types.ts';
import Header from '../../components/Header';
import TaskInput from '../../components/TaskInput';
import SearchAndFilter from '../../components/SearchAndFilter';

const HomePage = () => {
    const [tasks, setTasks] = useState<ITask[] | []>([]);
    const [filter, setFilter] = useState<string>('all');
    const [role, setRole] = useState<string>('');


    useEffect(() => {
        const userRole = localStorage.getItem('role');
        if (userRole) {
            setRole(userRole);
        }
    }, []);


    useEffect(() => {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            try {
                setTasks(JSON.parse(storedTasks));
            } catch (err) {
                console.error("Ошибка парсинга задач из localStorage:", err);
            }
        }
    }, []);


    useEffect(() => {
        if (tasks.length > 0) {
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }, [tasks]);


    useEffect(() => {
        function handleLocalStorageChange(event: StorageEvent) {
            if (event.key === 'role') {
                setRole(event.newValue || '');
            }
        }

        window.addEventListener('storage', handleLocalStorageChange);

        return () => {
            window.removeEventListener('storage', handleLocalStorageChange);
        };
    }, []);

    const addTask = (task: ITask) => {
        setTasks([...tasks, task]);
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