import { useTranslation } from 'react-i18next';
import { GlobeAltIcon } from '@heroicons/react/24/outline';

/**
 * LanguageSwitch Component
 * 
 * A button component that toggles between available languages (English/Spanish).
 * Uses i18next for internationalization support.
 * 
 * Features:
 * - Simple toggle between 'en' and 'es'
 * - Visual feedback on hover
 * - Accessible button with aria-label
 * - Current language display
 * - Globe icon for visual identification
 * 
 * @component
 * @example
 * ```tsx
 * // In a navigation bar or header
 * <nav>
 *   <LanguageSwitch />
 * </nav>
 * ```
 */
export function LanguageSwitch() {
    const { i18n } = useTranslation();

    /**
     * Toggles between available languages
     * Switches from English to Spanish and vice versa
     */
    const toggleLanguage = () => {
        const newLang = i18n.language === 'en' ? 'es' : 'en';
        i18n.changeLanguage(newLang);
    };

    return (
        <button
            onClick={toggleLanguage}
            className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-foreground/80 hover:text-foreground"
            aria-label="Toggle language"
        >
            <GlobeAltIcon className="h-5 w-5" />
            <span>{i18n.language.toUpperCase()}</span>
        </button>
    );
} 