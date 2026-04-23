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
                    className="flex items-center gap-3 text-[15px] font-bold text-[var(--text-primary)] cursor-pointer"
                >
                    Filter <span className="hidden md:inline">by status</span>
                    <ChevronDown
                        size={14}
                        className={`text-(--brand-purple) transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    />
                </button>

                {/* The Dropdown Menu Prop */}
                {isOpen && (
                    <div 
                        className="absolute top-10 left-[20px] md:left-[-30px] rounded-lg shadow-xl z-50"
                        style={{ 
                            backgroundColor: 'var(--bg-card)',
                            width: '192px',
                            padding: '24px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '16px'
                        }}
                    >
                        {/* The array of statuses is looped to create 3 checkboxes */}
                        {statuses.map((status) => (
                            <label
                                key={status}
                                className="flex items-center cursor-pointer group"
                                style={{ gap: '16px' }}
                            >
                                <input type="checkbox"
                                    checked={currentFilters.includes(status)}
                                    onChange={() => onFilterChange(status)}
                                    style={{ accentColor: 'var(--brand-purple)' }}
                                    className="w-4 h-4 cursor-pointer flex-shrink-0"
                                />

                                <span 
                                    className="text-[15px] font-bold capitalize transition-colors"
                                    style={{ color: 'var(--text-primary)' }}
                                >
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