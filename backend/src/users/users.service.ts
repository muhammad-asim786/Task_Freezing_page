import { Injectable } from '@nestjs/common';
import { mockUsers } from './mock-data';
import { User, PaginatedResponse } from './types';

@Injectable()
export class UsersService {
  private readonly users: User[] = mockUsers;

  findAll(
    page: number,
    limit: number,
    search?: string,
  ): PaginatedResponse<User> {
    let filtered = this.users;

    if (search) {
      const term = search.toLowerCase();
      filtered = this.users.filter(
        (user) =>
          user.name.toLowerCase().includes(term) ||
          user.role.toLowerCase().includes(term),
      );
    }

    const total = filtered.length;
    const totalPages = Math.ceil(total / limit);
    const safePage = Math.max(1, Math.min(page, totalPages || 1));
    const start = (safePage - 1) * limit;
    const data = filtered.slice(start, start + limit);

    return {
      data,
      meta: {
        page: safePage,
        limit,
        total,
        totalPages,
      },
    };
  }
}
