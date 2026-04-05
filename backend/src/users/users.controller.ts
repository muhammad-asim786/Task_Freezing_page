import { Controller, Get, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import type { PaginatedResponse, User } from './types';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers(
    @Query('page') rawPage?: string,
    @Query('limit') rawLimit?: string,
    @Query('search') search?: string,
  ): PaginatedResponse<User> {
    const page = Math.max(1, parseInt(rawPage || '1', 10) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(rawLimit || '20', 10) || 20));

    return this.usersService.findAll(page, limit, search);
  }
}
