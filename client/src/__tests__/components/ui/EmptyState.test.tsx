import { render, screen } from '@testing-library/react';
import { EmptyState } from '@/pages/my-team/components/EmptyState';

describe('EmptyState', () => {
    it('renders title and description', () => {
        const title = 'No items found';
        const description = 'Try adding some items';

        render(<EmptyState title={title} description={description} />);

        expect(screen.getByText(title)).toBeInTheDocument();
        expect(screen.getByText(description)).toBeInTheDocument();
    });
}); 