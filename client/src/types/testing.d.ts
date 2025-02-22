import '@testing-library/jest-dom/extend-expect';

declare global {
    namespace jest {
        interface Matchers<R> {
            toBeInTheDocument(): R;
            toBeVisible(): R;
            toHaveTextContent(text: string): R;
            toHaveClass(className: string): R;
            toBeDisabled(): R;
            toHaveAttribute(attr: string, value?: string): R;
        }
    }
}

// Augment para expect()
declare module '@jest/expect' {
    interface AsymmetricMatchers {
        toBeInTheDocument(): void;
        toBeVisible(): void;
        toHaveTextContent(text: string): void;
        toHaveClass(className: string): void;
        toBeDisabled(): void;
        toHaveAttribute(attr: string, value?: string): void;
    }
    interface Matchers<R> {
        toBeInTheDocument(): R;
        toBeVisible(): R;
        toHaveTextContent(text: string): R;
        toHaveClass(className: string): R;
        toBeDisabled(): R;
        toHaveAttribute(attr: string, value?: string): R;
    }
}

export {}; 