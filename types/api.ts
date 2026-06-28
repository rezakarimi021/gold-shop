export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: Pagination;
  success: boolean;
}

export interface Pagination {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface ApiError {
  message: string;
  code: string;
  statusCode: number;
  details?: Record<string, string[]>;
}

export interface PaginationParams {
  page?: number;
  perPage?: number;
}
