/**
 * FeatureCard component
 * Renders a single feature card with gradient header and hover effects
 * Used in the features grid section of the home page
 */
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { cardStyles } from '@/constants/styles';
import type { Feature } from '../types';

interface FeatureCardProps {
    feature: Feature;
}

export function FeatureCard({ feature }: FeatureCardProps) {
    const { t } = useTranslation();

    return (
        <Link
            to={feature.href}
            className={`
                group
                ${cardStyles.base}
                backdrop-blur-sm
                bg-accent/10
                border border-accent/20
                hover:border-accent/40
                transition-all
                duration-300
                hover:shadow-lg
                hover:-translate-y-1
                flex flex-col
            `}
        >
            <div className={`${cardStyles.header} bg-gradient-to-r ${feature.gradient}`}>
                <h3 className="text-xl font-semibold text-white flex items-center justify-center gap-2">
                    <feature.icon className="w-6 h-6" />
                    {t(feature.title)}
                </h3>
            </div>
            <div className={`${cardStyles.content} bg-card/50 flex-1 text-center`}>
                <p className="text-muted-foreground">
                    {t(feature.description)}
                </p>
            </div>
        </Link>
    );
} 