import { useToast as useToastUI } from '@/components/ui/Toaster';

/**
 * Types of toast notifications available in the application
 */
export type ToastType = 'success' | 'error' | 'warning' | 'info';

/**
 * Toast style configuration for each type
 */
const TOAST_STYLES: Record<ToastType, {
    className: string;
    variant: 'default' | 'destructive';
    bgColor: string;
}> = {
    success: {
        className: 'text-white',
        variant: 'default',
        bgColor: 'bg-green-500'
    },
    error: {
        className: 'text-white',
        variant: 'destructive',
        bgColor: 'bg-red-500'
    },
    warning: {
        className: 'text-white',
        variant: 'default',
        bgColor: 'bg-yellow-500'
    },
    info: {
        className: 'text-white',
        variant: 'default',
        bgColor: 'bg-blue-500'
    }
};

/**
 * Maps our toast types to UI component toast types
 */
const toastTypeMap: Record<ToastType, 'success' | 'error' | 'info'> = {
    success: 'success',
    error: 'error',
    warning: 'info', // UI component doesn't have warning, fallback to info
    info: 'info'
};

/**
 * Fallback toast function that uses DOM manipulation
 * Used when the Toast context is not available
 * @param message - Message to display
 * @param type - Type of toast notification
 */
const showFallbackToast = (message: string, type: ToastType = 'info') => {
    const toast = document.createElement('div');
    const styles = TOAST_STYLES[type];
    
    toast.className = `
        fixed bottom-4 right-4 px-4 py-2 rounded-lg shadow-lg
        text-sm animate-fade-in-up
        ${styles.className} ${styles.bgColor}
    `;
    toast.textContent = message;

    document.body.appendChild(toast);

    // Remove after animation
    setTimeout(() => {
        toast.classList.add('animate-fade-out-down');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
};

/**
 * Custom hook for showing toast notifications
 * Falls back to DOM-based toast if context is not available
 * @returns Object containing showToast function
 */
export const useToast = () => {
    const { toast } = useToastUI();

    /**
     * Shows a toast notification with the specified message and type
     * @param message - The message to display
     * @param type - The type of toast (success, error, warning, info)
     */
    const showToast = (message: string, type: ToastType = 'info') => {
        if (!toast) {
            return showFallbackToast(message, type);
        }

        const styles = TOAST_STYLES[type];
        toast({
            title: message,
            variant: styles.variant,
            className: `${styles.className} ${styles.bgColor}`
        });
    };

    return { showToast };
};

/**
 * Standalone toast function for use outside of React components
 * Always uses the fallback implementation
 */
export const showToast = showFallbackToast; 