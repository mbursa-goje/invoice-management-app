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

    const baseClasses = 'rounded-full font-bold text-[12px] tracking-[-0.25px] transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';

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
            className={`${baseClasses} ${className}`}
            style={{
                ...getVariantStyle(variant),
                height: '48px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                paddingLeft: icon ? '8px' : '24px',
                paddingRight: '24px',
                gap: '16px',
                border: 'none',
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