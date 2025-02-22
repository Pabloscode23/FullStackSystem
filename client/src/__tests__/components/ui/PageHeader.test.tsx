import { render, screen } from '@testing-library/react';
import { PageHeader } from '@/pages/my-team/components/PageHeader';

describe('PageHeader', () => {
    it('renders title and description', () => {
        const title = 'Test Title';
        const description = 'Test Description';

        render(<PageHeader title={title} description={description} />);

        expect(screen.getByText(title)).toBeInTheDocument();
        expect(screen.getByText(description)).toBeInTheDocument();
    });
}); 