import { useDrop } from 'react-dnd';
import { TrashIcon } from '@heroicons/react/24/outline';

export function RemoveDropZone() {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'TEAM_POKEMON',
        drop: () => ({ type: 'REMOVE' }),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }));

    return (
        <div
            ref={drop}
            className={`
                mt-4 p-4 rounded-lg border-2 border-dashed
                flex items-center justify-center
                transition-colors duration-200
                ${isOver
                    ? 'border-red-500 bg-red-500/10'
                    : 'border-accent/20 hover:border-accent/40'
                }
            `}
        >
            <TrashIcon className={`
                w-6 h-6 
                ${isOver ? 'text-red-500' : 'text-muted-foreground'}
            `} />
            <span className="ml-2 text-sm">
                Arrastra aquí para remover
            </span>
        </div>
    );
} 