import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from '@/components/ui/form/Input';

describe('Input', () => {
    it('renders correctly with label', () => {
        render(<Input label="Username" />);
        expect(screen.getByText('Username')).toBeInTheDocument();
    });

    it('shows error message when provided', () => {
        render(<Input error="This field is required" />);
        expect(screen.getByText('This field is required')).toBeInTheDocument();
    });

    it('handles user input', async () => {
        const { getByRole } = render(<Input />);
        const input = getByRole('textbox');
        await userEvent.type(input, 'test');
        expect(input).toHaveValue('test');
    });
}); 