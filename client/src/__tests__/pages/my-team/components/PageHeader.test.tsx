import { render, screen } from '@testing-library/react';
import { PageHeader } from '@/pages/my-team/components/PageHeader';

describe('PageHeader', () => {
    const defaultProps = {
        title: 'Test Title',
        description: 'Test Description'
    };

    it('renders title and description', () => {
        render(<PageHeader {...defaultProps} />);
        expect(screen.getByText('Test Title')).toBeInTheDocument();
        expect(screen.getByText('Test Description')).toBeInTheDocument();
    });

    it('renders with correct layout classes', () => {
        const { container } = render(<PageHeader {...defaultProps} />);
        expect(container.firstChild).toHaveClass('relative');
        expect(container.firstChild).toHaveClass('py-8');
    });
}); 