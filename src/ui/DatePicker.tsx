import React, { useState } from "react";
// Calendar icon from lucide-react
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";

interface DatePickerProps {
    label: string;
    // Even though it is a date, we can pass it as a string, making it easier to be saved in the localStorage
    value: string;
    // This function will "broadcast" the newly picked date back to the parent component
    onChange: (date: string) => void;
}

const DatePicker: React.FC<DatePickerProps> = (
    {
        label,
        value,
        onChange,
    }
) => {
    const [isOpen, setIsOpen] = useState(false);

    // viewDate tracks which month the calendar is CURRENTLY displaying
    const [viewDate, setViewDate] = useState(new Date(value || new Date()));

    // Helper to move the calendar to the previous month
    const prevMonth = () => {
        setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1));
    }

    // Helper function to move the calendar to the next month
    const nextMonth = () => {
        setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1));
    }

    // This calculates every day in a current month
    const getDaysInMonth = () => {
        // getFullYear() returns year in four digits
        // getMonth() returns the index of a month in a year(0-January, 11-December)
        const year = viewDate.getFullYear();
        const month = viewDate.getMonth();

        //JavaScript is creating a current date, with the year, the next month(month + 1), and a day 0
        // JavaScript does not have a day 0 so when Day 0 is inputed it returns the day before Day 1 of that month.
        // The day before the first day of the next month is always the last day of the current month
        // .getDate() returns the current the number of the day e.g (28,30,31)
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        //If we know there are 31 days, a list of them is to be created so 31 buttons can be drawn on the screen/
        // Array.from() builds an array from scratch
        // { length: daysInMonth } this builds a list of the lenght of the daysInMonth i.e it builds a list with 31 empty slots
        // (_, i) => i + 1) is the mapping function that fills the 31 empty items in the array
        // _(Underscore represents the "Value" currently in the slot. Since the slot is empty, an underscore is used as a placeholder)
        // i is the Index(the position)
        // i + 1, Slot 0 becomes 1 and so on
        return Array.from({ length: daysInMonth }, (_, i) => i + 1);

    };

    const firstDayOfMonth = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1).getDay();
    // This is a helper function that converts the date in JavaScript object into a aimpler string format
    // It converts '2025-08-23' into '23 Aug 2026'
    const formatDate = (dateString: string) => {
        if (!dateString) return 'Select date';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    return (
        <div className="flex flex-col gap-2 w-full relative">
            <label className="text-[13px] font-medium text-[#7e88c3] dark:text-[#dfe3fa]"
            >
                {label}
            </label>

            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between py-4 px-5 rounded-md border border-[#dfe3fa] dark:border-[#252945] font-bold text-[15px] bg-white dark:bg-[#1e2139] text-[#0c0e16] dark:text-white focus:border-[#7c5dfa] transition-all">
                {formatDate(value)}
                <Calendar size={16} className="text-[#7e88c3]" />
            </button>

            {isOpen && (
                <div className="absolute top-[90px] left-0 w-full md:w-[240px] bg-white dark:bg-[#252945] rounded-lg shadow-xl p-6 z-50">
                    <div className="flex items-center justify-between mb-8">
                        <button type="button" onClick={prevMonth} className="text-[#7c5dfa]">
                            <ChevronLeft size={16} />
                        </button>

                        <span className="text-[15px] font-bold text-[#0c0e16] dark:text-white">
                            {viewDate.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}
                        </span>

                        <button type="button" onClick={nextMonth} className="text-[#7c5dfa]">
                            <ChevronRight size={16} />
                        </button>

                    </div>

                    {/* Grid of days */}
                    <div className="grid grid-cols-7 gap-y-4">
                        {/* Empty slots for padding so the 1st starts on the correct day */}
                        {/* The code below solve the problem of the browser putting the first thing it finds into Column 1(Sunday). If the first of the month is actually a Wednesday, "1" can not just be put in the Sunday slot */}
                        {/* Array.from({ length: 3 }) creates a temporary list with 3 empty slots*/}
                        {/* map((_, i) => (
                            <div key={`pad-${i}`} />
                        ) the three empty slots are turned into invisible div elements */}
                        {/* The result is that the browser puts these 3 empty boxes into the Sunday, Monday, Tuesday slot, forcing the "Day 1" button to start in the Wednesday slot */}
                        {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                            <div key={`pad-${i}`} />
                        ))}

                        {/* Actual clickable days */}
                        {getDaysInMonth().map((day) =>
                        // Selection logic
                        // Logic to check if THIS specific day is the one currently selected
                        {
                            // value && checks if a date exists, if it does not every thing else is false
                            // new Date(value).getDate() === day && checks if the day of the saved invoice is the same as the button being drawn
                            // new Date(value).getMonth() === viewDate.getMonth() && checks if the month is the same
                            // new Date(value).getFullYear() === viewDate.getFullYear(); checks if the year is the same
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
                                        // 'Data chopper' logic
                                        // When a user clicks a day, there is a selecteDate object, but React requires a selcted string like "2026-04-23"
                                        // .toISOString() turns a Date object into a long, standard string(2026-04-23T14:15:37.000Z)
                                        // .split('T') function cuts the the string into two pieces wherever the letter 'T' is found
                                        //~~Piece [0] is 2026-04-23(the date)
                                        // ~~Piece [1] is 14:15:37.000Z(the time)
                                        // [0] returns only piece [0]
                                        // The format is changed back to YYYY-MM-DD for the parent component
                                        onChange(selectedDate.toISOString().split('T')[0]);
                                        setIsOpen(false);
                                    }}
                                    className={`text-[15px] font-bold text-center transition-colors hover:text-[#7c5dfa] ${isSelected ? 'text-[#7c5dfa]' : 'text-[#0c0e16] dark:text-white'}`
                                    }>
                                    {day}
                                </button>
                            )
                        }
                        )}
                    </div>
                </div>
            )}
        </div>
    )
};

