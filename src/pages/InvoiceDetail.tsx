import React from 'react';
//useParams is a hook that allows reading dynamic values from the URL
import { useParams } from 'react-router-dom';

const InvoiceDetail: React.FC = () => {
    //If a user visits localhost:5173/invoice/XM9141, the useParams hook grabs XM9141 from the URL
    //<{ id:string }> is TypeScript generics. It is strictly telling useParams to return an object containing an id which is a string
    //  const { id } is object destructuring. We are pulling the id directly out of the object returned by useParams
    const { id } = useParams<{ id: string }>();

    return (
        <div>
            <h1>Invoice Detail</h1>
            <p>Viewing details for invoice ID: {id}</p>
        </div>
    )
}

export default InvoiceDetail;