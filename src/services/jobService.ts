import api from "./api";
import { Job } from "@/data/jobs";

export interface JobFilters {
  search?: string;
  category?: string;
  type?: string;
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  totalPages: number;
}

export interface CreateJobPayload {
  title: string;
  company: string;
  location: string;
  type: Job["type"];
  salary: string;
  description: string;
  requirements: string[];
  category: string;
}

export const jobService = {
  getAll: (filters?: JobFilters) => api.get<PaginatedResponse<Job>>("/jobs", { params: filters }),
  getById: (id: string) => api.get<Job>(`/jobs/${id}`),
  create: (data: CreateJobPayload) => api.post<Job>("/jobs", data),
  update: (id: string, data: Partial<CreateJobPayload>) => api.put<Job>(`/jobs/${id}`, data),
  delete: (id: string) => api.delete(`/jobs/${id}`),
  getFeatured: () => api.get<Job[]>("/jobs/featured"),
};
