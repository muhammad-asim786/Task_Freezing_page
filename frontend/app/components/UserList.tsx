import { User } from '../types/user';
import { UserCard } from './UserCard';

interface UserListProps {
  users: User[];
  loading: boolean;
  error: string | null;
  onRetry: () => void;
}

export function UserList({ users, loading, error, onRetry }: UserListProps) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
        <p className="mt-4 text-sm font-medium text-gray-500">Loading users...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-xl border border-red-200 bg-red-50 py-16">
        <svg className="h-10 w-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
        </svg>
        <p className="text-sm font-medium text-red-600">{error}</p>
        <button
          onClick={onRetry}
          className="rounded-lg bg-red-600 px-5 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-red-700 active:bg-red-800"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <svg className="h-12 w-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128H5.228A2 2 0 013 17.16V17a6.003 6.003 0 017.212-5.874M15 19.128a9.386 9.386 0 00-3-3.07m0 0a5.002 5.002 0 10-7.212 5.874M12 16.058A5.002 5.002 0 004.788 10.184" />
        </svg>
        <p className="mt-3 text-sm font-medium text-gray-500">No users found</p>
        <p className="mt-1 text-xs text-gray-400">Try adjusting your search term</p>
      </div>
    );
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}
