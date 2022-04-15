import { faPlus } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { validateName, Error } from "../../../utilities/form-utils/validation-util";

interface Props {
    onAdd: (text: string) => void;
}

const TodoForm: React.FC<Props> = ({ onAdd }) => {
    const [name, setName] = useState("");
    const [error, setError] = useState<Error>({ hasError: false, message: null });

    const submitHandler = (e: React.FormEvent) => {
        e.preventDefault();

        const errorCheck: Error = validateName(name);
        if (errorCheck.hasError) {
            setError(errorCheck);
            return;
        }
        setError(errorCheck); // Valid (no error)
        onAdd(name);
        setName("");
    };

    const nameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newName = e.target.value;
        const errorCheck: Error = validateName(newName, false); // Do not validate emptyness.
        setError(errorCheck);
        setName(newName);
    };

    return (
        <form onSubmit={submitHandler} className={`mt-5`} id='todo-form'>
            <div
                className={`p-2 flex items-center border-2 border-slate-200 rounded-md shadow-md focus-within:shadow-lg focus-within:border-blue-300 ${
                    error.hasError ? "border-rose-300" : ""
                }`}
            >
                <label
                    htmlFor='todo-input'
                    className='lg:w-10 lg:h-10 flex items-center justify-center backdrop-blur-sm text-slate-400 hover:bg-slate-400 hover:text-slate-50 rounded-full cursor-pointer'
                >
                    <FontAwesomeIcon icon={faPlus} className={`max-w-[2.3rem] text-2xl`} />
                </label>
                <input
                    type='text'
                    placeholder='Add Todo'
                    id='todo-input'
                    name='todo-input'
                    value={name}
                    onChange={nameHandler}
                    className='focus:outline-none bg-inherit ml-3 flex-1'
                />
            </div>
            {error.message && <p className='text-rose-600 mt-2'>{error.message}</p>}
        </form>
    );
};

export default TodoForm;
