import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';


// Interface is TypeScript's way of defining the type of values each property should have
interface Option {
    label: string;
    value: number | string;
}
interface SelectProps {
    label: string;
    // [] means "array of" so the prop expects a list of multiple choices 
    options: Option[];
    value: number | string;
    onChange: (value: number | string) => void;
}

const Select: React.FC<SelectProps> = ({ label, options, value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);


    // This logic finds the specific option that matches the current 'value'
    //find() loops through the options array, finds, and returns the an option whose value is the same as the current value property
    // It is done because the button can't know a particular number(e.g 30) means a particular message(e.g net 30 days). The human-readable label has to be found ourselves
    const selectedOption = options.find(opt => opt.value === value);

    return (
        <div className='flex flex-col gap-2 w-full relative'>
            <label className='text-[13px] font-medium text-[#7e88c3] dark:text-[#dfe3fa]'
            >
                {label}
            </label>

            {/* Trigger button */}
            <button

                type='button'
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full flex items-center justify-between py-4 px-5 rounded-md border font-bold text-[15px] transition-all bg-white dark:bg-[#1e2139] text-[#0c0e16] dark:text-white
            ${isOpen ? 'border-[#7c5dfa]' : 'border-[#dfe3fa] dark:border-[#252945]'}`}>

                {/* Therefore if the selected option is found, show the label */}
                {/* In js trying to read .label on something that is undefined will crash the application*/}
                {/* If there is no match it won't crash, it will return the text: 'Select option instead' */}
                {/* //important */}
                {selectedOption ? selectedOption.label : 'Select an option'}

                <ChevronDown className={`text-[#7c5dfa] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropown Menu List */}
            {isOpen && (
                // absolute style allows the element to simply sit on elements on the screen and not push them down
                <div className='absolute top-[90px] left-0 w-full bg-white dark:bg-[#252945] rounded-lg shadow-xl z-50 overflow-hidden'>
                    {options.map((opt) => ( //This takes the array of options and transforms each one into a clickable HTML button
                        <button
                            key={opt.value}
                            type='button'
                            onClick={() => {
                                onChange(opt.value)
                                setIsOpen(false); //The menu is closed after picking
                            }}
                            className='w-full text-left py-4 px-6 text-[15px] font-bold text-[#0c0e16] dark:text-white border-b border-[#dfe3fa] dark:border-[#1e2139] last:border-0 hover:text-[#7c5dfa] transition-colors'
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}