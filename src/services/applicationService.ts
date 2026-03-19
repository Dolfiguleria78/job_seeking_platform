import api from "./api";

export interface ApplicationPayload {
  jobId: string;
  name: string;
  email: string;
  phone?: string;
  resumeUrl?: string;
  coverLetter?: string;
}

export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  applicantName: string;
  applicantEmail: string;
  phone?: string;
  resumeUrl?: string;
  coverLetter?: string;
  status: "New" | "Reviewed" | "Shortlisted" | "Rejected";
  appliedAt: string;
}

export const applicationService = {
  submit: (data: ApplicationPayload) => api.post<Application>("/applications", data),
  getMyApplications: () => api.get<Application[]>("/applications/me"),
  getForRecruiter: () => api.get<Application[]>("/applications/recruiter"),
  updateStatus: (id: string, status: Application["status"]) =>
    api.patch<Application>(`/applications/${id}`, { status }),
};
