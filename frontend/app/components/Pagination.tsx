import { PaginationMeta } from '../types/user';

interface PaginationProps {
  meta: PaginationMeta;
  onPageChange: (page: number) => void;
}

function getPageNumbers(current: number, total: number): (number | '...')[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: (number | '...')[] = [1];

  if (current > 3) {
    pages.push('...');
  }

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (current < total - 2) {
    pages.push('...');
  }

  pages.push(total);

  return pages;
}

export function Pagination({ meta, onPageChange }: PaginationProps) {
  if (meta.totalPages <= 1) return null;

  const pages = getPageNumbers(meta.page, meta.totalPages);

  return (
    <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-5 py-3 shadow-sm">
      <p className="hidden text-sm text-gray-500 sm:block">
        Page <span className="font-semibold text-gray-900">{meta.page}</span> of{' '}
        <span className="font-semibold text-gray-900">{meta.totalPages}</span>
      </p>

      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(meta.page - 1)}
          disabled={meta.page <= 1}
          className="inline-flex items-center gap-1 rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50 active:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="hidden sm:inline">Prev</span>
        </button>

        {pages.map((p, i) =>
          p === '...' ? (
            <span key={`dots-${i}`} className="px-1.5 text-sm text-gray-400">
              ...
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={`min-w-[36px] rounded-lg px-2.5 py-1.5 text-sm font-medium transition-all ${
                p === meta.page
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {p}
            </button>
          ),
        )}

        <button
          onClick={() => onPageChange(meta.page + 1)}
          disabled={meta.page >= meta.totalPages}
          className="inline-flex items-center gap-1 rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50 active:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <span className="hidden sm:inline">Next</span>
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
