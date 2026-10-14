export type VaccineStatus =
  | 'kutilmoqda'
  | 'olinmagan'
  | 'olingan'
  | 'shifokor_tasdiqlagan'
  | 'muddati_otgan';

export interface DoctorVerification {
  doctorId: string;
  doctorName: string;
  doctorSpecialty: string;
  doctorLicenseId: string;
  clinic: string;
  verifiedAt: string; // ISO datetime
  clinicalNotes?: string;
  batchNumber?: string;
  stampCode: string; // e.g. "UZ-MED-STAMP-7892-2026"
}

export interface VaccineRecord {
  id: string;
  babyId: string;
  vaccineKey: string;
  nameUz: string;
  nameEn: string;
  descriptionUz: string;
  doseNumber: number;
  totalDoses?: number;
  targetAgeMonths: number;
  targetAgeLabel: string; // e.g. "Tug'ilganda (0-4 kun)", "2 oylik", "3 oylik", "12 oylik"
  dueDate: string; // YYYY-MM-DD
  administeredDate?: string; // YYYY-MM-DD
  status: VaccineStatus;
  batchNumber?: string;
  clinic?: string;
  doctorName?: string;
  doctorVerification?: DoctorVerification;
  sideEffects?: string;
  notes?: string;
  isMandatoryNationalSchedule: boolean;
  createdAt: string;
  updatedAt: string;
}
