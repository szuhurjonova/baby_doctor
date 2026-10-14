export interface PrescribedMedication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  durationDays: number;
  instructions?: string;
}

export interface MedicalRecord {
  id: string;
  babyId: string;
  visitDate: string; // YYYY-MM-DD
  title: string;
  doctorName: string;
  specialty: string; // e.g. "Pediatr", "Nevropatolog", "Ortoped", "Oftalmolog", "LOR"
  clinic: string;
  reasonForVisit: string;
  diagnosis: string;
  symptoms: string[];
  vitalSigns?: {
    temperatureC?: number;
    weightKg?: number;
    heightCm?: number;
    heartRateBpm?: number;
  };
  prescriptions: PrescribedMedication[];
  doctorNotes: string;
  labResultsSummary?: string;
  nextAppointmentDate?: string;
  attachmentsCount?: number;
  createdAt: string;
  updatedAt: string;
}
