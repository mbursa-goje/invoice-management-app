import React from "react";

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';

interface ButtonProps {
    children: React.ReactNode;
    icon?: React.ReactNode;
    variant?: ButtonVariant;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    className?: string;
    compactOnMobile?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    children,
    icon,
    variant = 'primary',
    onClick,
    type = 'button',
    disabled = false,
    className = '',
    compactOnMobile = false,
}) => {

    const baseClasses = 'flex h-12 items-center justify-center rounded-full border-0 font-bold text-[12px] tracking-[-0.25px] transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';
    const spacingClasses = compactOnMobile
        ? icon
            ? 'gap-2 pl-2 pr-3 sm:gap-4 sm:pr-6'
            : 'px-4 sm:px-6'
        : icon
            ? 'gap-4 pl-2 pr-6'
            : 'px-6';

    const getVariantStyle = (v: ButtonVariant): React.CSSProperties => {
        switch (v) {
            case 'primary': return { backgroundColor: 'var(--brand-purple)', color: 'white' };
            case 'secondary': return { backgroundColor: 'var(--bg-btn-secondary)', color: 'var(--text-secondary)' };
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
            className={`${baseClasses} ${spacingClasses} ${className}`}
            style={{
                ...getVariantStyle(variant),
            }}
        >
            {icon && <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>{icon}</div>}
            <div style={{ whiteSpace: 'nowrap' }}>
                {children}
            </div>
        </button>
    );
};

export default Button;
