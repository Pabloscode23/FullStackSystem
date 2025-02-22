import { render, screen, fireEvent } from '@testing-library/react';
import { CreateTeamButton } from '@/pages/my-team/components/CreateTeamButton';

describe('CreateTeamButton', () => {
    const mockOnClick = jest.fn();
    const mockText = 'Create New Team';

    it('renders with correct text', () => {
        render(<CreateTeamButton onClick={mockOnClick} text={mockText} />);
        expect(screen.getByText(mockText)).toBeInTheDocument();
    });

    it('calls onClick when clicked', () => {
        render(<CreateTeamButton onClick={mockOnClick} text={mockText} />);
        fireEvent.click(screen.getByText(mockText));
        expect(mockOnClick).toHaveBeenCalled();
    });

    it('renders with plus icon', () => {
        render(<CreateTeamButton onClick={mockOnClick} text={mockText} />);
        expect(screen.getByRole('button')).toHaveClass('bg-gradient-to-r');
    });
}); 