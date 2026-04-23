import React from "react";
import Button from './Button';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    description: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm, title, description }) => {

    if (!isOpen) return null;

    return (
        <div className="fixed inset z-100 flex items-center justify-center p-6">

            {/* Backdrop(The dark see-through layer) */}
            <div className="absolute inset-0 bg-black/50"
                onClick={onClose} />

            {/* The Modal card */}
            <div className="relative bg-white dark-bg-[#1e2139] p-8 md:p-12 rounded-lg max-w-[480px] w-full shadow-2xl">
                <h2 className="text-[24px] font-bold text-[#0c0e16] dark:text-white mb-3"
                >{title}</h2>
                <p className="text-[13px] leading-[22px] text-[#888eb0] dark:text-[#dfe3fa] mb-4">
                    {description}
                </p>
                <div className="flex justify-end gap-2">
                    <Button variant="secondary" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={onConfirm}>
                        Delete
                    </Button>
                </div>
            </div>
        </div>
    )
}