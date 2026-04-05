'use client';

import { useUsers } from './hooks/useUsers';
import { SearchInput } from './components/SearchInput';
import { UserList } from './components/UserList';
import { Pagination } from './components/Pagination';

export default function UserDirectoryPage() {
  const { users, meta, search, loading, error, setPage, setSearch, retry } =
    useUsers();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <header className="sticky top-0 z-10 border-b border-gray-200/80 bg-white/80 px-6 py-5 shadow-sm backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              User Directory
            </h1>
            {!loading && !error && (
              <p className="mt-0.5 text-sm text-gray-500">
                {meta.total.toLocaleString()} users total
              </p>
            )}
          </div>
          <SearchInput value={search} onChange={setSearch} />
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-8">
        <UserList
          users={users}
          loading={loading}
          error={error}
          onRetry={retry}
        />

        {!loading && !error && (
          <div className="mt-8">
            <Pagination meta={meta} onPageChange={setPage} />
          </div>
        )}
      </main>
    </div>
  );
}
