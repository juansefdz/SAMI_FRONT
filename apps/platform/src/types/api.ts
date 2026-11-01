// Tipos que reflejan los DTOs de SAMI_BACK (com.sami.app.*.dto).

export type Role = "ADMIN" | "CLIENT" | "DRIVER" | "EMT";

export type RhType =
  | "A_POSITIVE" | "A_NEGATIVE"
  | "B_POSITIVE" | "B_NEGATIVE"
  | "AB_POSITIVE" | "AB_NEGATIVE"
  | "O_POSITIVE" | "O_NEGATIVE";

export const RH_LABELS: Record<RhType, string> = {
  A_POSITIVE: "A+", A_NEGATIVE: "A-",
  B_POSITIVE: "B+", B_NEGATIVE: "B-",
  AB_POSITIVE: "AB+", AB_NEGATIVE: "AB-",
  O_POSITIVE: "O+", O_NEGATIVE: "O-",
};

export type EmergencyStatus = "PENDING" | "ASSIGNED" | "IN_PROGRESS" | "COMPLETED" | "CANCELED";
export type AmbulanceStatus = "AVAILABLE" | "BUSY" | "OUT_OF_SERVICE";
export type AmbulanceType = "BASIC" | "ADVANCED";
export type ComplexityLevel = "LEVEL_I" | "LEVEL_II" | "LEVEL_III" | "LEVEL_IV";

export interface Page<T> {
  content: T[];
  page: number; // empieza en 1
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface ApiErrorBody {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path: string;
  fieldErrors?: { field: string; message: string }[];
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  rhType?: RhType;
  email: string;
  role: Role;
  /** Cuenta creada al pedir ambulancia sin registro; puede completarse con email y contraseña. */
  guest: boolean;
}

export interface UserSummary {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
}

export interface AuthResponse {
  accessToken: string;
  tokenType: "Bearer";
  expiresIn: number;
  user: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  rhType: RhType;
}

export interface GuestEmergencyRequest {
  firstName: string;
  lastName?: string;
  phone: string;
  latitude: number;
  longitude: number;
  address?: string;
  description: string;
  patientsCount: number;
  severity: number;
}

export interface GuestEmergencyResponse {
  auth: AuthResponse;
  emergency: Emergency;
}

export interface ClaimAccountRequest {
  email: string;
  password: string;
}

/** Aviso en tiempo real (STOMP). Tras recibirlo se vuelven a pedir los datos por REST. */
export interface EmergencyEvent {
  emergencyId: number;
  type: "CREATED" | "STATUS" | "LOCATION" | "UPDATED" | "DELETED";
}

export interface Hospital {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  complexityLevel: ComplexityLevel;
  specialty: string;
}

export type HospitalSummary = Pick<Hospital, "id" | "name" | "address" | "latitude" | "longitude">;

export interface Ambulance {
  id: number;
  plate: string;
  type: AmbulanceType;
  status: AmbulanceStatus;
  latitude: number;
  longitude: number;
  lastLocationAt?: string;
  driver?: UserSummary;
  emt?: UserSummary;
}

export type AmbulanceSummary = Pick<Ambulance, "id" | "plate" | "type" | "latitude" | "longitude" | "lastLocationAt">;

export interface Emergency {
  id: number;
  latitude: number;
  longitude: number;
  address?: string;
  description: string;
  patientsCount: number;
  severity: number;
  anamnesis?: string;
  status: EmergencyStatus;
  client: UserSummary;
  ambulance?: AmbulanceSummary;
  hospital?: HospitalSummary;
  createdAt: string;
  updatedAt: string;
}

export interface EmergencyCreateRequest {
  latitude: number;
  longitude: number;
  address?: string;
  description: string;
  patientsCount: number;
  severity: number;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface RouteEstimate {
  distanceMeters: number;
  durationSeconds: number;
  durationText: string;
}

export interface Tracking {
  emergencyId: number;
  status: EmergencyStatus;
  patient: Coordinates;
  ambulance?: Coordinates;
  ambulanceUpdatedAt?: string;
  hospital?: Coordinates;
  etaToPatient?: RouteEstimate;
  etaToHospital?: RouteEstimate;
}
