import { useState } from 'react';
import { ITask, IProps } from '../types/types.ts';
import '../styles/main.scss'; // Подключение стилей


const userRole = localStorage.getItem('role');

const TaskItem = ({ task, tasks, setTasks, onUpdateData }: IProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTask, setEditedTask] = useState<ITask>({
        ...task,
        dueDate: new Date(task.dueDate), // Убедитесь, что dueDate является объектом Date
    });

    const toggleCompletion = () => {
        if (userRole === 'admin') {
            setTasks(
                tasks.map((t) =>
                    t.id === task.id ? { ...t, completed: !t.completed } : t
                )
            );
        } else {
            alert('У вас нет прав на изменение статуса задачи!');
        }
    };

    const deleteTask = () => {
        if (userRole === 'admin') {
            if (window.confirm("Вы уверены, что хотите удалить эту задачу?")) {
                setTasks(tasks.filter((t) => t.id !== task.id));
            }
        } else {
            alert('У вас нет прав на удаление этой задачи!');
        }
    };

    const startEditing = () => {
        if (userRole === 'admin' || userRole === 'user1') {
            setIsEditing(true);
        } else {
            alert('У вас нет прав на редактирование!');
        }
    };

    const stopEditing = () => {
        setIsEditing(false);
    };

    const handleFieldChange = (field: keyof ITask, value: any) => {
        if (field === 'dueDate') {
            // Если изменяемое поле - дата, то конвертируем строку в объект Date
            setEditedTask({ ...editedTask, [field]: new Date(value) });
        } else {
            setEditedTask({ ...editedTask, [field]: value });
        }
    };

    const saveChanges = () => {
        if (userRole === 'admin' || userRole === 'user1') {
            setTasks(
                tasks.map((t) =>
                    t.id === task.id
                        ? { ...editedTask, dueDate: new Date(editedTask.dueDate) }
                        : t
                )
            );
            stopEditing();
            if (onUpdateData) {
                onUpdateData({
                    ...editedTask,
                    dueDate: new Date(editedTask.dueDate),
                });
            }
        } else {
            alert('У вас нет прав на редактирование!');
        }
    };

    return (
        <li className={`task-item ${task.completed ? 'completed' : ''}`}>
            <input
                type="checkbox"
                checked={task.completed}
                onChange={toggleCompletion}
            />
            {!isEditing ? (
                <span onDoubleClick={startEditing}>
                    Шифр проекта: {task.projectCode} |
                    Подрядная организация: {task.contractorOrganization} |
                    Инженер СК: {task.engineerSK} |
                    Инженер ПТО: {task.engineerPTO}|
                    Статус ИД: {task.statusID} |
                    Дата проверки:{' '}
                    {new Intl.DateTimeFormat('ru-RU').format(new Date(task.dueDate))} |
                </span>
            ) : (
                <>
                    <label htmlFor="project-code">Шифр проекта:</label>
                    <input
                        id="project-code"
                        type="text"
                        value={editedTask.projectCode}
                        onChange={(e) =>
                            handleFieldChange('projectCode', e.target.value)
                        }
                    />

                    <label htmlFor="contractor-organization">
                        Подрядная организация:
                    </label>
                    <input
                        id="contractor-organization"
                        type="text"
                        value={editedTask.contractorOrganization}
                        onChange={(e) =>
                            handleFieldChange('contractorOrganization', e.target.value)
                        }
                    />

                    <label htmlFor="engineer-sk">Инженер СК:</label>
                    <input
                        id="engineer-sk"
                        type="text"
                        value={editedTask.engineerSK}
                        onChange={(e) =>
                            handleFieldChange('engineerSK', e.target.value)
                        }
                    />

                    <label htmlFor="engineer-pto">Инженер ПТО:</label>
                    <input
                        id="engineer-pto"
                        type="text"
                        value={editedTask.engineerPTO}
                        onChange={(e) =>
                            handleFieldChange('engineerPTO', e.target.value)
                        }
                    />

                    <label htmlFor="status-id">Статус ИД:</label>
                    <input
                        id="status-id"
                        type="text"
                        value={editedTask.statusID}
                        onChange={(e) =>
                            handleFieldChange('statusID', e.target.value)
                        }
                    />

                    <label htmlFor="due-date">Дата завершения:</label>
                    <input
                        id="due-date"
                        type="date"
                        value={typeof editedTask.dueDate === 'object'
                            ? editedTask.dueDate.toISOString().slice(0, 10)
                            : ''
                        }
                        onChange={(e) => handleFieldChange('dueDate', e.target.value)}
                    />

                    <button onClick={saveChanges}>Сохранить</button>
                    <button onClick={stopEditing}>Отмена</button>
                </>
            )}
            <button onClick={deleteTask}>Удалить</button>
        </li>
    );
};

export default TaskItem;