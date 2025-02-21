import { useTranslation } from 'react-i18next';
import { useAuth } from '@/context/auth/AuthContext';
import { features } from '@/features/home/config/features';
import { useStats } from '@/features/home/hooks/useStats';
import { HeroSection } from './components/HeroSection';
import { FeaturesGrid } from './components/FeaturesGrid';
import { StatsSection } from './components/StatsSection';

/**
 * HomePage Component
 * 
 * Landing page of the application featuring:
 * - Hero section with CTA buttons
 * - Feature showcase grid
 * - Statistics display
 * 
 * Adapts its content based on user authentication status
 */
export function HomePage() {
    const { t } = useTranslation();
    const { user } = useAuth();
    const stats = useStats();

    return (
        <div className="space-y-10 pb-12">
            <HeroSection user={user} t={t} />
            <FeaturesGrid features={features} />
            <StatsSection stats={stats} />
        </div>
    );
} 