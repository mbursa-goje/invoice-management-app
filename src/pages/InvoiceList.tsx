import React, { useState } from 'react';
import { useInvoices } from '../context/InvoiceContext';
import { Plus } from 'lucide-react';
import Button from '../ui/Button';
import FilterDropdown from '../ui/FilterDropdown';
import InvoiceCard from '../ui/InvoiceCard';
import InvoiceForm from '../component/InvoiceForm';

const InvoiceList: React.FC = () => {
    const { invoices, filterStatus, setFilterStatus } = useInvoices();
    const [isFormOpen, setIsFormOpen] = useState(false);

    const filteredInvoices = invoices.filter((invoice) => {
        if (filterStatus === 'all') return true;
        return invoice.status === filterStatus;
    });

    return (
        <main className='max-w-[730px] mx-auto py-8 md:py-14 px-6'>
            <header className='flex justify-between items-center mb-8 md:mb-16'>
                <div>
                    <h1 className='text-[24px] md:text-[32px] font-bold text-[var(--text-primary)]'>
                        Invoices
                    </h1>
                    <p className='text-[13px] text-[var(--text-secondary)]'>
                        {invoices.length > 0 ? `There are ${invoices.length} total invoices` : 'No invoices'}
                    </p>
                </div>
                <div className='flex items-center gap-4 md:gap-10'>
                    <FilterDropdown
                        currentFilters={filterStatus === 'all' ? [] : [filterStatus]}
                        onFilterChange={(status) => setFilterStatus(status)} 
                    />

                    <Button
                        variant='primary'
                        onClick={() => setIsFormOpen(true)}
                        icon={
                            <div className='bg-white w-8 h-8 rounded-full flex items-center justify-center'>
                                <Plus size={16} style={{ color: 'var(--brand-purple)' }} />
                            </div>
                        }
                    >
                        New{' '}<span className='hidden md:inline'>Invoice</span>
                    </Button>
                </div>
            </header>

            {/* Invoices List */}
            <div className="flex flex-col gap-4">
                {filteredInvoices.map((invoice) => (
                    <InvoiceCard key={invoice.id} invoice={invoice} />
                ))}

                {filteredInvoices.length === 0 && (
                    <div className="mt-20 flex flex-col items-center text-center">
                        <img src="/assets/illustration-empty.svg" alt="No invoices" className="mb-10" />
                        <h2 className="text-[20px] font-bold text-[var(--text-primary)] mb-6">There is nothing here</h2>
                        <p className="text-[13px] text-[var(--text-secondary)] max-w-[220px]">
                            Create an invoice by clicking the <span className="font-bold">New Invoice</span> button and get started
                        </p>
                    </div>
                )}
            </div>

            <InvoiceForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
        </main>
    );
}

export default InvoiceList;