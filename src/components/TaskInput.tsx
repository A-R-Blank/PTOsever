import React, { useRef, useState } from 'react';
import { ITask } from '../types/types.ts';

interface IProps {
    tasks: ITask[];
    setTasks: React.Dispatch<React.SetStateAction<ITask[]>>;
    addTask: (task: ITask) => void;
    userRole: string;
}

const userRole = localStorage.getItem('role');

const TaskInput = ({ addTask }: IProps) => {
    const [projectCode, setProjectCode] = useState('');
    const [contractorOrganization, setContractorOrganization] = useState('');
    const [engineerSK, setEngineerSK] = useState('');
    const [engineerPTO, setEngineerPTO] = useState('');
    const [statusID, setStatusID] = useState('');
    const [dueDate, setDueDate] = useState(new Date().toISOString().substr(0, 10));

    // Создаем ссылки на элементы input
    const projectCodeRef = useRef<HTMLInputElement>(null);
    const contractorOrganizationRef = useRef<HTMLInputElement>(null);
    const engineerSKRef = useRef<HTMLInputElement>(null);
    const engineerPTORef = useRef<HTMLInputElement>(null);
    const statusIDRef = useRef<HTMLInputElement>(null);
    const dueDateRef = useRef<HTMLInputElement>(null);

    const submitTask = () => {
        if (
            projectCode.trim() &&
            contractorOrganization.trim() &&
            engineerSK.trim() &&
            engineerPTO.trim() &&
            statusID.trim() &&
            dueDate.trim()
        ) {
            if (userRole === 'admin' || userRole === 'user1') {
                const newTask: ITask = {
                    id: Date.now(),
                    projectCode,
                    contractorOrganization,
                    engineerSK,
                    engineerPTO,
                    statusID,
                    dueDate: new Date(dueDate),
                    completed: false,
                };
                addTask(newTask);
                resetInputs();
            } else {
                alert('У вас нет прав на добавление задачи!');
            }
        }
    };

    const resetInputs = () => {
        setProjectCode('');
        setContractorOrganization('');
        setEngineerSK('');
        setEngineerPTO('');
        setStatusID('');
        setDueDate(new Date().toISOString().substr(0, 10));
    };

    // Функция для переключения фокуса на следующий элемент
    const focusNextInput = (currentRef: React.RefObject<HTMLInputElement>, nextRef: React.RefObject<HTMLInputElement>) => {
        currentRef.current?.blur();
        nextRef.current?.focus();
    };

    return (
        <div className="task-input">
            <div className="abbb">
                <label htmlFor="project-code">Шифр проекта:</label>
                <input className={"input"}
                       ref={projectCodeRef}
                       id="project-code"
                       type="text"
                       value={projectCode}
                       onChange={(e) => setProjectCode(e.target.value)}
                       onKeyDown={(e) => {
                           if (e.key === 'Enter') {
                               focusNextInput(projectCodeRef, contractorOrganizationRef);
                           }
                       }}
                />
            </div>

            <div className="abbb">
                <label htmlFor="contractor-organization">Подрядная организация:</label>
                <input
                    ref={contractorOrganizationRef}
                    id="contractor-organization"
                    type="text"
                    value={contractorOrganization}
                    onChange={(e) => setContractorOrganization(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            focusNextInput(contractorOrganizationRef, engineerSKRef);
                        }
                    }}
                />
            </div>

            <div className="abbb">
                <label htmlFor="engineer-sk">Инженер СК:</label>
                <input
                    ref={engineerSKRef}
                    id="engineer-sk"
                    type="text"
                    value={engineerSK}
                    onChange={(e) => setEngineerSK(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            focusNextInput(engineerSKRef, engineerPTORef);
                        }
                    }}
                />
            </div>

            <div className="abbb">
                <label htmlFor="engineer-pto">Инженер ПТО:</label>
                <input
                    ref={engineerPTORef}
                    id="engineer-pto"
                    type="text"
                    value={engineerPTO}
                    onChange={(e) => setEngineerPTO(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            focusNextInput(engineerPTORef, statusIDRef);
                        }
                    }}
                />
            </div>

            <div className="abbb">
                <label htmlFor="status-id">Статус ИД:</label>
                <input
                    ref={statusIDRef}
                    id="status-id"
                    type="text"
                    value={statusID}
                    onChange={(e) => setStatusID(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            focusNextInput(statusIDRef, dueDateRef);
                        }
                    }}
                />
            </div>

            <div className="abbb">
                <label htmlFor="due-date">Дата завершения:</label>
                <input
                    ref={dueDateRef}
                    id="due-date"
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            submitTask();
                        }
                    }}
                />
            </div>

            <button onClick={submitTask}>Добавить</button>
        </div>
    );
};

export default TaskInput;