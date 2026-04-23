import React from 'react';

interface InputProps {
    label: string;
    id: string;
    type?: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string; //If this exists show a red border error text
    name?: string;
}

const Input: React.FC<InputProps> = ({
    label,
    id,
    type = 'text',
    //value: The input box doesn't own the text anymore, It is just a mirror reflecting the value prop passed from its parent
    value,
    // onChange: When a single letter is typed, the onChange function fires. It sends the letter to the parent, the parent updates its state, and then React re-renders the component with the new value.
    onChange,
    // The use of value and onChange gives absolute control, the user can be prevented from typing certain characters, or automatically format numbers as they type
    error,
    name
}) => {
    return (
        <div className='flex flex-col gap-2 w-full'>
            <div className='flex justify-between items-center'>
                {/* htmlFor is a prop used when a screen reader focuses on the input, it uses the id to find the label with matching htmlFor and reads that text out loud. It also improves UX--If a user clicks the text "Street Address", the browser will automatically put the cursor inside box */}
                <label htmlFor={id}
                    // ${error ? 'text-[#ec5757]' : 'text-[#7e88c3] dark:text-[#dfe3fa] this is how "State-Based UI" is handled in React
                    // If error is true the border returns red, if false the border uses the neutral theme colors
                    className={`text-[13px] font-medium ${error ? 'text-[#ec5757]' : 'text-[#7e88c3] dark:text-[#dfe3fa]'}`}
                >
                    {label}

                </label>
                {/* An error message will be displayed if an error exists */}
                {/* The code below is known as short-citcuit rendering, with the use of the short-circuit operator (&&) 
                If the first part the statement is fale, it stops immediately. So if there is no error, React ignores the <span> comppletely-it does not even exist in the DOM
                If error is true, it renders the message. This keeps the DOM clean and prevents empty red boxes from appearing when the form is valid*/}
                {error && <span className='text-[10px] font-semibold text-[#ec5757]'>
                    {error}</span>}
            </div>
            <input
                type={type}
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                className={`w-full py-4 px-5 rounded-md border font-bold text-[15px] outline-none transition-all
                        ${error
                        ? 'border-[#ec5757]'
                        : 'border-[#dfe3fa] dark:border-[#252945] focus:border-[#7c5dfa] dark:focus:border-[#7c5dfa]'
                    } bg-white dark:bg-[#1e2139] text-[#0c0e16] dark:text-white`} />
        </div>
    );
};

export default Input; 