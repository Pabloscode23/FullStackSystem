import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/Button';

export function NotFound() {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <h1 className="text-4xl font-bold">{t('pages.notFound.title')}</h1>
            <p className="text-xl mt-2">{t('pages.notFound.message')}</p>
            <Link to="/" className="mt-4">
                <Button>{t('pages.notFound.goHome')}</Button>
            </Link>
        </div>
    );
} 