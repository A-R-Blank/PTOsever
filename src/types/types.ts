import React from "react";

export interface ITask {
    id: number;
    projectCode: string;
    contractorOrganization: string;
    engineerSK: string;
    engineerPTO: string;
    statusID: string;
    dueDate: Date;
    completed: boolean;
}

export interface IProps {
    task: ITask;
    tasks: ITask[];
    setTasks: (tasks: ITask[]) => void;
    role: string; // Пропс для роли пользователя
    onUpdateData?: (updatedTask: ITask) => void; // Функция для уведомления об изменениях
}

export interface Props {
    tasks: ITask[];
    setTasks: React.Dispatch<React.SetStateAction<ITask[]>>;
    filter: string;
    setFilter: React.Dispatch<React.SetStateAction<string>>;
    role: string; // Получаем роль
}



