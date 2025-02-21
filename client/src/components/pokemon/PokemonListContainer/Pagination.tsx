import { Button } from '@/components/ui/Button';
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    ChevronDoubleLeftIcon,
    ChevronDoubleRightIcon
} from '@heroicons/react/24/outline';
import { PaginationButton } from './PaginationButton';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    loading: boolean;
    onPageChange: (page: number) => void;
    pageNumbers: number[];
}

/**
 * Pagination Component
 * Handles page navigation with first/last/prev/next buttons
 * Shows current page context and handles loading states
 */
export function Pagination({
    currentPage,
    totalPages,
    loading,
    onPageChange,
    pageNumbers
}: PaginationProps) {
    return (
        <div className="flex justify-center items-center gap-2 pb-8">
            <PaginationButton
                onClick={() => onPageChange(1)}
                disabled={currentPage === 1 || loading}
                title="First Page"
                icon={<ChevronDoubleLeftIcon className="w-4 h-4" />}
            />

            <PaginationButton
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1 || loading}
                title="Previous Page"
                icon={<ChevronLeftIcon className="w-4 h-4" />}
            />

            {pageNumbers.map(pageNum => (
                <Button
                    key={pageNum}
                    variant={pageNum === currentPage ? "default" : "outline"}
                    size="sm"
                    onClick={() => onPageChange(pageNum)}
                    disabled={loading}
                    className={`w-10 h-10 ${pageNum === currentPage
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500'
                        : ''
                        }`}
                >
                    {pageNum}
                </Button>
            ))}

            <PaginationButton
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages || loading}
                title="Next Page"
                icon={<ChevronRightIcon className="w-4 h-4" />}
            />

            <PaginationButton
                onClick={() => onPageChange(totalPages)}
                disabled={currentPage === totalPages || loading}
                title="Last Page"
                icon={<ChevronDoubleRightIcon className="w-4 h-4" />}
            />
        </div>
    );
} 