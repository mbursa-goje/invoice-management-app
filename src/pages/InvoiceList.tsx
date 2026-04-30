import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import React, { useState } from 'react';
import { useInvoices } from '../context/InvoiceContext';
import { Plus } from 'lucide-react';
import Button from '../ui/Button';
import FilterDropdown from '../ui/FilterDropdown';
import InvoiceCard from '../ui/InvoiceCard';
import InvoiceForm from '../component/InvoiceForm';
import emptyImgDark from '../assets/there-is-nothing-here-logo.svg';
import emptyImgLight from '../assets/there-is-nothing-here-light.svg';

const InvoiceList: React.FC = () => {
    const { invoices, filterStatus, setFilterStatus } = useInvoices();
    const [isFormOpen, setIsFormOpen] = useState(false);

    const filteredInvoices = invoices.filter((invoice) => {
        if (filterStatus === 'all') return true;
        return invoice.status === filterStatus;
    });

    const themeContext = useContext(ThemeContext);
    const theme = themeContext?.theme || 'light';

    return (
        <div className="w-full">
            <header className='flex items-center justify-between gap-4'>
                <div className='min-w-0'>
                    <h1 className='text-[28px] min-[375px]:text-[32px] font-bold text-[var(--text-primary)]'>Invoices</h1>
                    <p className='text-[13px] text-[var(--text-secondary)] mt-1'>
                        {invoices.length > 0 ? `There are ${invoices.length} total invoices` : 'No invoices'}
                    </p>
                </div>
                <div className='flex shrink-0 items-center gap-3 sm:gap-5 md:gap-10'>
                    <FilterDropdown
                        currentFilters={filterStatus === 'all' ? [] : [filterStatus]}
                        onFilterChange={(status) => setFilterStatus(status)}
                    />
                    <Button
                        variant='primary'
                        onClick={() => setIsFormOpen(true)}
                        compactOnMobile
                        icon={
                            <div className='bg-white w-8 h-8 rounded-full flex items-center justify-center'>
                                <Plus size={16} style={{ color: 'var(--brand-purple)' }} />
                            </div>
                        }
                    >
                        <span className='sm:hidden'>New</span>
                        <span className='hidden sm:inline'>New Invoice</span>
                    </Button>
                </div>
            </header>

            <div className="flex flex-col gap-4">
                {filteredInvoices.length > 0 ? (
                    filteredInvoices.map((invoice) => (
                        <InvoiceCard key={invoice.id} invoice={invoice} />
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center text-center mt-8 md:mt-12">

                        <img src={theme === 'light' ? emptyImgLight : emptyImgDark} alt="No invoices" className="w-[242px] h-auto" />
                    </div>
                )}
            </div>

            <InvoiceForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
        </div>
    );
}

export default InvoiceList;
