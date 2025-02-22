import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LanguageSwitch } from '@/components/ui/LanguageSwitch';

// Create a mock function we can track
const mockChangeLanguage = jest.fn();

// Mock react-i18next
jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        i18n: {
            language: 'en',
            changeLanguage: mockChangeLanguage,
        }
    })
}));

describe('LanguageSwitch', () => {
    beforeEach(() => {
        // Clear all mocks before each test
        jest.clearAllMocks();
    });

    it('renders with current language', () => {
        render(<LanguageSwitch />);
        expect(screen.getByText('EN')).toBeInTheDocument();
    });

    it('changes language on click', async () => {
        render(<LanguageSwitch />);
        const button = screen.getByRole('button');
        await userEvent.click(button);
        expect(mockChangeLanguage).toHaveBeenCalledWith('es');
    });
}); 