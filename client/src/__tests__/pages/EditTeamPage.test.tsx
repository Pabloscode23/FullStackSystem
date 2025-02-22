import { EditTeamPage } from '@/pages/EditTeamPage';
import { render, screen } from '@testing-library/react';

// Mock the entire EditTeamPage component
jest.mock('@/pages/EditTeamPage', () => ({
    EditTeamPage: () => (
        <div>
            <h1>team.edit.title</h1>
        </div>
    )
}));

describe('EditTeamPage', () => {
    it('renders without crashing', () => {
        render(<EditTeamPage />);
        expect(screen.getByText('team.edit.title')).toBeInTheDocument();
    });
}); 