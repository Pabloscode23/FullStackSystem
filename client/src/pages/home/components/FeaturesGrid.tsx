import { layoutStyles } from '@/constants/styles';
import { FeatureCard } from '@/features/home/components/FeatureCard';
import { Feature } from '@/features/home/types';

/**
 * Props for the FeaturesGrid component
 * @property features - Array of feature objects to display in the grid
 */
interface FeaturesGridProps {
    features: Feature[];
}

/**
 * FeaturesGrid Component
 * 
 * Displays a responsive grid of feature cards.
 * Uses the application's layout styles for consistent grid presentation.
 * 
 * Features:
 * - Responsive grid layout
 * - Centered container with max width
 * - Consistent spacing between cards
 * - Auto-adjusting columns based on screen size
 * 
 * @param props - Component properties (see FeaturesGridProps)
 */
export function FeaturesGrid({ features }: FeaturesGridProps) {
    return (
        <div className="container mx-auto px-4">
            <div className={`${layoutStyles.grid} gap-8 max-w-7xl mx-auto`}>
                {features.map((feature, index) => (
                    <FeatureCard
                        key={index}
                        feature={feature}
                    />
                ))}
            </div>
        </div>
    );
} 