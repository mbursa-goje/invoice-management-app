import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Invoice } from '../types/invoice';
import StatusBadge from './StatusBadge';
// In the design, clicking anywhere on the card takes the user to the detail page. 
//the <Link> component is used to make the entire card a clickable navigation element 
import { Link } from 'react-router-dom';

interface InvoiceCardProps {
    // The Invoice object in invoice.ts is being made use of 
    invoice: Invoice
}

const InvoiceCard: React.FC<InvoiceCardProps> = ({ invoice }) => {
    // A helper function to format the total amount as currency ($ 1,800.90)
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-GB', {
            style: 'currency',
            currency: 'GBP'
        }).format(amount).replace('£', '£ ');
    };

    // A helper to format the date
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return `Due ${date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}`;
    };

    return (
        <Link
            to={`/invoice/${invoice.id}`}
            className='grid grid-cols-2 md:grid-cols-[repeat(5,1fr)_auto items-center gap-4 p-6 rounded-lg shadow-sm border border-transparent hover:border-[#7c5dfa] transition-all group'
            style={{ backgroundColor: 'var(--bg-card)' }}
        >
            {/* 1. ID */}
            <span className='text-[15px] font-bold text-[var(--text-primary)]'>
                <span className='text-[#7e88c3]'>#</span>{invoice.id}
            </span>

            {/* 2. Client Name(Mobile: top right) */}
            <span className='text-[13px] text-right md:text-left text-[var(--text-secondary)] md:text-[var(--text-primary)]'>
                {invoice.clientName}
            </span>

            {/* 3. Due Date */}
            <span className='text-[13px] text-[var(--text-secondary)]'>
                {formatDate(invoice.paymentDue)}
            </span>

            {/* 4. Total Amount */}
            <span className='text-[15px] font-bold text-[var(--text-primary)]'>
                {formatCurrency(invoice.total)}
            </span>

            {/* 5. Status Badge */}
            <div className='flex justify-end md:justify-start' >
                <StatusBadge variant={invoice.status}>
                    {invoice.status}
                </StatusBadge>
            </div>

            {/* 6. Arrow(Hidden on mobile) */}
            <ChevronRight size={16} className='hidden md:block text-(--brand-purple)' />
        </Link>
    )
}

export default InvoiceCard;