import React from 'react';
import { InvoiceStatus } from '../types/invoice';

type StatusBadgeVariant = 'draft' | 'pending' | 'paid';

interface statusBadgeProps {
    children: React.ReactNode;
}