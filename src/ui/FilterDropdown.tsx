import React from "react";
import { InvoiceStatus } from "../types/invoice";
import { ChevronDown } from "lucide-react";

interface FilterDropdownProps {
    // The current active filters (it can be an array, cause the user might filter out both 'draft' and 'pending')
    currentFilters: InvoiceStatus[];
    // A function that gets called whenever a user checks or unchecks a status
    onFilterChange: (status: InvoiceStatus) => void;
}

const FilterDropdown: React.FC<FilterDropdownProps> =
    ({
        currentFilters,
        onFilterChange,
    }) => {
        // useState creates a memory for the component.
        // isOpen is the current state(true or false)
        // setOpen is the functio called to change it

        // The starting value is false(closed)
        const [isOpen, setIsOpen] = React.useState(false);

        const statuses: InvoiceStatus[] = ['draft', 'pending', 'paid'];

        return (
            <div className="relative">
                {/* clickable trigger button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center gap-3 text-[15px] font-bold text-[#0c0e16] dark:text-white cursor-pointer"
                >
                    Filter <span className="hidden md:inline"> by stautus</span>
                    <ChevronDown
                        size={14}
                        className={`text-[#7c5dfa] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    />
                </button>

                {/* The Dropdown Menu Prop */}
                {/* conditional rendering */}
                {isOpen && (
                    <div className="absolute top-10 left-[20px] md:left-[-30px] w-[192px] bg-white dark:bg-[#252945] rounded-lg shadow-xl p-6 flex flex-col gap-4 z-50">

                        {/* The array of statuses is looped to create 3 checkboxes */}
                        {statuses.map((status) => (
                            <label
                                key={status}
                                className="flex items-center gap-3 cursor-pointer group"
                            >
                                <input type="checkbox"
                                    // The box is checked if this specific status is found in the currentFilters
                                    checked={currentFilters.includes(status)}
                                    // When clicked, the function passed in from the parent component is fired
                                    onChange={() => onFilterChange(status)}
                                    className="w-4 h-4 accent-[#7c5dfa] cursor-pointer"
                                />

                                <span className="text-[15px] font-bold text-[#0c0e16] dark:text-white capitalize group-hover:text-[#7c5dfa] transition-colors">
                                    {status}
                                </span>
                            </label>
                        ))}
                    </div>
                )}
            </div>
        )
    }

export default FilterDropdown;