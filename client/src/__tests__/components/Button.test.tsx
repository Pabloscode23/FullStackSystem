import { render, screen } from '@testing-library/react';
import { Button } from '@/components/ui/Button';

describe('Button', () => {
    it('renders button with text', () => {
        render(<Button>Click me</Button>);
        expect(screen.getByText('Click me')).toBeInTheDocument();
    });

    it('handles disabled state', () => {
        render(<Button disabled>Disabled</Button>);
        expect(screen.getByText('Disabled')).toBeDisabled();
    });
}); 