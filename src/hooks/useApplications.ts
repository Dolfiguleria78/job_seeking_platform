import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { applicationService, ApplicationPayload, Application } from "@/services/applicationService";

export const useSubmitApplication = () => {
  return useMutation({
    mutationFn: (data: ApplicationPayload) => applicationService.submit(data),
  });
};

export const useMyApplications = () => {
  return useQuery({
    queryKey: ["applications", "mine"],
    queryFn: async () => {
      try {
        const res = await applicationService.getMyApplications();
        return res.data;
      } catch {
        return [] as Application[];
      }
    },
  });
};

export const useRecruiterApplications = () => {
  return useQuery({
    queryKey: ["applications", "recruiter"],
    queryFn: async () => {
      try {
        const res = await applicationService.getForRecruiter();
        return res.data;
      } catch {
        return [] as Application[];
      }
    },
  });
};

export const useUpdateApplicationStatus = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: Application["status"] }) =>
      applicationService.updateStatus(id, status),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["applications"] }),
  });
};
