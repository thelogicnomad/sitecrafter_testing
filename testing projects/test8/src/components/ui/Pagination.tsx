import React from 'react';
    import { Button } from './Button';
    import { cn } from '@/lib/utils';
    import { ChevronLeft, ChevronRight } from 'lucide-react';

    interface PaginationProps {
      currentPage: number;
      totalPages: number;
      onPageChange: (page: number) => void;
      className?: string;
    }

    const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange, className }) => {
      const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

      const handlePageClick = (page: number) => {
        if (page >= 1 && page <= totalPages && page !== currentPage) {
          onPageChange(page);
        }
      };

      return (
        <nav className={cn('flex items-center justify-center space-x-2', className)} aria-label="Pagination">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handlePageClick(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {pageNumbers.map((page) => (
            <Button
              key={page}
              variant={page === currentPage ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => handlePageClick(page)}
              aria-current={page === currentPage ? 'page' : undefined}
              className={cn(
                page === currentPage ? 'text-white' : 'text-gray-700 hover:bg-secondary/20',
                'min-w-[32px]'
              )}
            >
              {page}
            </Button>
          ))}

          <Button
            variant="ghost"
            size="sm"
            onClick={() => handlePageClick(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Next page"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </nav>
      );
    };

    export { Pagination };