import React from "react";

// All possible styles the button can take
// type ButtonVariant is a union type locking the variant props to exactly four strings
type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';

interface ButtonProps {
    children: React.ReactNode
    // The ? after most props means they are optional. If no variant is passed it defaults to 'primary'
    // And developers can put optional text inside they do not have to
    // variant = 'primary' the button always has a style even if one is not specified
    icon?: React.ReactNode;
    variant?: ButtonVariant;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({
    children,
    icon,
    variant = 'primary',
    onClick,
    type = 'button',
    disabled = false,
    className = '',
}) => {

    // Base classes applied to every button regardless of variant
    const baseClasses = 'rounded-full font-bold text-[12px] tracking-[-0.25px] transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';

    // Variant-specific classes
    // Record is a built-in TypeScript utility type. Utility types are special TypeScript tools that transform or construct mew types. They are helper functions for types instead of data
    // Record<ButtonVariant, string> takes exactly two generic arguments
    // Record<Keys, Values>
    // *Keys(what the keys of the object must be)
    // *What the type of every value must be
    // by annotating with Record<ButtonVariant, string>, TypeScript now enforces two guarantees simultaneously:
    // 1. Completeness: Every single key from ButtonVariant('primary', 'secondary', 'danger', 'ghost') MUST be present. Deleting anyone of them will throw an error.
    // 2. No Extra Keys: no extra keys can be added if they do not exist in ButtonVariant.
    const getVariantStyle = (v: ButtonVariant): React.CSSProperties => {
        switch (v) {
            case 'primary': return { backgroundColor: 'var(--brand-purple)', color: 'white' };
            case 'secondary': return { backgroundColor: 'var(--bg-btn-secondary)', color: 'var(--primary)' };
            case 'danger': return { backgroundColor: 'var(--brand-red)', color: 'white' };
            case 'ghost': return { backgroundColor: 'var(--bg-sidebar)', color: 'var(--text-secondary)' };
            default: return {};
        }
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseClasses} ${className}`}
            style={{
                ...getVariantStyle(variant),
                height: '48px',
                display: 'flex',
                alignItems: 'center',
                paddingLeft: '8px',
                paddingRight: '24px',
                gap: '16px',
                border: 'none',
            }}
        >
            {/* The icon container (flex-shrink-0 prevents squashing) */}
            {icon && <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>{icon}</div>}
            
            <div style={{ whiteSpace: 'nowrap' }}>
                {children}
            </div>
        </button>
    );
};

export default Button;