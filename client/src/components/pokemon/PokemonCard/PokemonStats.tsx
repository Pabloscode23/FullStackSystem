import { type Pokemon } from './types';

interface PokemonStatsProps {
    pokemon: Pokemon;
}

/**
 * PokemonStats Component
 * Displays Pokemon stats with visual bars
 */
export function PokemonStats({ pokemon }: PokemonStatsProps) {
    const stats = [
        { name: 'HP', value: pokemon.stats.find(stat => stat.stat.name === 'hp')?.base_stat || 0, color: 'text-red-500', bg: 'bg-red-500' },
        { name: 'ATK', value: pokemon.stats.find(stat => stat.stat.name === 'attack')?.base_stat || 0, color: 'text-orange-500', bg: 'bg-orange-500' },
        { name: 'DEF', value: pokemon.stats.find(stat => stat.stat.name === 'defense')?.base_stat || 0, color: 'text-blue-500', bg: 'bg-blue-500' },
        { name: 'SPD', value: pokemon.stats.find(stat => stat.stat.name === 'speed')?.base_stat || 0, color: 'text-green-500', bg: 'bg-green-500' }
    ];

    return (
        <div className="grid grid-cols-2 gap-3">
            {stats.map((stat) => (
                <div key={stat.name} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                        <span className={`font-medium ${stat.color}`}>{stat.name}</span>
                        <span className="font-bold">{stat.value}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-accent/20 overflow-hidden">
                        <div
                            className={`h-full ${stat.bg} transition-all duration-500 ease-out`}
                            style={{ width: `${(stat.value / 255) * 100}%` }}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
} 