import type { Team } from '@/types/team';

export interface TeamCardProps {
    team: Team;
    onDelete: (teamId: string) => Promise<void>;
    onToggleFavorite: (teamId: string, favorite: boolean) => Promise<void>;
} 