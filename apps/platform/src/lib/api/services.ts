import { api } from "./client";
import type {
  Ambulance,
  AmbulanceStatus,
  AuthResponse,
  ClaimAccountRequest,
  GuestEmergencyRequest,
  GuestEmergencyResponse,
  Emergency,
  EmergencyCreateRequest,
  EmergencyStatus,
  Hospital,
  LoginRequest,
  Page,
  RegisterRequest,
  Role,
  Tracking,
  User,
} from "@/types/api";

type PageQuery = {
  page?: number;
  size?: number;
  sort?: string;
};

export const authApi = {
  login: (body: LoginRequest) => api.post<AuthResponse>("/auth/login", body),
  register: (body: RegisterRequest) => api.post<AuthResponse>("/auth/register", body),
  guestEmergency: (body: GuestEmergencyRequest) => api.post<GuestEmergencyResponse>("/auth/guest-emergency", body),
};

export const usersApi = {
  me: () => api.get<User>("/users/me"),
  claim: (body: ClaimAccountRequest) => api.post<AuthResponse>("/users/me/claim", body),
  list: (q: PageQuery & { role?: Role } = {}) => api.get<Page<User>>("/users", { ...q }),
};

export const hospitalsApi = {
  list: (q: PageQuery = {}) => api.get<Page<Hospital>>("/hospitals", { size: 100, ...q }),
};

export const ambulancesApi = {
  list: (q: PageQuery & { status?: AmbulanceStatus } = {}) =>
    api.get<Page<Ambulance>>("/ambulances", { size: 100, ...q }),
  mine: () => api.get<Ambulance>("/ambulances/me"),
  updateLocation: (id: number, latitude: number, longitude: number) =>
    api.patch<Ambulance>(`/ambulances/${id}/location`, { latitude, longitude }),
};

export const emergenciesApi = {
  create: (body: EmergencyCreateRequest) => api.post<Emergency>("/emergencies", body),
  list: (q: PageQuery & { status?: EmergencyStatus } = {}) => api.get<Page<Emergency>>("/emergencies", { ...q }),
  mine: (q: PageQuery = {}) => api.get<Page<Emergency>>("/emergencies/me", { ...q }),
  current: () => api.get<Emergency | undefined>("/emergencies/current"),
  get: (id: number) => api.get<Emergency>(`/emergencies/${id}`),
  assign: (id: number, ambulanceId: number, hospitalId: number) =>
    api.patch<Emergency>(`/emergencies/${id}/assignment`, { ambulanceId, hospitalId }),
  changeStatus: (id: number, status: EmergencyStatus) =>
    api.patch<Emergency>(`/emergencies/${id}/status`, { status }),
  updateAnamnesis: (id: number, anamnesis: string) =>
    api.patch<Emergency>(`/emergencies/${id}/anamnesis`, { anamnesis }),
  tracking: (id: number) => api.get<Tracking>(`/emergencies/${id}/tracking`),
};
