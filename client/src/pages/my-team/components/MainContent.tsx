import type { Team } from '@/types/team';
import { CreateTeamButton } from './CreateTeamButton';
import { LoadingSpinner } from './LoadingSpinner';
import { EmptyState } from './EmptyState';
import { TeamsList } from './TeamsList';

/**
 * Props for the MainContent component
 */
interface MainContentProps {
    isLoading: boolean;
    teams: Team[];
    expandedTeamId: string | null;
    onCreateTeam: () => void;
    onToggleExpand: (teamId: string) => void;
    onDeleteTeam: (teamId: string) => Promise<void>;
    onToggleFavorite: (teamId: string, favorite: boolean) => Promise<void>;
    t: (key: string) => string;
}

/**
 * MainContent Component
 * 
 * Handles the main content area of the teams page including:
 * - Create team button
 * - Loading state
 * - Empty state
 * - Teams list
 */
export function MainContent({
    isLoading,
    teams,
    t,
    onCreateTeam,
    onToggleExpand,
    onDeleteTeam: onDelete, // Rename to match TeamsList props
    onToggleFavorite,
    expandedTeamId
}: MainContentProps) {
    return (
        <div className="container mx-auto px-4 space-y-8">
            <CreateTeamButton
                onClick={onCreateTeam}
                text={t('team.actions.create')}
            />

            {isLoading ? (
                <LoadingSpinner />
            ) : teams.length === 0 ? (
                <EmptyState
                    title={t('pages.myTeam.empty')}
                    description={t('pages.myTeam.createFirst')}
                />
            ) : (
                <TeamsList
                    teams={teams}
                    expandedTeamId={expandedTeamId}
                    onToggleExpand={onToggleExpand}
                    onDelete={onDelete}
                    onToggleFavorite={onToggleFavorite}
                />
            )}
        </div>
    );
} 