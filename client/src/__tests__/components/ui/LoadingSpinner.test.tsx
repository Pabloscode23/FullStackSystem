import { render } from '@testing-library/react';
import { LoadingSpinner } from '@/pages/my-team/components/LoadingSpinner';

describe('LoadingSpinner', () => {
    it('renders with correct classes', () => {
        const { container } = render(<LoadingSpinner />);

        // Check outer container classes
        const outerDiv = container.firstChild;
        expect(outerDiv).toHaveClass('flex');
        expect(outerDiv).toHaveClass('justify-center');
        expect(outerDiv).toHaveClass('items-center');
        expect(outerDiv).toHaveClass('h-64');
    });
}); 