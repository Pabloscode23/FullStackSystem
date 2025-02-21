/**
 * StatCard component
 * Renders a single stat card with hover effects and gradients
 * Used in the stats section of the home page
 */
import type { Stat } from '../types';

interface StatCardProps {
    stat: Stat;
}

export function StatCard({ stat }: StatCardProps) {
    return (
        <div className="relative group overflow-hidden">
            <div
                className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                style={{
                    backgroundImage: `linear-gradient(to right, var(--${stat.gradient.split('-')[2]}-500), var(--${stat.gradient.split('-')[4]}-500))`
                }}
            />
            <div className="relative p-8 rounded-xl border border-accent/10 backdrop-blur-sm bg-card/50 transition-all duration-300 group-hover:translate-y-[-2px] group-hover:shadow-lg text-center">
                <stat.icon className="w-8 h-8 mb-4 text-muted-foreground/60 mx-auto" />
                <h4 className={`text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${stat.gradient}`}>
                    {stat.number}
                </h4>
                <p className="mt-2 text-muted-foreground">
                    {stat.label}
                </p>
                <div
                    className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                        backgroundImage: `linear-gradient(to right, var(--${stat.gradient.split('-')[2]}-500), var(--${stat.gradient.split('-')[4]}-500))`
                    }}
                />
            </div>
        </div>
    );
} 