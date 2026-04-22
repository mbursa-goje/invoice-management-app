// This is a union type, It means that values taken by the InvoiceStatus object must strictly be of the string values below
export type InvoiceStatus = 'draft' | 'pending' | 'paid';

// An interface is TypeScript's way of defining the exact shape of an obejct,
// export interface InvoiceItem describes the full invoice object
export interface InvoiceItem {
    name: string;
    quantity: number;
    price: number;
    total: number;
}

export interface Invoice {
    id: string;
    createdAt: string;
    paymentDue: string;
    description: string;
    paymentTerms: number;
    clientName: string;
    clientEmail: string;
    status: InvoiceStatus;
    senderAddress: {
        street: string;
        city: string;
        postCode: string;
        country: string;
    };
    clientAddress: {
        street: string;
        city: string;
        postCode: string;
        country: string;
    };
    // The union type is reused, [] means this is an array of InvoiceItem objects, since an invoice can have multiple line items
    items: InvoiceItem[];
    total: number;
}