import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface Option {
    label: string;
    value: number | string;
}
interface SelectProps {
    label: string;
    options: Option[];
    value: number | string;
    onChange: (value: number | string) => void;
}

const Select: React.FC<SelectProps> = ({ label, options, value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectedOption = options.find(opt => opt.value === value);

    return (
        <div className='flex flex-col gap-2 w-full relative'>
            <label className='text-[13px] font-medium text-[var(--text-secondary)]'>
                {label}
            </label>

            <button
                type='button'
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full flex items-center justify-between py-4 px-5 rounded-md border font-bold text-[15px] transition-all
                ${isOpen ? 'border-[var(--brand-purple)]' : 'border-[var(--border-color)]'}
                bg-[var(--bg-card)] text-[var(--text-primary)]`}
            >
                {selectedOption ? selectedOption.label : 'Select an option'}
                <ChevronDown className={`text-[var(--brand-purple)] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className='absolute top-[90px] left-0 w-full rounded-lg shadow-xl z-50 overflow-hidden'
                     style={{ backgroundColor: 'var(--bg-card)' }}>
                    {options.map((opt) => (
                        <button
                            key={opt.value}
                            type='button'
                            onClick={() => {
                                onChange(opt.value);
                                setIsOpen(false);
                            }}
                            className='w-full text-left py-4 px-6 text-[15px] font-bold text-[var(--text-primary)] border-b border-[var(--border-color)] last:border-0 hover:text-[var(--brand-purple)] transition-colors'
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Select;