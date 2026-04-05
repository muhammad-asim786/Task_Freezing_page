import { useState, useEffect, useCallback } from 'react';
import { User, PaginationMeta } from '../types/user';
import { fetchUsers } from '../lib/api';

const DEFAULT_LIMIT = 20;

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [meta, setMeta] = useState<PaginationMeta>({
    page: 1,
    limit: DEFAULT_LIMIT,
    total: 0,
    totalPages: 0,
  });
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchUsers(page, DEFAULT_LIMIT, search);
      setUsers(result.data);
      setMeta(result.meta);
    } catch {
      setError('Failed to load users. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const handleSearchChange = useCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, []);

  return {
    users,
    meta,
    search,
    page,
    loading,
    error,
    setPage,
    setSearch: handleSearchChange,
    retry: loadUsers,
  };
}
