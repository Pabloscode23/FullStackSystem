import { useTranslation } from 'react-i18next';
import { Button } from './Button';

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
}

export function ConfirmationModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    message
}: ConfirmationModalProps) {
    const { t } = useTranslation();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Backdrop with blur effect */}
            <div
                className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Container */}
            <div className="fixed inset-0 flex items-center justify-center p-4">
                {/* Modal Content */}
                <div className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 text-left shadow-xl transition-all">
                    <div className="flex items-start gap-4">
                        {/* Warning Icon */}
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-red-100/80 dark:bg-red-900/20">
                            <svg
                                className="h-5 w-5 text-red-600 dark:text-red-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                                />
                            </svg>
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold leading-6 text-gray-900 dark:text-white">
                                {title}
                            </h3>
                            <div className="mt-2">
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {message}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                        <Button
                            onClick={onClose}
                            variant="outline"
                            className="w-full sm:w-auto"
                        >
                            {t('common.cancel')}
                        </Button>
                        <Button
                            onClick={onConfirm}
                            className="w-full bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 sm:w-auto"
                        >
                            {t('common.confirm')}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
} 