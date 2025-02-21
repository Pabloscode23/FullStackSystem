import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/Button';

/**
 * NotFoundPage component
 * Displays a 404 error page when a route is not found
 * Includes a link to return to the home page
 */
export function NotFoundPage() {
    const { t } = useTranslation();

    return (
        <ErrorContainer>
            <ErrorContent
                title={t('pages.notFound.title')}
                message={t('pages.notFound.message')}
                actionLabel={t('pages.notFound.goHome')}
            />
        </ErrorContainer>
    );
}

/**
 * Container component for centering error content
 */
function ErrorContainer({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
            {children}
        </div>
    );
}

/**
 * Error content component with title, message and action button
 */
interface ErrorContentProps {
    title: string;
    message: string;
    actionLabel: string;
}

function ErrorContent({ title, message, actionLabel }: ErrorContentProps) {
    return (
        <>
            <h1 className="text-4xl font-bold">{title}</h1>
            <p className="text-xl mt-2 text-muted-foreground">{message}</p>
            <Link to="/" className="mt-4">
                <Button variant="default">{actionLabel}</Button>
            </Link>
        </>
    );
} 