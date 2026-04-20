import React from 'react';

//This is TypeScript at work. FC stands  for function component 
//By telling TypeScript that this is a React.FC, we get intelligent auto-completion and type-checking for things like children and props
//This is a functional component that renders a list of invoices
const InvoiceList: React.FC = () => {
    return (
        <div>
            <h1>Invoice List</h1>
            <p>List of invoices will be displayed here.</p>
        </div>
    );
}

export default InvoiceList