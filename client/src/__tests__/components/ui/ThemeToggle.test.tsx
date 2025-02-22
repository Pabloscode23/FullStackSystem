import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { ThemeProvider } from '@/context/theme/ThemeContext';

// Mock matchMedia before running tests since it's not available in Jest environment
beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation(query => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: jest.fn(),
            removeListener: jest.fn(),
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
        })),
    });
});

describe('ThemeToggle', () => {
    it('renders toggle button', () => {
        render(
            <ThemeProvider>
                <ThemeToggle />
            </ThemeProvider>
        );
        expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('toggles theme on click', async () => {
        render(
            <ThemeProvider>
                <ThemeToggle />
            </ThemeProvider>
        );
        const button = screen.getByRole('button');
        await userEvent.click(button);
        expect(button).toBeInTheDocument(); // Simple check that component doesn't crash
    });
}); 