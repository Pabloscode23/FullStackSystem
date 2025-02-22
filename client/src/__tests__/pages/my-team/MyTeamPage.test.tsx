import { render, screen, act } from '@testing-library/react';
import { MyTeamPage } from '@/pages/my-team/MyTeamPage';

// Mock all dependencies
jest.mock('@/context/auth/AuthContext', () => ({
    useAuth: () => ({
        user: { uid: 'test-uid' }
    })
}));

jest.mock('@/services/teamService', () => ({
    teamService: {
        getUserTeams: jest.fn().mockResolvedValue([])
    }
}));

jest.mock('react-router-dom', () => ({
    useNavigate: () => jest.fn()
}));

jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => key
    })
}));

// Mock child components
jest.mock('@/pages/my-team/components/MainContent', () => ({
    MainContent: () => <div>Main Content</div>
}));

jest.mock('@/pages/my-team/components/PageHeader', () => ({
    PageHeader: () => <div>Page Header</div>
}));

describe('MyTeamPage', () => {
    it('renders without crashing', async () => {
        await act(async () => {
            render(<MyTeamPage />);
        });

        expect(screen.getByText('Page Header')).toBeInTheDocument();
        expect(screen.getByText('Main Content')).toBeInTheDocument();
    });
}); 