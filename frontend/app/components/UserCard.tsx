import { User } from '../types/user';

interface UserCardProps {
  user: User;
}

export function UserCard({ user }: UserCardProps) {
  const isActive = user.status === 'Active';

  return (
    <div className="group rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-md">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-sm font-bold text-white shadow-sm">
            {user.name.charAt(0)}
          </div>
          <div>
            <h2 className="text-base font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
              {user.name}
            </h2>
            <p className="text-sm text-gray-500">{user.role}</p>
          </div>
        </div>
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
            isActive
              ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20'
              : 'bg-gray-100 text-gray-600 ring-1 ring-gray-500/20'
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              isActive ? 'bg-emerald-500' : 'bg-gray-400'
            }`}
          />
          {user.status}
        </span>
      </div>
      <div className="flex items-center justify-between border-t border-gray-100 pt-3">
        <p className="text-xs text-gray-400">
          Last seen {new Date(user.lastLogin).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}
        </p>
      </div>
    </div>
  );
}
