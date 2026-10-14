export type NotificationType =
  | 'vaccine_verified'
  | 'vaccine_upcoming'
  | 'medical_visit'
  | 'reminder';

export interface AppNotification {
  id: string;
  babyId: string;
  title: string;
  message: string;
  type: NotificationType;
  timestamp: string; // ISO
  isRead: boolean;
  metadata?: {
    vaccineName?: string;
    doctorName?: string;
    clinic?: string;
    verifiedTime?: string;
    vaccineId?: string;
    stampCode?: string;
  };
}
