import { useState, useEffect, createContext, useContext } from 'react';

/**
 * Toast notification interface
 * @property id - Unique identifier for the toast
 * @property message - Content to display in the toast
 * @property type - Visual style of the toast ('success' | 'error' | 'info')
 */
interface Toast {
    id: number;
    message: string;
    type: 'success' | 'error' | 'info';
}

/**
 * Context for managing toast notifications
 * Provides a showToast method to display notifications
 */
const ToastContext = createContext<{
    showToast: (message: string, type: Toast['type']) => void;
}>({
    showToast: () => { },
});

/**
 * Props for the Toaster component
 */
interface ToasterProps {
    toasts: Toast[];
    setToasts: React.Dispatch<React.SetStateAction<Toast[]>>;
}

/**
 * Toaster Component
 * 
 * Displays toast notifications in a fixed position
 * Features:
 * - Auto-dismissal after 2 seconds
 * - Different styles for success/error/info
 * - Slide-up animation
 * - Queue management
 */
export function Toaster({ toasts, setToasts }: ToasterProps) {
    // Auto-dismiss effect
    useEffect(() => {
        if (toasts.length > 0) {
            const timer = setTimeout(() => {
                setToasts((prev) => prev.slice(1));
            }, 1000);

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

// Counter for generating unique toast IDs
let toastId = 0;

/**
 * Toast Provider Component
 * 
 * Provides toast functionality to child components
 * Features:
 * - Global toast state management
 * - Toast creation with unique IDs
 * - Default 'info' type
 */
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

/**
 * Custom hook for using toast notifications
 * 
 * @returns Object containing showToast function
 * 
 * @example
 * ```tsx
 * const { showToast } = useToast();
 * showToast('Operation successful!', 'success');
 * ```
 */
export function useToast() {
    return useContext(ToastContext);
} 