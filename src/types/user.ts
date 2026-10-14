export type UserRole = 'parent' | 'doctor';

export interface ParentUser {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  pinCode?: string;
  isPinEnabled: boolean;
  activeBabyId: string;
}

export interface DoctorProfile {
  id: string;
  fullName: string;
  age: number;
  specialty: string;
  clinic: string;
  phone: string;
  email: string;
  doctorId: string; // e.g. "DOC-UZ-7892"
  licenseNumber: string;
  experienceYears: number;
  bio?: string;
  verifiedBadgesCount: number;
}
