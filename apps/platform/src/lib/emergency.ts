import type { EmergencyStatus } from "@/types/api";

export const OPEN_STATUSES: EmergencyStatus[] = ["PENDING", "ASSIGNED", "IN_PROGRESS"];

export const isOpen = (status: EmergencyStatus) => OPEN_STATUSES.includes(status);

export const canClientCancel = (status: EmergencyStatus) => status === "PENDING" || status === "ASSIGNED";
