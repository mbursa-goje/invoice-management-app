import React from "react";

// All possible styles the button can take
// type ButtonVariant is a union type locking the variant props to exactly four strings
type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';

interface ButtonProps {
    children: React.ReactNode
    // The ? after most props means they are optional. If no variant is passed it defaults to 'primary'
    // And developers can put optional text inside they do not have to
    // variant = 'primary' the button always has a style even if one is not specified
    variant?: ButtonVariant;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    onClick,
    type = 'button',
    disabled = false,
    className = '',
}) => {

    // Base classes applied to every button regardless of variant
    const baseClasses = 'px-6 py-3 rounded-full font-bold text-sm transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';

    // Variant-specific classes
    // Record is a built-in TypeScript utility type. Utility types are special TypeScript tools that transform or construct mew types. They are helper functions for types instead of data
    // Record<ButtonVariant, string> takes exactly two generic arguments
    // Record<Keys, Values>
    // *Keys(what the keys of the object must be)
    // *What the type of every value must be
    // by annotating with Record<ButtonVariant, string>, TypeScript now enforces two guarantees simultaneously:
    // 1. Completeness: Every single key from ButtonVariant('primary', 'secondary', 'danger', 'ghost') MUST be present. Deleting anyone of them will throw an error.
    // 2. No Extra Keys: no extra keys can be added if they do not exist in ButtonVariant.
    const variantClasses: Record<ButtonVariant, string> = {
        primary: 'bg-[#7c5dfa] text-white hover:bg-[#9277ff]',
        secondary: 'bg-[#f9fafe] text-[#7e88c3] hover:bg-[#dfe3fa]',
        danger: 'bg-[#ec5757] text-white hover:bg-[#ff9797]',
        ghost: 'bg-[#373b53] text-[#888eb0] hover:bg-[#0c0e16]',
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseClasses} ${variantClasses[variant]} ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;