import '@testing-library/jest-dom';

declare global {
    namespace jest {
        interface Matchers<R> {
            toBeInTheDocument(): R;
            toHaveClass(className: string): R;
            toBeDisabled(): R;
            // Añade aquí otros matchers que necesites
        }
    }
}

export {}; 