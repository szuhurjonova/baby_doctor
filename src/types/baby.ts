export type Gender = 'ogil' | 'qiz'; // boy or girl in Uzbek
export type BloodType = 'A(I) Rh+' | 'A(I) Rh-' | 'B(III) Rh+' | 'B(III) Rh-' | 'AB(IV) Rh+' | 'AB(IV) Rh-' | 'O(I) Rh+' | 'O(I) Rh-' | 'Noma\'lum';

export interface BabyProfile {
  id: string;
  userId: string;
  fullName: string;
  gender: Gender;
  birthDate: string; // YYYY-MM-DD
  bloodType: BloodType;
  birthWeightKg: number;
  birthHeightCm: number;
  birthHeadCircumferenceCm: number;
  currentWeightKg: number;
  currentHeightCm: number;
  currentHeadCircumferenceCm: number;
  pediatricianName: string;
  pediatricianPhone: string;
  clinicName: string;
  medicalInsuranceOrId?: string;
  notes?: string;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}
