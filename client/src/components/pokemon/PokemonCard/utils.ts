/**
 * Maps Pokemon types to their corresponding colors
 */
export const getTypeColor = (type: string): string => {
    const colors: Record<string, string> = {
        normal: 'bg-gray-400',
        fire: 'bg-red-500',
        water: 'bg-blue-500',
        electric: 'bg-yellow-400',
        grass: 'bg-green-500',
        ice: 'bg-blue-300',
        fighting: 'bg-red-600',
        poison: 'bg-purple-500',
        ground: 'bg-yellow-600',
        flying: 'bg-indigo-400',
        psychic: 'bg-pink-500',
        bug: 'bg-lime-500',
        rock: 'bg-yellow-800',
        ghost: 'bg-purple-700',
        dragon: 'bg-indigo-600',
        dark: 'bg-gray-800',
        steel: 'bg-gray-500',
        fairy: 'bg-pink-400',
    };
    return colors[type] || 'bg-gray-400';
};

/**
 * Gets the main stats from Pokemon data
 */
export const getPokemonStats = (pokemon: Pokemon) => ({
    hp: pokemon.stats.find(stat => stat.stat.name === 'hp')?.base_stat || 0,
    attack: pokemon.stats.find(stat => stat.stat.name === 'attack')?.base_stat || 0,
    defense: pokemon.stats.find(stat => stat.stat.name === 'defense')?.base_stat || 0,
    speed: pokemon.stats.find(stat => stat.stat.name === 'speed')?.base_stat || 0,
}); 