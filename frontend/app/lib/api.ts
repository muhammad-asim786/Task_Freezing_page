import { UsersResponse } from '../types/user';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';

export async function fetchUsers(
  page: number,
  limit: number,
  search: string,
): Promise<UsersResponse> {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  if (search.trim()) {
    params.set('search', search.trim());
  }

  const response = await fetch(`${API_BASE_URL}/api/users?${params}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch users: ${response.status}`);
  }

  return response.json();
}
