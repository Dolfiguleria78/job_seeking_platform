import api from "./api";

export interface LoginPayload {
  email: string;
  password: string;
  role: "seeker" | "recruiter";
}

export interface SignupPayload {
  name: string;
  email: string;
  password: string;
  role: "seeker" | "recruiter";
}

export interface AuthResponse {
  user: { id: string; name: string; email: string; role: "seeker" | "recruiter"; avatar?: string };
  token: string;
}

export const authService = {
  login: (data: LoginPayload) => api.post<AuthResponse>("/auth/login", data),
  signup: (data: SignupPayload) => api.post<AuthResponse>("/auth/signup", data),
  logout: () => api.post("/auth/logout"),
  getProfile: () => api.get<AuthResponse["user"]>("/auth/me"),
};
