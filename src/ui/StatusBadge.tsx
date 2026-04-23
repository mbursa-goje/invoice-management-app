import React from 'react';
import { InvoiceStatus } from '../types/invoice';

type StatusBadgeVariant = 'draft' | 'pending' | 'paid';

interface statusBadgeProps {
    children: React.ReactNode;
    variant?: StatusBadgeVariant;
}

const StatusBadge: React.FC<statusBadgeProps> = ({
    children,
    variant = 'pending'
}) => {
    const baseClasses = 'rounded-md flex items-center justify-center gap-2 w-[104px] py-[13px] font-bold text-[15px] capitalize tracking-[-0.25px]';

    const variantClasses: Record<StatusBadgeVariant, string> = {
        paid: 'text-[#33d69f] bg-[#33d69f]/10',
        pending: 'text-[#ff8f00] bg-[#ff8f00]/10',
        draft: 'text-[var(--text-secondary)] bg-[var(--text-secondary)]/10',
    };

    const dotClasses: Record<StatusBadgeVariant, string> = {
        paid: 'bg-[#33d69f]',
        pending: 'bg-[#ff8f00]',
        draft: 'bg-[var(--text-secondary)]',
    };

    return (
        <div className={`${baseClasses} ${variantClasses[variant]}`}>

            {/* Circular dot indicator */}
            <span className={`w-2 h-2 rounded-full ${dotClasses[variant]}`}></span>

            {children}
        </div>
    )
}

export default StatusBadge;