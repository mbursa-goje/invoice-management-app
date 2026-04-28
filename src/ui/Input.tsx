import React from 'react';

interface InputProps {
    label: string;
    id: string;
    type?: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    name?: string;
    placeholder: string;
}

const Input: React.FC<InputProps> = ({ label, id, type = 'text', value, onChange, error, name, placeholder }) => {
    return (
        <div className='flex flex-col gap-2 w-full'>
            <div className='flex justify-between items-center'>
                <label
                    htmlFor={id}
                    className={`text-[13px] font-medium ${error ? 'text-[#ec5757]' : 'text-[var(--text-secondary)]'}`}
                >
                    {label}
                </label>
                {error && <span className='text-[10px] font-semibold text-[#ec5757]'>{error}</span>}
            </div>
            <input
                type={type}
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`w-full py-4 px-5 rounded-md border font-bold text-[15px] outline-none transition-all ml-4
                    ${error
                        ? 'border-[#ec5757]'
                        : 'border-[var(--border-color)] focus:border-[var(--brand-purple)]'
                    } bg-[var(--bg-card)] text-[var(--text-primary)]`}
            />
        </div>
    );
};

export default Input;