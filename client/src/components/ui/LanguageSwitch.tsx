import { useTranslation } from 'react-i18next';
import { GlobeAltIcon } from '@heroicons/react/24/outline';

export function LanguageSwitch() {
    const { i18n } = useTranslation();

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