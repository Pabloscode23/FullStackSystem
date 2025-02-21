import { useTeam } from '@/context/TeamContext';
import { useTranslation } from 'react-i18next';

export function FloatingEditTeamPreview() {
    const { t } = useTranslation();
    const { mode, editingTeam, teamState } = useTeam();

    console.log('FloatingEditTeamPreview - mode:', mode);
    console.log('FloatingEditTeamPreview - editingTeam:', editingTeam);
    console.log('FloatingEditTeamPreview - teamState:', teamState);

    if (mode !== 'editing' || !editingTeam) {
        return null;
    }

    const currentPokemon = teamState.filter((p): p is NonNullable<typeof p> => p !== null);

    return (
        <div className="fixed bottom-4 right-4 w-64 bg-card border border-accent/20 rounded-lg shadow-lg p-4">
            <div className="flex justify-center items-center mb-4">
                <h3 className="font-medium text-center">
                    {t('team.editing.name', { name: editingTeam.name })}
                </h3>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-4">
                {currentPokemon.map((pokemon, index) => (
                    <div key={index} className="relative aspect-square bg-accent/5 rounded-lg p-1">
                        <img
                            src={pokemon.sprites.front_default}
                            alt={pokemon.name}
                            className="w-full h-full object-contain"
                        />
                    </div>
                ))}
                {Array(6 - currentPokemon.length).fill(null).map((_, index) => (
                    <div
                        key={`empty-${index}`}
                        className="aspect-square bg-accent/5 rounded-lg border-2 border-dashed border-accent/20"
                    />
                ))}
            </div>
        </div>
    );
} 