export interface GrowthRecord {
  id: string;
  babyId: string;
  recordDate: string; // YYYY-MM-DD
  ageMonths: number;
  weightKg: number;
  heightCm: number;
  headCircumferenceCm?: number;
  notes?: string;
  recordedBy?: string;
}

export type ReminderType = 'vaksina' | 'shifokor_korigi' | 'dori' | 'olchov' | 'umumiy';
export type ReminderPriority = 'oddiy' | 'muhim' | 'shoshilinch';

export interface ReminderItem {
  id: string;
  babyId: string;
  title: string;
  description: string;
  dueDate: string; // YYYY-MM-DD
  dueTime?: string; // HH:mm
  type: ReminderType;
  priority: ReminderPriority;
  isCompleted: boolean;
  relatedEntityId?: string; // Vaccine ID or Medical Record ID
  createdAt: string;
}

