import type { Team } from '@/types/team';
import { Spinner } from '@/components/ui/Spinner';
import { EmptyState } from './EmptyState';
import { TeamsList } from './TeamsList';

/**
 * Props for the MainContent component
 * @property isLoading - Loading state flag
 * @property teams - Array of favorite teams to display
 * @property onDeleteTeam - Handler for team deletion
 * @property onToggleFavorite - Handler for toggling favorite status
 * @property t - Translation function
 */
interface MainContentProps {
    isLoading: boolean;
    teams: Team[];
    onDeleteTeam: (teamId: string) => Promise<void>;
    onToggleFavorite: (teamId: string, favorite: boolean) => Promise<void>;
    t: (key: string) => string;
}

/**
 * MainContent Component
 * 
 * Handles the main content area of the favorites page including:
 * - Loading state display
 * - Empty state messaging
 * - Teams list display
 * 
 * Features:
 * - Conditional rendering based on loading and data state
 * - Centralized layout
 * - Consistent spacing
 */
export function MainContent({
    isLoading,
    teams,
    onDeleteTeam,
    onToggleFavorite,
    t
}: MainContentProps) {
    return (
        <div className="container mx-auto px-4 space-y-8">
            {isLoading ? (
                <Spinner />
            ) : teams.length === 0 ? (
                <EmptyState
                    title={t('pages.favorites.empty')}
                    description={t('pages.favorites.addSome')}
                />
            ) : (
                <TeamsList
                    teams={teams}
                    onDelete={onDeleteTeam}
                    onToggleFavorite={onToggleFavorite}
                />
            )}
        </div>
    );
}