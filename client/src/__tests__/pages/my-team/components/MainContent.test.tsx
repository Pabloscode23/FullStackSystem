import { render, screen } from '@testing-library/react';
import { MainContent } from '@/pages/my-team/components/MainContent';
import type { Team } from '@/types/team';

// Mock child components
jest.mock('@/pages/my-team/components/CreateTeamButton', () => ({
    CreateTeamButton: ({ text }: { text: string }) => <button>{text}</button>
}));

jest.mock('@/pages/my-team/components/LoadingSpinner', () => ({
    LoadingSpinner: () => <div>Loading...</div>
}));

jest.mock('@/pages/my-team/components/EmptyState', () => ({
    EmptyState: ({ title }: { title: string }) => <div>{title}</div>
}));

jest.mock('@/pages/my-team/components/TeamsList', () => ({
    TeamsList: () => <div>Teams List</div>
}));

describe('MainContent', () => {
    const defaultProps = {
        isLoading: false,
        teams: [] as Team[],
        expandedTeamId: null,
        onCreateTeam: jest.fn(),
        onToggleExpand: jest.fn(),
        onDeleteTeam: jest.fn(),
        onToggleFavorite: jest.fn(),
        t: (key: string) => key,
    };

    const mockTeam: Team = {
        id: '1',
        name: 'Team 1',
        pokemon: [],
        userId: 'user1',
        createdAt: new Date(),
        favorite: false
    };

    it('shows loading spinner when loading', () => {
        render(<MainContent {...defaultProps} isLoading={true} />);
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('shows empty state when no teams', () => {
        render(<MainContent {...defaultProps} />);
        expect(screen.getByText('pages.myTeam.empty')).toBeInTheDocument();
    });

    it('shows teams list when teams exist', () => {
        render(<MainContent {...defaultProps} teams={[mockTeam]} />);
        expect(screen.getByText('Teams List')).toBeInTheDocument();
    });
}); 