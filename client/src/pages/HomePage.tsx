import { useTranslation } from 'react-i18next';

export function HomePage() {
    const { t } = useTranslation();

    return (
        <div>
            <h1 className="text-3xl font-bold">{t('pages.home.welcome')}</h1>
        </div>
    );
} 