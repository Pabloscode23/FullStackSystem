import type { TeamPokemon } from '@/types/team';

interface PokemonCardProps {
    pokemon: TeamPokemon;
}

export function PokemonCard({ pokemon }: PokemonCardProps) {
    return (
        <div className="group relative aspect-square rounded-lg overflow-hidden 
            bg-gradient-to-br from-slate-50 to-white dark:from-slate-800 dark:to-slate-900
            shadow-sm hover:shadow-md transition-all duration-300
            border border-slate-200/50 dark:border-slate-700/50"
        >
            {/* Pokemon ID badge */}
            <div className="absolute top-2 left-2 z-10 px-2 py-1 
                bg-black/30 backdrop-blur-sm 
                rounded-full text-xs text-white font-medium">
                #{pokemon.id}
            </div>

            {/* Pokemon image */}
            <img
                src={pokemon.sprites.other['official-artwork'].front_default}
                alt={pokemon.name}
                className="w-full h-full object-contain transform group-hover:scale-110 
                    transition-transform duration-300 p-2"
            />

            {/* Pokemon info overlay */}
            <div className="absolute inset-0 bg-gradient-to-t 
                from-slate-900/90 via-slate-900/60 to-transparent 
                opacity-0 group-hover:opacity-100 transition-opacity duration-200 
                flex flex-col justify-end p-3">
                <p className="text-white text-sm font-medium capitalize mb-1">
                    {pokemon.name}
                </p>
                <div className="flex flex-wrap gap-1">
                    {pokemon.types?.map((type, i) => (
                        <span key={i} className="text-xs px-2 py-0.5 rounded-full 
                            bg-white/30 text-white backdrop-blur-sm font-medium">
                            {type.type.name}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
} 