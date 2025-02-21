import { User } from 'firebase/auth';
import { ActionButtons } from './ActionButtons';

/**
 * Props for the HeroSection component
 * @property user - Current Firebase user object, null if not authenticated
 * @property t - Translation function for i18n support
 */
interface HeroSectionProps {
    user: User | null;
    t: (key: string) => string;
}

/**
 * HeroSection Component
 * 
 * Main landing section of the home page featuring:
 * - Gradient title text
 * - Description text
 * - Authentication-based call-to-action buttons
 * 
 * Features:
 * - Responsive typography
 * - Gradient text effects
 * - Centered layout
 * - Muted description text
 * - Dynamic padding and spacing
 * - Overflow handling
 * 
 * @param props - Component properties (see HeroSectionProps)
 */
export function HeroSection({ user, t }: HeroSectionProps) {
    return (
        <section className="relative text-center space-y-6 py-20 overflow-hidden px-4">
            {/* Main title with gradient effect */}
            <h1 className="text-4xl md:text-6xl font-bold">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
                    {t('pages.home.welcome')}
                </span>
            </h1>

            {/* Description text with muted color */}
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t('pages.home.description')}
            </p>

            {/* Call-to-action buttons */}
            <ActionButtons user={user} t={t} />
        </section>
    );
} 