import { toast } from '@/components/ui/Toaster';

type ToastType = 'success' | 'error' | 'warning' | 'info';

export const showToast = (message: string, type: ToastType = 'info') => {
    toast({
        title: message,
        variant: type === 'error' ? 'destructive' : 'default',
        className: `${
            type === 'success' ? 'bg-green-500' :
            type === 'warning' ? 'bg-yellow-500' :
            type === 'info' ? 'bg-blue-500' : ''
        } text-white`
    });
}; 