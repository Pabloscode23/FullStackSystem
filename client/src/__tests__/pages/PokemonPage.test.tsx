import { render, screen } from '@testing-library/react';
import { PokemonPage } from '@/pages/PokemonPage';
import { useTeam } from '@/context/team/TeamContext';

// Mock all child components to avoid type errors
jest.mock('@/components/pokemon/PokemonListContainer', () => ({
    PokemonListContainer: () => <div>Pokemon List</div>
}));

jest.mock('@/components/team/FloatingTeamPreview', () => ({
    FloatingTeamPreview: () => <div>Team Preview</div>
}));

jest.mock('@/components/team/FloatingEditTeamPreview', () => ({
    FloatingEditTeamPreview: () => <div>Edit Team Preview</div>
}));

// Mock auth to avoid TypeScript errors
jest.mock('@/context/auth/hooks/useAuthState', () => ({
    useAuthState: () => ({ user: null, loading: false })
}));

// Mock dependencies
jest.mock('@/context/team/TeamContext');
jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => key,
    }),
}));

describe('PokemonPage', () => {
    it('renders page title', () => {
        (useTeam as jest.Mock).mockReturnValue({
            mode: 'idle',
            startCreating: jest.fn(),
        });

        render(<PokemonPage />);
        expect(screen.getByText('pages.pokemon.title')).toBeInTheDocument();
    });
}); 