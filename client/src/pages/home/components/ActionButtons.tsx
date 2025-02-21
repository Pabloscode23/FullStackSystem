import { User } from 'firebase/auth';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';

/**
 * Props for the ActionButtons component
 * @property user - Current user object from Firebase Auth
 * @property t - Translation function for i18n support
 */
interface ActionButtonsProps {
    user: User | null;
    t: (key: string) => string;
}

/**
 * ActionButtons Component
 * 
 * Renders different call-to-action buttons based on authentication state.
 * 
 * Features:
 * - Responsive layout (stack on mobile, row on desktop)
 * - Different buttons for authenticated and unauthenticated users
 * - Gradient styling for primary actions
 * - Hover effects and transitions
 * 
 * Unauthenticated:
 * - Login button (outline style)
 * - Register button (gradient style)
 * 
 * Authenticated:
 * - Explore button (gradient style)
 */
export function ActionButtons({ user, t }: ActionButtonsProps) {
    return (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto mx-auto">
            {!user ? (
                <>
                    {/* Login Button - Outlined style */}
                    <Link to="/login" className="w-full sm:w-auto min-w-[160px]">
                        <Button
                            size="lg"
                            variant="outline"
                            className="w-full hover:bg-accent/10 transition-all duration-300"
                        >
                            {t('pages.home.cta.login')}
                        </Button>
                    </Link>
                    {/* Register Button - Gradient style */}
                    <Link to="/register" className="w-full sm:w-auto min-w-[160px]">
                        <Button
                            size="lg"
                            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
                        >
                            {t('pages.home.cta.start')}
                        </Button>
                    </Link>
                </>
            ) : (
                /* Explore Button - For authenticated users */
                <Link to="/pokemon" className="w-full sm:w-auto min-w-[200px]">
                    <Button
                        size="lg"
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
                    >
                        {t('pages.home.cta.explore')}
                    </Button>
                </Link>
            )}
        </div>
    );
} 