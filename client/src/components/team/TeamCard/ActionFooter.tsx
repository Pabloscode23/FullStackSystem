import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/Button';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

interface ActionFooterProps {
    onEdit: () => void;
    onDelete: () => void;
}

export function ActionFooter({ onEdit, onDelete }: ActionFooterProps) {
    const { t } = useTranslation();

    return (
        <div className="border-t border-slate-200 dark:border-slate-700/50 
            p-4 bg-slate-50/50 dark:bg-slate-800/50 backdrop-blur-sm">
            <div className="flex justify-end items-center gap-3">
                <Button
                    variant="ghost"
                    size="sm"
                    className="text-blue-700 hover:text-blue-800 hover:bg-blue-50 
                        dark:text-blue-400 dark:hover:bg-blue-900/30
                        font-medium"
                    onClick={onEdit}
                >
                    <PencilIcon className="h-4 w-4 mr-1" />
                    {t('common.edit')}
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50
                        dark:text-red-400 dark:hover:bg-red-900/30
                        font-medium"
                    onClick={onDelete}
                >
                    <TrashIcon className="h-4 w-4 mr-1" />
                    {t('common.delete')}
                </Button>
            </div>
        </div>
    );
} 