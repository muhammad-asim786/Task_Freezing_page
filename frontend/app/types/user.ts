export interface User {
  id: string;
  name: string;
  role: string;
  status: string;
  lastLogin: string;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface UsersResponse {
  data: User[];
  meta: PaginationMeta;
}
