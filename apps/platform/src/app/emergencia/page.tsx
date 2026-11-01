import type { Metadata } from "next";

import { GuestEmergencyForm } from "@/components/emergency/GuestEmergencyForm";

export const metadata: Metadata = { title: "Pedir ambulancia" };

export default function GuestEmergencyPage() {
  return <GuestEmergencyForm />;
}
