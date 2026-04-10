import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from './ui/utils';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  // Show max 5 page numbers at a time
  const getVisiblePages = () => {
    if (totalPages <= 5) return pages;
    
    if (currentPage <= 3) {
      return [...pages.slice(0, 5)];
    }
    
    if (currentPage >= totalPages - 2) {
      return [...pages.slice(totalPages - 5)];
    }
    
    return pages.slice(currentPage - 3, currentPage + 2);
  };

  const visiblePages = getVisiblePages();

  return (
    <div className={cn('flex items-center justify-center gap-2', className)}>
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={cn(
          'flex items-center gap-1 px-4 py-2 rounded-lg border transition-all duration-200',
          currentPage === 1
            ? 'border-[var(--border)] text-[var(--gray-medium)] cursor-not-allowed opacity-50'
            : 'border-[var(--border)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white hover:border-[var(--primary)]'
        )}
      >
        <ChevronLeft className="w-4 h-4" />
        <span className="hidden sm:inline">Previous</span>
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-2">
        {currentPage > 3 && totalPages > 5 && (
          <>
            <button
              onClick={() => onPageChange(1)}
              className="w-10 h-10 rounded-lg border border-[var(--border)] text-[var(--gray-dark)] hover:bg-[var(--primary)] hover:text-white hover:border-[var(--primary)] transition-all duration-200"
            >
              1
            </button>
            {currentPage > 4 && <span className="text-[var(--gray-medium)]">...</span>}
          </>
        )}

        {visiblePages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={cn(
              'w-10 h-10 rounded-lg border transition-all duration-200',
              page === currentPage
                ? 'bg-[var(--primary)] text-white border-[var(--primary)]'
                : 'border-[var(--border)] text-[var(--gray-dark)] hover:bg-[var(--primary)] hover:text-white hover:border-[var(--primary)]'
            )}
          >
            {page}
          </button>
        ))}

        {currentPage < totalPages - 2 && totalPages > 5 && (
          <>
            {currentPage < totalPages - 3 && <span className="text-[var(--gray-medium)]">...</span>}
            <button
              onClick={() => onPageChange(totalPages)}
              className="w-10 h-10 rounded-lg border border-[var(--border)] text-[var(--gray-dark)] hover:bg-[var(--primary)] hover:text-white hover:border-[var(--primary)] transition-all duration-200"
            >
              {totalPages}
            </button>
          </>
        )}
      </div>

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={cn(
          'flex items-center gap-1 px-4 py-2 rounded-lg border transition-all duration-200',
          currentPage === totalPages
            ? 'border-[var(--border)] text-[var(--gray-medium)] cursor-not-allowed opacity-50'
            : 'border-[var(--border)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white hover:border-[var(--primary)]'
        )}
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
