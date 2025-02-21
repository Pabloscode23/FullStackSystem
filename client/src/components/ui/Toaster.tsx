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
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [toasts, setToasts]);

    return (
        <div className="fixed top-4 right-4 z-50 flex flex-col gap-1">
            {toasts.map((toast) => (
                <div
                    key={toast.id}
                    className={`
                        px-3 py-1.5 rounded-md shadow-md text-sm
                        animate-slide-up
                        ${toast.type === 'success' ? 'bg-green-500/90' : ''}
                        ${toast.type === 'error' ? 'bg-red-500/90' : ''}
                        ${toast.type === 'info' ? 'bg-blue-500/90' : ''}
                        text-white
                        flex items-center gap-2
                        max-w-[200px]
                    `}
                >
                    <div className={`
                        w-1.5 h-1.5 rounded-full flex-shrink-0
                        ${toast.type === 'success' ? 'bg-green-200' : ''}
                        ${toast.type === 'error' ? 'bg-red-200' : ''}
                        ${toast.type === 'info' ? 'bg-blue-200' : ''}
                    `} />
                    <span className="truncate">{toast.message}</span>
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