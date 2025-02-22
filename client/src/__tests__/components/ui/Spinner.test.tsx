import { render } from '@testing-library/react';
import { Spinner } from '@/components/ui/Spinner';

describe('Spinner', () => {
    it('renders spinner element', () => {
        const { container } = render(<Spinner />);
        const spinnerContainer = container.firstChild;
        expect(spinnerContainer).toHaveClass('flex');
        expect(spinnerContainer).toHaveClass('justify-center');
        expect(spinnerContainer).toHaveClass('items-center');
        expect(spinnerContainer).toHaveClass('h-64');
    });
}); 