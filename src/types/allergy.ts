export type AllergyCategory = 'oziq_ovqat' | 'dori' | 'chang_mavsumiy' | 'hasharot' | 'boshqa';
export type AllergySeverity = 'yengil' | 'ortacha' | 'ogir';

export interface AllergyRecord {
  id: string;
  babyId: string;
  allergen: string;
  category: AllergyCategory;
  severity: AllergySeverity;
  symptoms: string[];
  reactionDate?: string;
  diagnosedByDoctor?: string;
  emergencyAction: string; // e.g. "Darhol Fenistil tomchisi berilsin va shifokorga xabar qilinsin"
  avoidanceNotes?: string;
  createdAt: string;
  updatedAt: string;
}
