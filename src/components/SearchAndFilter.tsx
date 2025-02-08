import React, { useState, useCallback, useEffect } from 'react';
import { ITask, Props } from '../types/types.ts';
import TaskItem from './TaskItem';

const SearchAndFilter: React.FC<Props> = ({
                                              tasks,
                                              setTasks,
                                              filter,
                                              setFilter,
                                              role, // Используем роль
                                          }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredTasks, setFilteredTasks] = useState<ITask[]>([]);

    // Эта функция обновляет отфильтрованные задачи каждый раз, когда меняются задачи, фильтр или поисковый запрос
    const updateFilteredTasks = useCallback(() => {
        let result = [...tasks];

        // Применяем фильтр
        if (filter === 'completed') {
            result = result.filter((task) => task.completed);
        }
        if (filter === 'active') {
            result = result.filter((task) => !task.completed);
        }

        // Выполняем поиск по отфильтрованным задачам
        if (searchTerm !== '') {
            result = result.filter((task) => {
                return (
                    task.projectCode?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    task.contractorOrganization?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    task.engineerSK?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    task.engineerPTO?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    task.statusID?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    new Date(task.dueDate).toLocaleDateString('ru-RU').includes(searchTerm)
                );
            });
        }

        setFilteredTasks(result);
    }, [tasks, searchTerm, filter]);

    // Вызываем обновление отфильтрованных задач при изменении зависимостей
    useEffect(() => {
        updateFilteredTasks();
    }, [updateFilteredTasks]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFilter(event.target.value);
    };

    // Функция для обновления данных задачи
    const handleTaskUpdate = (updatedTask: ITask) => {
        setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task)); // Обновляем задачи
        updateFilteredTasks(); // Пересчитываем отфильтрованные задачи
    };

    return (
        <div className={"search"}>
            <input
                type="text"
                placeholder="Поиск..."
                value={searchTerm}
                onChange={handleSearchChange}
            />
            <select value={filter} onChange={handleFilterChange}>
                <option value="all">Все</option>
                <option value="completed">Архив</option>
                <option value="active">В работе</option>
            </select>

            {/* Рендерим только отфильтрованные задачи */}
            {filteredTasks.length > 0 &&
                filteredTasks.map((task) => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        tasks={tasks}
                        setTasks={setTasks}
                        role={role} // Передаем роль в TaskItem
                        onUpdateData={handleTaskUpdate}
                    />
                ))
            }
            {filteredTasks.length === 0 && <p>Нет подходящих задач</p>}
        </div>
    );
};

export default SearchAndFilter;