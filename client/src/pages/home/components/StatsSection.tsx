import { StatCard } from '@/features/home/components/StatCard';
import { Stat } from '@/features/home/types';

/**
 * Props for the StatsSection component
 * @property stats - Array of statistics to display in the grid
 */
interface StatsSectionProps {
    stats: Stat[];
}

/**
 * StatsSection Component
 * 
 * Displays a responsive grid of application statistics.
 * Each statistic is rendered as a StatCard component.
 * 
 * Features:
 * - Responsive grid layout (1 column mobile, 3 columns desktop)
 * - Centered container with max width
 * - Consistent spacing between cards
 * - Vertical padding for section separation
 * - Auto-adjusting grid gaps
 * 
 * Layout:
 * - Mobile: Single column
 * - Desktop: Three columns
 * - Maximum width constraint
 * - Horizontal padding for container
 * 
 * @param props - Component properties (see StatsSectionProps)
 */
export function StatsSection({ stats }: StatsSectionProps) {
    return (
        <section className="py-12">
            <div className="container mx-auto px-4">
                {/* Responsive grid layout for stats cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {stats.map((stat, index) => (
                        <StatCard
                            key={index}
                            stat={stat}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
} 