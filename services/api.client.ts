import type { ApiError, ApiResponse, PaginatedResponse } from "@/types/api";

const BASE_URL = process.env["NEXT_PUBLIC_API_URL"] ?? "";

class ApiClient {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const error: ApiError = await response.json().catch(() => ({
        message: "خطای ناشناخته",
        code: "UNKNOWN_ERROR",
        statusCode: response.status,
      }));
      throw error;
    }

    return response.json() as Promise<T>;
  }

  async get<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
    return this.request<ApiResponse<T>>(endpoint, { ...options, method: "GET" });
  }

  async getPaginated<T>(endpoint: string, options?: RequestInit): Promise<PaginatedResponse<T>> {
    return this.request<PaginatedResponse<T>>(endpoint, {
      ...options,
      method: "GET",
    });
  }

  async post<T>(endpoint: string, body: unknown, options?: RequestInit): Promise<ApiResponse<T>> {
    return this.request<ApiResponse<T>>(endpoint, {
      ...options,
      method: "POST",
      body: JSON.stringify(body),
    });
  }

  async put<T>(endpoint: string, body: unknown, options?: RequestInit): Promise<ApiResponse<T>> {
    return this.request<ApiResponse<T>>(endpoint, {
      ...options,
      method: "PUT",
      body: JSON.stringify(body),
    });
  }

  async delete<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
    return this.request<ApiResponse<T>>(endpoint, {
      ...options,
      method: "DELETE",
    });
  }
}

export const apiClient = new ApiClient();
