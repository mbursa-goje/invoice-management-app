import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Invoice, InvoiceStatus } from '../types/invoice';


// This defines the shape of everything our Invoice context(radio tower) will broadcast it
interface InvoiceContextType {
    // invoices is the full array of invoices in the app. Any component that needs to display invoices will grab it
    invoices: Invoice[];
    // These are the four Create, Read, Update and Delete functions
    // They perform an action and do not return any value
    addInvoice: (invoice: Invoice) => void;
    updateInvoice: (id: string, updatedInvoice: Invoice) => void;
    deleteInvoice: (id: string) => void;
    markAsPaid: (id: string) => void;

    // The lines of code below handles filtering. filterStatus holds the currently selected filter('all', 'draft', 'pending' or 'paid'), 'all' is added to the union type
    filterStatus: InvoiceStatus | 'all';
    setFilterStatus: (status: InvoiceStatus | 'all') => void;
}

// This creates the Invoice context and starts as undefined before the Provider mounts
const InvoiceContext = createContext<InvoiceContextType | undefined>(undefined);

// The Provider component wraps the app and broacasts all invoice data downwards
export const InvoiceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    // Loads invoices from localStorage on first mount, another use of lazy initialization
    // () => {
    //     const saved = localStorage.getItem('invoices');
    //     return saved ? JSON.parse(saved) : [];
    // }); this is lazy initailization,instead of a firect value, an arrow function is passed.
    // React only calls this function once when the component first mounts.
    // It is critcal because localStorage is a "slow" browser operation, it is not to be done on every single update
    // const saved = localStorage.getItem('invoices'); reaches to the browseer's mini-database and tries to retrieve the text string stored under the  key 'invoices'. If nothing has ever been stored there, it returns null
    // saved ? JSON.parse(saved) : []; is a ternary operator using a safety check, 
    // localStorage can only store text strings. The invoices are complex JavaScript objects that need to be converted to strings using JSON.stringify()
    // JSON.parse(saved) reverses that process, converting the saved string back into a real JavaScript array of objects
    // []; if saved is null(first-time visitor), we skip the parse entirely and just start with an empty array.
    const [invoices, setInvoices] = useState<Invoice[]>(() => {
        const saved = localStorage.getItem('invoices');
        return saved ? JSON.parse(saved) : [];
    });

    // The filter state does not need lazy initialization because it is not reading anything from localStorage. 
    // It starts as the plain string 'all' every time the app loads (since the filter is not persisted across reloads)
    const [filterStatus, setFilterStatus] = useState<InvoiceStatus | 'all'>('all');


    // ===========CRUD FUNCTIONS================

    // 1. ADD: Takes a complete invoice object and adds it to the array
    const addInvoice = (invoice: Invoice) => {
        // [...invoices, invoice] you must never directly mutate(modify) React state. Writing invoice.push(invoice) is illegal in React!
        // Instead, ...invoices creates a brand new array by "spreading" copying all existing invoices into it, and then invoice is appended as the final new item.
        // setInvoices() is then called with the fresh array
        const updated = [...invoices, invoice];
        // this tells React to re-render component components that depend on invoices
        setInvoices(updated);
        localStorage.setItem('invoices', JSON.stringify(updated));
    };

    // 2. UPDATE: Finds the invoice by id and replaces it with the new data
    const updateInvoice = (id: string, updatedInvoice: Invoice) => {
        const updated = invoices.map((inv) =>
            // the map() function loops through the entire array and returns updatedInvoice if the inv.id matches the id or does not change anything, if it remains the same.
            inv.id === id ? updatedInvoice : inv
        );

        setInvoices(updated);
        localStorage.setItem('invoices', JSON.stringify(updated));
    }

    // 3. DELETE: Filters out the invoice with the matching id
    const deleteInvoice = (id: string) => {
        // filter() returns a new array but only keeps items if the callback(inv.id !== id) returns true for every invoice that does not match, it means every one survives except the one to be deleted
        const updated = invoices.filter((inv) => inv.id !== id);
        setInvoices(updated);
        localStorage.setItem('invoices', JSON.stringify(updated));
    };

    // 4. MARK AS PAID: Fins the invoice by id and sets its status to 'paid'
    const markAsPaid = (id: string) => {
        const updated = invoices.map((inv) =>
            // { ...inv } uses the spread operator on an object. It copies every single property of the invoice and (id, clientName, total, items, etc) into a brand new object.
            // status: 'paid' appears after the spread, which overwrites only the status property on the new object leaving everything else untouched
            // as InvoiceStatus is TypeScript telling the compiler that 'paid' is now a valid InvoiceStatus
            inv.id === id ? { ...inv, status: 'paid' as InvoiceStatus } : inv
        );
        setInvoices(updated);
        localStorage.setItem('invoices', JSON.stringify(updated))
    }

    return (
        // Every context object that React creates automatically comes with two built-in components attached to it:
        // .Provider us the Broadcaster. It "provides" the data downward
        // .Consumer- which is the old way of receiving data(hooks) are used instead now
        // <InvoiceContext.Provider> is React haning us a component specifically designed to wrap other components and feed them data
        <InvoiceContext.Provider value={
            {
                invoices,
                addInvoice,
                updateInvoice,
                deleteInvoice,
                markAsPaid,
                filterStatus,
                setFilterStatus,
            }
        }
        >
            {children}
        </InvoiceContext.Provider>
    );
};

// Custom hook - any component can call useInvoices() instead of useContext(InvoiceContext)
export const useInvoices = () => {
    // useContext() is used to used the context and InvoiceContext is passed into it, and it returns whatever is in the value prop of the nearest
    const context = useContext(InvoiceContext);
    if (!context) {
        // This sends a message to the console if the children are not wrapped in <InvoiceProvider>
        throw new Error('useInvoices must be within an InvoiceProvider')
    }
    return context;
}