import React, { useState } from "react";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";

interface DatePickerProps {
    label: string;
    value: string;
    onChange: (date: string) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ label, value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [viewDate, setViewDate] = useState(new Date(value || new Date()));

    const prevMonth = () => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1));
    const nextMonth = () => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1));

    const getDaysInMonth = () => {
        const year = viewDate.getFullYear();
        const month = viewDate.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        return Array.from({ length: daysInMonth }, (_, i) => i + 1);
    };

    const firstDayOfMonth = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1).getDay();

    const formatDate = (dateString: string) => {
        if (!dateString) return 'Select date';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    };

    return (
        <div className="flex flex-col gap-2 w-full relative">
            <label className="text-[13px] font-medium text-[var(--text-secondary)]">{label}</label>

            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between py-4 px-5 rounded-md border border-[var(--border-color)] font-bold text-[15px] bg-[var(--bg-card)] text-[var(--text-primary)] focus:border-[var(--brand-purple)] transition-all"
            >
                {formatDate(value)}
                <Calendar size={16} className="text-[var(--text-secondary)]" />
            </button>

            {isOpen && (
                <div className="absolute top-[90px] left-0 w-full md:w-[240px] rounded-lg shadow-xl p-6 z-50"
                     style={{ backgroundColor: 'var(--bg-card)' }}>
                    <div className="flex items-center justify-between mb-8">
                        <button type="button" onClick={prevMonth} className="text-[var(--brand-purple)]">
                            <ChevronLeft size={16} />
                        </button>
                        <span className="text-[15px] font-bold text-[var(--text-primary)]">
                            {viewDate.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}
                        </span>
                        <button type="button" onClick={nextMonth} className="text-[var(--brand-purple)]">
                            <ChevronRight size={16} />
                        </button>
                    </div>

                    <div className="grid grid-cols-7 gap-y-4">
                        {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                            <div key={`pad-${i}`} />
                        ))}
                        {getDaysInMonth().map((day) => {
                            const isSelected = value &&
                                new Date(value).getDate() === day &&
                                new Date(value).getMonth() === viewDate.getMonth() &&
                                new Date(value).getFullYear() === viewDate.getFullYear();
                            return (
                                <button
                                    key={day}
                                    type="button"
                                    onClick={() => {
                                        const selectedDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
                                        onChange(selectedDate.toISOString().split('T')[0]);
                                        setIsOpen(false);
                                    }}
                                    className={`text-[15px] font-bold text-center transition-colors hover:text-[var(--brand-purple)] ${isSelected ? 'text-[var(--brand-purple)]' : 'text-[var(--text-primary)]'}`}
                                >
                                    {day}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DatePicker;
