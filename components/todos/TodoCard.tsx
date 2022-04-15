import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarSolid, faCheck } from "@fortawesome/pro-solid-svg-icons";
import { faStar as faStarLight } from "@fortawesome/pro-light-svg-icons";
import { faCalendarCheck, faHourglass } from "@fortawesome/pro-duotone-svg-icons";

import { Todo, TodoProps } from "../../models/todo-models/Todo";
import { getDurationFormat, getFullDateFormat } from "../../utilities/time-utils/date-format";

interface Props {
    todo: Todo;
    onInvalidate: () => void;
    onMutateTodo: (id: string, todoProps: TodoProps) => void;
}

const TodoCard: React.FC<Props> = (props) => {
    // call Invalidate if steps count have to be updated.
    const { todo, onInvalidate, onMutateTodo } = props;
    const [isImportant, setIsImportant] = useState(todo.isImportant);
    const [isCompleted, setIsCompleted] = useState(todo.isCompleted);

    const showBottomInfo = todo.dateTime || todo.duration;

    const handleImportant = () => {
        setIsImportant((prevState) => {
            const newState = !prevState;
            onMutateTodo(todo.id, { isImportant: newState });
            return newState;
        });
    };

    const handleCompleted = () => {
        setIsCompleted((prevState) => {
            const newState = !prevState;
            onMutateTodo(todo.id, { isCompleted: newState });
            return newState;
        });
    };

    const flexCenter = "flex items-center justify-center";

    return (
        <article className='px-3 py-2 min-h-[71.2px] flex justify-between items-center text-lg transition-all rounded-sm border-2 border-slate-200 shadow-md hover:shadow-lg hover:bg-slate-50 hover:-translate-y-2'>
            <div
                onClick={handleCompleted}
                className={`${flexCenter} w-8 h-8 rounded-full border-2 border-slate-400 cursor-pointer`}
            >
                {isCompleted && (
                    <FontAwesomeIcon icon={faCheck} className='max-w-5 max-h-5 text-green-400' />
                )}
            </div>
            <div className='ml-5 md:ml-8 flex-1 flex flex-col justify-center gap-1 cursor-pointer'>
                <h3>{todo.name}</h3>

                {showBottomInfo && (
                    <p className='flex gap-3 text-sm'>
                        {todo.dateTime && (
                            <span>
                                <FontAwesomeIcon
                                    icon={faCalendarCheck}
                                    className='mr-[3px] max-w-md max-h-md'
                                />
                                &nbsp;
                                {getFullDateFormat(todo.dateTime)}
                            </span>
                        )}
                        <span>
                            {todo.duration && (
                                <span>
                                    <FontAwesomeIcon
                                        icon={faHourglass}
                                        className='mr-[3px] max-w-md max-h-md'
                                    />
                                    {getDurationFormat(todo.duration)}
                                </span>
                            )}
                        </span>
                    </p>
                )}
            </div>
            <div className='flex items-center justify-center text-[2rem] cursor-pointer'>
                <FontAwesomeIcon
                    onClick={handleImportant}
                    icon={isImportant ? faStarSolid : faStarLight}
                    className='max-w-[2rem] max-h-[2rem] text-yellow-400 text-[1.8rem]'
                />
            </div>
        </article>
    );
};

export default TodoCard;
