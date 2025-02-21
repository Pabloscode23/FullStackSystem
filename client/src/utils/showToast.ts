/**
 * Types of toast notifications available in the application.
 * Each type represents a different visual style and purpose:
 * - success: Positive actions completed
 * - error: Failed operations or errors
 * - warning: Important alerts or cautions
 * - info: General information messages
 */
type ToastType = 'success' | 'error' | 'warning' | 'info';

/**
 * Creates and displays a toast notification using vanilla DOM manipulation.
 * This is a standalone implementation that doesn't require React or any UI framework.
 * 
 * @param message - The text content to display in the toast notification
 * @param type - The type of toast that determines its visual style (defaults to 'info')
 * 
 * Features:
 * - Positioned in the bottom-right corner
 * - Automatically disappears after 3 seconds
 * - Includes fade in/out animations
 * - Color-coded based on type
 */
export const showToast = (message: string, type: ToastType = 'info') => {
    // Create a new div element for the toast
    const toast = document.createElement('div');
    
    // Define color styles for each toast type
    // Uses Tailwind CSS classes for consistent styling
    const typeStyles = {
        success: 'bg-green-500',  // Green background for success messages
        error: 'bg-red-500',      // Red background for error messages
        warning: 'bg-yellow-500',  // Yellow background for warnings
        info: 'bg-blue-500'       // Blue background for info messages
    };

    // Apply styles using template literals
    // Uses Tailwind CSS classes for layout and appearance
    toast.className = `
        fixed bottom-4 right-4 px-4 py-2 rounded-lg shadow-lg
        text-white text-sm
        animate-fade-in-up
        ${typeStyles[type]}
    `;
    toast.textContent = message;

    // Insert the toast element into the document body
    document.body.appendChild(toast);

    // Define animation timing constants
    const DISPLAY_DURATION = 3000;  // How long the toast stays visible (3 seconds)
    const ANIMATION_DURATION = 300;  // How long the fade out animation takes (0.3 seconds)

    // Set up the removal sequence
    setTimeout(() => {
        // Start the fade out animation
        toast.classList.add('animate-fade-out-down');
        
        // Remove the element after animation completes
        setTimeout(() => {
            document.body.removeChild(toast);
        }, ANIMATION_DURATION);
    }, DISPLAY_DURATION);
}; 