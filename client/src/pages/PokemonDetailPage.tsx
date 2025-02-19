import { useParams } from 'react-router-dom';

export function PokemonDetailPage() {
    const { id } = useParams();

    return (
        <div>
            <h1 className="text-3xl font-bold">Pokemon Detail {id}</h1>
        </div>
    );
} 