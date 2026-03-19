import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { jobService, JobFilters, CreateJobPayload } from "@/services/jobService";
import { jobs as fallbackJobs, categories } from "@/data/jobs";

// Uses API when available, falls back to local data
export const useJobs = (filters?: JobFilters) => {
  return useQuery({
    queryKey: ["jobs", filters],
    queryFn: async () => {
      try {
        const res = await jobService.getAll(filters);
        return res.data.data;
      } catch {
        // Fallback to local data for demo
        let data = [...fallbackJobs];
        if (filters?.search) {
          const s = filters.search.toLowerCase();
          data = data.filter(
            (j) => j.title.toLowerCase().includes(s) || j.company.toLowerCase().includes(s)
          );
        }
        if (filters?.category && filters.category !== "All") {
          data = data.filter((j) => j.category === filters.category);
        }
        return data;
      }
    },
  });
};

export const useJob = (id: string) => {
  return useQuery({
    queryKey: ["job", id],
    queryFn: async () => {
      try {
        const res = await jobService.getById(id);
        return res.data;
      } catch {
        return fallbackJobs.find((j) => j.id === id) ?? null;
      }
    },
    enabled: !!id,
  });
};

export const useFeaturedJobs = () => {
  return useQuery({
    queryKey: ["jobs", "featured"],
    queryFn: async () => {
      try {
        const res = await jobService.getFeatured();
        return res.data;
      } catch {
        return fallbackJobs.slice(0, 6);
      }
    },
  });
};

export const useCreateJob = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateJobPayload) => jobService.create(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["jobs"] }),
  });
};

export { categories };
