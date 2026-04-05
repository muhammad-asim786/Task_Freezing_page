export interface User {
  id: string;
  name: string;
  role: string;
  status: string;
  lastLogin: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
