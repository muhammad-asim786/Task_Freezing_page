import { User } from './types';

const TOTAL_USERS = 5000;

function generateMockUsers(): User[] {
  const users: User[] = [];
  for (let i = 1; i <= TOTAL_USERS; i++) {
    users.push({
      id: i.toString(),
      name: `User ${i}`,
      role: i % 3 === 0 ? 'Admin' : 'Member',
      status: i % 2 === 0 ? 'Active' : 'Offline',
      lastLogin: new Date(
        Date.now() - Math.random() * 10_000_000_000,
      ).toISOString(),
    });
  }
  return users;
}

export const mockUsers: User[] = generateMockUsers();
