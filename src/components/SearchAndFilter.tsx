import React, { useState, useCallback, useEffect } from 'react';
import { ITask, Props } from '../types/types.ts';
import TaskItem from './TaskItem';

const SearchAndFilter: React.FC<Props> = ({
                                              tasks,
                                              setTasks,
                                              filter,
                                              setFilter,
                                              role,
                                          }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredTasks, setFilteredTasks] = useState<ITask[]>([]);

    const updateFilteredTasks = useCallback(() => {
        let result = [...tasks];

        if (filter === 'completed') {
            result = result.filter((task) => task.completed);
        }
        if (filter === 'active') {
            result = result.filter((task) => !task.completed);
        }

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

    useEffect(() => {
        updateFilteredTasks();
    }, [updateFilteredTasks]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFilter(event.target.value);
    };

    const handleTaskUpdate = (updatedTask: ITask) => {
        setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
        updateFilteredTasks();
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

            {filteredTasks.length > 0 &&
                filteredTasks.map((task) => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        tasks={tasks}
                        setTasks={setTasks}
                        role={role}
                        onUpdateData={handleTaskUpdate}
                    />
                ))
            }
            {filteredTasks.length === 0 && <p>Нет подходящих задач</p>}
        </div>
    );
};

export default SearchAndFilter;