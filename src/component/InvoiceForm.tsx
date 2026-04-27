import React, { useState, useContext, useEffect } from 'react';
import InvoiceContext from '../context/InvoiceContext';
import { Invoice, InvoiceStatus, Item } from '../types/invoice';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';
import DatePicker from '../ui/DatePicker';
import { Trash2, Plus } from 'lucide-react';

interface InvoiceFormProps {
    isOpen: boolean;
    onClose: () => void;
    invoiceToEdit?: Invoice;
}

const calculatePaymentDue = (createdAt: string, paymentTerms: number) => {
    const date = new Date(createdAt);
    date.setDate(date.getDate() + paymentTerms);
    return date.toISOString().split('T')[0];
};

const InvoiceForm: React.FC<InvoiceFormProps> = ({ isOpen, onClose, invoiceToEdit }) => {
    const context = useContext(InvoiceContext);
    if (!context || !isOpen) return null;
    const { addInvoice, updateInvoice } = context;

    const generateId = () => {
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const numbers = '0123456789';
        let id = '';
        for (let i = 0; i < 2; i++) id += letters.charAt(Math.floor(Math.random() * letters.length));
        for (let i = 0; i < 4; i++) id += numbers.charAt(Math.floor(Math.random() * numbers.length));
        return id;
    };

    const [formData, setFormData] = useState<Partial<Invoice>>({});

    useEffect(() => {
        if (invoiceToEdit) {
            setFormData(invoiceToEdit);
        } else {
            setFormData({
                id: generateId(),
                createdAt: new Date().toISOString().split('T')[0],
                paymentTerms: 30,
                description: '',
                clientName: '',
                clientEmail: '',
                status: 'pending' as InvoiceStatus,
                senderAddress: { street: '', city: '', postCode: '', country: '' },
                clientAddress: { street: '', city: '', postCode: '', country: '' },
                items: [],
                total: 0,
                paymentDue: calculatePaymentDue(new Date().toISOString().split('T')[0], 30)
            });
        }
    }, [invoiceToEdit, isOpen]);

    const handleAddressChange = (type: 'senderAddress' | 'clientAddress', field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [type]: { ...prev[type], [field]: value }
        }));
    };

    const addItem = () => {
        const newItem: Item = { name: '', quantity: 1, price: 0, total: 0 };
        setFormData(prev => ({
            ...prev,
            items: [...(prev.items || []), newItem]
        }));
    };

    const updateItem = (index: number, field: keyof Item, value: string | number) => {
        const updatedItems = [...(formData.items || [])];
        const item = { ...updatedItems[index] };

        if (field === 'quantity') item.quantity = Number(value);
        if (field === 'price') item.price = Number(value);
        if (field === 'name') item.name = String(value);

        item.total = item.quantity * item.price;
        updatedItems[index] = item;

        const newTotal = updatedItems.reduce((acc, curr) => acc + curr.total, 0);
        setFormData(prev => ({ ...prev, items: updatedItems, total: newTotal }));
    };

    const removeItem = (index: number) => {
        const updatedItems = (formData.items || []).filter((_, i) => i !== index);
        const newTotal = updatedItems.reduce((acc, curr) => acc + curr.total, 0);
        setFormData(prev => ({ ...prev, items: updatedItems, total: newTotal }));
    };

    const handleSubmit = (e: React.FormEvent | React.MouseEvent, statusOverride?: InvoiceStatus) => {
        e.preventDefault();
        const finalData = {
            ...formData,
            status: statusOverride || formData.status,
            paymentDue: calculatePaymentDue(formData.createdAt!, formData.paymentTerms!)
        } as Invoice;

        if (invoiceToEdit) {
            updateInvoice(invoiceToEdit.id, finalData);
        } else {
            addInvoice(finalData);
        }
        onClose();
    };

    const paymentOptions = [
        { label: 'Net 1 Day', value: 1 },
        { label: 'Net 7 Days', value: 7 },
        { label: 'Net 14 Days', value: 14 },
        { label: 'Net 30 Days', value: 30 },
    ];

    return (
        <div className="fixed inset-0 z-[2000]">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/50" onClick={onClose} />

            {/*Sliding Form */}
            <aside
                className="fixed top-0 flex flex-col md:left-[103px] w-full max-w-[800px] h-full overflow-y-auto bg-[var(--bg-body)] pt-20 pb-32 px-12 md:px-14 animate-slide-in shadow-2xl"
            >
                <h2 className="text-[24px] font-bold text-[var(--text-primary)] mb-12">
                    {invoiceToEdit ? (
                        <>Edit <span className="text-[var(--text-secondary)]">#</span>{invoiceToEdit.id}</>
                    ) : 'New Invoice'}
                </h2>

                <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-12">
                    {/* Bill From */}
                    <section>
                        <h3 className="text-[12px] font-bold text-[var(--brand-purple)] mb-6 uppercase tracking-wider">Bill From</h3>
                        <Input
                            label="Street Address" id="s-street" placeholder="e.g. 19 Union Terrace" value={formData.senderAddress?.street || ''}
                            onChange={(e) => handleAddressChange('senderAddress', 'street', e.target.value)}
                        />
                        <div className="grid grid-cols-3 gap-6 mt-6">
                            <Input label="City" id="s-city" placeholder="e.g. London" value={formData.senderAddress?.city || ''} onChange={(e) => handleAddressChange('senderAddress', 'city', e.target.value)} />
                            <Input label="Post Code" id="s-post" placeholder="e.g. E1 3EZ" value={formData.senderAddress?.postCode || ''} onChange={(e) => handleAddressChange('senderAddress', 'postCode', e.target.value)} />
                            <Input label="Country" id="s-country" placeholder="e.g. United Kingdom" value={formData.senderAddress?.country || ''} onChange={(e) => handleAddressChange('senderAddress', 'country', e.target.value)} />
                        </div>
                    </section>

                    {/* Bill To */}
                    <section>
                        <h3 className="text-[12px] font-bold text-[var(--brand-purple)] mb-6 uppercase tracking-wider">Bill To</h3>
                        <Input label="Client's Name" id="c-name" placeholder="e.g. Alex Richter" value={formData.clientName || ''} onChange={(e) => setFormData({ ...formData, clientName: e.target.value })} />
                        <div className="mt-6">
                            <Input label="Client's Email" id="c-email" placeholder="e.g. alex@example.com" value={formData.clientEmail || ''} onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })} />
                        </div>
                        <div className="mt-6">
                            <Input label="Street Address" id="c-street" placeholder="e.g. 84 Church Way" value={formData.clientAddress?.street || ''} onChange={(e) => handleAddressChange('clientAddress', 'street', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-3 gap-6 mt-6">
                            <Input label="City" id="c-city" placeholder="e.g. Bradford" value={formData.clientAddress?.city || ''} onChange={(e) => handleAddressChange('clientAddress', 'city', e.target.value)} />
                            <Input label="Post Code" id="c-post" placeholder="e.g. BD1 9PB" value={formData.clientAddress?.postCode || ''} onChange={(e) => handleAddressChange('clientAddress', 'postCode', e.target.value)} />
                            <Input label="Country" id="c-country" placeholder="e.g. United Kingdom" value={formData.clientAddress?.country || ''} onChange={(e) => handleAddressChange('clientAddress', 'country', e.target.value)} />
                        </div>
                    </section>

                    <div className="grid grid-cols-2 gap-6">
                        <DatePicker label="Invoice Date" value={formData.createdAt || ''} onChange={(date) => setFormData({ ...formData, createdAt: date })} />
                        <Select label="Payment Terms" options={paymentOptions} value={formData.paymentTerms || 30} onChange={(val) => setFormData({ ...formData, paymentTerms: Number(val) })} />
                    </div>

                    <Input label="Project Description" id="desc" placeholder="e.g. Graphic Design Service" value={formData.description || ''} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />

                    {/* Item List */}
                    <section>
                        <h3 className="text-[18px] font-bold text-[#777f98] mb-6">Item List</h3>
                        <div className="flex flex-col gap-4">
                            {formData.items?.map((item, index) => (
                                <div key={index} className="grid grid-cols-[3fr_1fr_2fr_1fr_auto] gap-4 items-end">
                                    <Input label="Item Name" id={`n-${index}`} placeholder="e.g. Banner Design" value={item.name} onChange={(e) => updateItem(index, 'name', e.target.value)} />
                                    <Input label="Qty." id={`q-${index}`} type="number" placeholder="1" value={item.quantity} onChange={(e) => updateItem(index, 'quantity', e.target.value)} />
                                    <Input label="Price" id={`p-${index}`} type="number" placeholder="0.00" value={item.price} onChange={(e) => updateItem(index, 'price', e.target.value)} />
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[13px] font-medium text-[var(--text-secondary)]">Total</label>
                                        <span className="h-[58px] flex items-center font-bold text-[var(--text-secondary)]">£{item.total.toFixed(2)}</span>
                                    </div>
                                    <button type="button" onClick={() => removeItem(index)} className="mb-4 text-[#888eb0] hover:text-[var(--brand-red)] transition-colors">
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>
                        <Button variant="secondary" type="button" className="w-full mt-4" onClick={addItem} icon={<Plus size={14} />}>Add New Item</Button>
                    </section>
                </form>

                {/* Form Footer */}
                <div className="flex-end bottom-0 left-0 md:left-[103px] w-full md:w-[720px] bg-[var(--bg-body)] p-6 md:px-14 flex justify-between items-center shadow-[0_-10px_30px_rgba(0,0,0,0.1)] z-[2100] rounded-tr-[20px]">
                    <Button variant="secondary" onClick={onClose}>Discard</Button>
                    <div className="flex gap-4">
                        {!invoiceToEdit && (
                            <Button variant="ghost" onClick={(e) => handleSubmit(e, 'draft' as InvoiceStatus)}>Save as Draft</Button>
                        )}
                        <Button variant="primary" type="button" onClick={(e) => handleSubmit(e)}>
                            {invoiceToEdit ? 'Save Changes' : 'Save & Send'}
                        </Button>
                    </div>
                </div>
            </aside>
        </div>
    );
};

export default InvoiceForm;
