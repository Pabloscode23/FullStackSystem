type ToastType = 'success' | 'error' | 'warning' | 'info';

export const showToast = (message: string, type: ToastType = 'info') => {
    // Crear elemento toast
    const toast = document.createElement('div');
    toast.className = `
        fixed bottom-4 right-4 px-4 py-2 rounded-lg shadow-lg
        text-white text-sm
        animate-fade-in-up
        ${type === 'success' ? 'bg-green-500' : ''}
        ${type === 'error' ? 'bg-red-500' : ''}
        ${type === 'warning' ? 'bg-yellow-500' : ''}
        ${type === 'info' ? 'bg-blue-500' : ''}
    `;
    toast.textContent = message;

    // Agregar al DOM
    document.body.appendChild(toast);

    // Remover después de 3 segundos
    setTimeout(() => {
        toast.classList.add('animate-fade-out-down');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}; 