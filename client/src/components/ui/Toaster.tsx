import { useState, useEffect, createContext, useContext } from 'react';

interface Toast {
    id: number;
    message: string;
    type: 'success' | 'error' | 'info';
}

// Create Toast Context
const ToastContext = createContext<{
    showToast: (message: string, type: Toast['type']) => void;
}>({
    showToast: () => { },
});

interface ToasterProps {
    toasts: Toast[];
    setToasts: React.Dispatch<React.SetStateAction<Toast[]>>;
}

export function Toaster({ toasts, setToasts }: ToasterProps) {
    useEffect(() => {
        if (toasts.length > 0) {
            const timer = setTimeout(() => {
                setToasts((prev) => prev.slice(1));
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [toasts, setToasts]);

    return (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
            {toasts.map((toast) => (
                <div
                    key={toast.id}
                    className={`
                        px-4 py-2 rounded-lg shadow-lg
                        animate-slide-up
                        ${toast.type === 'success' ? 'bg-green-500' : ''}
                        ${toast.type === 'error' ? 'bg-red-500' : ''}
                        ${toast.type === 'info' ? 'bg-blue-500' : ''}
                        text-white
                    `}
                >
                    {toast.message}
                </div>
            ))}
        </div>
    );
}

// Toast Provider
let toastId = 0;
export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const showToast = (message: string, type: Toast['type'] = 'info') => {
        setToasts((prev) => [...prev, { id: ++toastId, message, type }]);
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <Toaster toasts={toasts} setToasts={setToasts} />
        </ToastContext.Provider>
    );
}

// Hook to use toast
export function useToast() {
    return useContext(ToastContext);
} 