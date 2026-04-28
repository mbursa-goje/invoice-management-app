import React, { useContext, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import InvoiceContext from '../context/InvoiceContext';
import { ChevronLeft } from 'lucide-react';
import Button from '../ui/Button';
import StatusBadge from '../ui/StatusBadge';
import Modal from '../ui/Modal';
import InvoiceForm from '../component/InvoiceForm';

const InvoiceDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const context = useContext(InvoiceContext);
    const navigate = useNavigate();

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);

    if (!context) return null;
    const { invoices, markAsPaid, deleteInvoice } = context;

    const invoice = invoices.find(inv => inv.id === id);

    if (!invoice) {
        return (
            <div className="p-8 text-center">
                <h2 className="text-[20px] font-bold text-[var(--text-primary)]">Invoice not found</h2>
                <Link to="/" className="text-[var(--primary)] mt-4 inline-block font-bold">Go back to list</Link>
            </div>
        );
    }

    const handleDelete = () => {
        deleteInvoice(invoice.id);
        navigate('/');
    };

    return (
        <div className="max-w-[730px] mx-auto py-8 px-6 md:px-0 mb-20">
            <Link 
                to="/" 
                className="flex items-center gap-6 text-[15px] font-bold text-[var(--text-primary)] hover:text-[var(--text-secondary)] transition-colors mb-8 group"
            >
                <ChevronLeft size={16} className="text-[var(--primary)]" />
                Go back
            </Link>

            <header 
                className="rounded-lg shadow-sm mb-8 flex items-center justify-between"
                style={{ backgroundColor: 'var(--bg-card)', padding: '28px 40px' }}
            >
                <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-start">
                    <span className="text-[13px] text-[var(--text-secondary)] font-medium">Status</span>
                    <StatusBadge variant={invoice.status}>{invoice.status}</StatusBadge>
                </div>

                <div className="hidden md:flex items-center gap-2">
                    <Button variant="secondary" onClick={() => setIsFormOpen(true)}>Edit</Button>
                    <Button variant="danger" onClick={() => setIsDeleteModalOpen(true)}>Delete</Button>
                    {invoice.status !== 'paid' && (
                        <Button variant="primary" onClick={() => markAsPaid(invoice.id)}>
                            Mark as Paid
                        </Button>
                    )}
                </div>
            </header>

            <article 
                className="rounded-lg shadow-sm p-8 md:p-14 mb-8"
                style={{ backgroundColor: 'var(--bg-card)' }}
            >
                <div className="flex flex-col md:flex-row justify-between gap-8 mb-12">
                    <div>
                        <h1 className="text-[16px] font-bold text-[var(--text-primary)] mb-2">
                            <span className="text-[var(--text-secondary)]">#</span>{invoice.id}
                        </h1>
                        <p className="text-[13px] text-[var(--text-secondary)]">{invoice.description}</p>
                    </div>
                    <div className="text-[13px] text-[var(--text-secondary)] md:text-right leading-relaxed">
                        <p>{invoice.senderAddress.street}</p>
                        <p>{invoice.senderAddress.city}</p>
                        <p>{invoice.senderAddress.postCode}</p>
                        <p>{invoice.senderAddress.country}</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-12">
                    <div className="flex flex-col justify-between gap-8">
                        <div>
                            <p className="text-[13px] text-[var(--text-secondary)] mb-3">Invoice Date</p>
                            <p className="text-[16px] font-bold text-[var(--text-primary)]">
                                {new Date(invoice.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </p>
                        </div>
                        <div>
                            <p className="text-[13px] text-[var(--text-secondary)] mb-3">Payment Due</p>
                            <p className="text-[16px] font-bold text-[var(--text-primary)]">
                                {new Date(invoice.paymentDue).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </p>
                        </div>
                    </div>
                    <div>
                        <p className="text-[13px] text-[var(--text-secondary)] mb-3">Bill To</p>
                        <p className="text-[16px] font-bold text-[var(--text-primary)] mb-3">{invoice.clientName}</p>
                        <div className="text-[13px] text-[var(--text-secondary)] leading-relaxed">
                            <p>{invoice.clientAddress.street}</p>
                            <p>{invoice.clientAddress.city}</p>
                            <p>{invoice.clientAddress.postCode}</p>
                            <p>{invoice.clientAddress.country}</p>
                        </div>
                    </div>
                    <div className="col-span-2 md:col-span-1">
                        <p className="text-[13px] text-[var(--text-secondary)] mb-3">Sent to</p>
                        <p className="text-[16px] font-bold text-[var(--text-primary)] truncate">{invoice.clientEmail}</p>
                    </div>
                </div>

                <div className="mt-12 rounded-lg overflow-hidden">
                    <div className="hidden md:grid grid-cols-[3fr_1fr_1fr_1fr] gap-4 p-8 bg-[#f9fafe] dark:bg-[#252945]">
                        <span className="text-[11px] text-[var(--text-secondary)] font-medium">Item Name</span>
                        <span className="text-[11px] text-[var(--text-secondary)] font-medium text-center">QTY.</span>
                        <span className="text-[11px] text-[var(--text-secondary)] font-medium text-right">Price</span>
                        <span className="text-[11px] text-[var(--text-secondary)] font-medium text-right">Total</span>
                    </div>

                    <div className="bg-[#f9fafe] dark:bg-[#252945] px-6 md:px-8 pb-8 flex flex-col gap-8">
                        {invoice.items.map((item, index) => (
                            <div key={index} className="grid grid-cols-2 md:grid-cols-[3fr_1fr_1fr_1fr] items-center gap-4 pt-8 md:pt-0">
                                <div className="flex flex-col gap-2">
                                    <span className="text-[13px] font-bold text-[var(--text-primary)]">{item.name}</span>
                                    <span className="md:hidden text-[13px] font-bold text-[var(--text-secondary)]">
                                        {item.quantity} x £ {item.price.toFixed(2)}
                                    </span>
                                </div>
                                <span className="hidden md:block text-[13px] font-bold text-[var(--text-secondary)] text-center">{item.quantity}</span>
                                <span className="hidden md:block text-[13px] font-bold text-[var(--text-secondary)] text-right">£ {item.price.toFixed(2)}</span>
                                <span className="text-[13px] font-bold text-[var(--text-primary)] text-right">£ {item.total.toFixed(2)}</span>
                            </div>
                        ))}
                    </div>

                    <div className="bg-[#373b53] dark:bg-[#0c0e16] p-6 md:p-8 flex items-center justify-between">
                        <span className="text-[13px] text-white font-medium">
                            {invoice.status === 'paid' ? 'Amount Paid' : 'Amount Due'}
                        </span>
                        <span className="text-[20px] md:text-[24px] font-bold text-white">
                            £ {invoice.total.toFixed(2)}
                        </span>
                    </div>
                </div>
            </article>

            {/* Mobile Actions Bar */}
            <div className="md:hidden flex items-center justify-center gap-2 p-6 bg-white dark:bg-[#1e2139] fixed bottom-0 left-0 w-full shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
                <Button variant="secondary" onClick={() => setIsFormOpen(true)}>Edit</Button>
                <Button variant="danger" onClick={() => setIsDeleteModalOpen(true)}>Delete</Button>
                {invoice.status !== 'paid' && (
                    <Button variant="primary" onClick={() => markAsPaid(invoice.id)}>Mark as Paid</Button>
                )}
            </div>

            <Modal 
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDelete}
                title="Confirm Deletion"
                description={`Are you sure you want to delete invoice #${invoice.id}? This action cannot be undone.`}
            />

            <InvoiceForm 
                isOpen={isFormOpen} 
                onClose={() => setIsFormOpen(false)} 
                invoiceToEdit={invoice}
            />
        </div>
    );
};

export default InvoiceDetail;