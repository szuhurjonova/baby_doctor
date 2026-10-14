import { BabyProfile } from '../types/baby.ts';
import { VaccineRecord, DoctorVerification } from '../types/vaccine.ts';
import { MedicalRecord } from '../types/medical.ts';
import { AllergyRecord } from '../types/allergy.ts';
import { GrowthRecord, ReminderItem } from '../types/growth.ts';
import { ParentUser, DoctorProfile, UserRole } from '../types/user.ts';
import { AppNotification } from '../types/notification.ts';
import { buildInitialVaccineRecords } from './vaccineCalendar.ts';

const STORAGE_KEY_PREFIX = 'baby_doctor_v2_';

export interface StorageState {
  currentRole: UserRole;
  user: ParentUser;
  doctor: DoctorProfile;
  babies: BabyProfile[];
  activeBabyId: string;
  vaccines: Record<string, VaccineRecord[]>; // babyId -> records
  medicalRecords: Record<string, MedicalRecord[]>;
  allergies: Record<string, AllergyRecord[]>;
  growthRecords: Record<string, GrowthRecord[]>;
  reminders: Record<string, ReminderItem[]>;
  notifications: Record<string, AppNotification[]>;
  isAppLocked: boolean;
}

// Initial demonstration data
const DEMO_USER_ID = 'user-parent-1';
const DEMO_DOCTOR_ID = 'doc-sayyora-karimova';
const DEMO_BABY_ID = 'baby-jasurbek-1';
const DEMO_BABY_2_ID = 'baby-madina-2';

const INITIAL_PARENT: ParentUser = {
  id: DEMO_USER_ID,
  fullName: 'Nilufar Aliyeva',
  email: 'nilufar.aliyeva@example.uz',
  phone: '+998 (90) 876-54-32',
  pinCode: '1234',
  isPinEnabled: false,
  activeBabyId: DEMO_BABY_ID,
};

const INITIAL_DOCTOR: DoctorProfile = {
  id: DEMO_DOCTOR_ID,
  fullName: 'Dr. Sayyora Karimova',
  age: 38,
  specialty: 'Oliy toifali pediatr-infeksionist',
  clinic: '1-sonli Bolalar poliklinikasi, Yunusobod',
  phone: '+998 (90) 123-45-67',
  email: 'dr.sayyora.karimova@pediatriya.uz',
  doctorId: 'DOC-UZ-7892',
  licenseNumber: 'MED-LIC-2024-9123',
  experienceYears: 14,
  bio: 'Toshkent Pediatriya Tibbiyot Instituti bitiruvchisi. Chaqaloqlar parvarishi va bolalar vaksina profilaktikasi bo‘yicha 14 yillik tajribaga ega shifokor.',
  verifiedBadgesCount: 142,
};

const INITIAL_BABY_1: BabyProfile = {
  id: DEMO_BABY_ID,
  userId: DEMO_USER_ID,
  fullName: 'Jasurbek Aliyev',
  gender: 'ogil',
  birthDate: '2026-04-10',
  bloodType: 'O(I) Rh+',
  birthWeightKg: 3.4,
  birthHeightCm: 51,
  birthHeadCircumferenceCm: 35,
  currentWeightKg: 7.9,
  currentHeightCm: 67.5,
  currentHeadCircumferenceCm: 43.2,
  pediatricianName: 'Dr. Sayyora Karimova',
  pediatricianPhone: '+998 (90) 123-45-67',
  clinicName: '1-sonli Bolalar poliklinikasi, Yunusobod',
  medicalInsuranceOrId: 'MED-UZB-2026-8849',
  notes: 'Tug\'ruq asoratsiz o\'tgan, Apgar shkalasi: 8/9 ball. Rivojlanish dinamikasi ijobiy.',
  createdAt: '2026-04-10T10:00:00.000Z',
  updatedAt: '2026-10-05T09:30:00.000Z',
};

const INITIAL_BABY_2: BabyProfile = {
  id: DEMO_BABY_2_ID,
  userId: DEMO_USER_ID,
  fullName: 'Madina Karimova',
  gender: 'qiz',
  birthDate: '2026-07-20',
  bloodType: 'A(I) Rh+',
  birthWeightKg: 3.2,
  birthHeightCm: 49.5,
  birthHeadCircumferenceCm: 34.2,
  currentWeightKg: 5.8,
  currentHeightCm: 59.0,
  currentHeadCircumferenceCm: 39.5,
  pediatricianName: 'Dr. Sayyora Karimova',
  pediatricianPhone: '+998 (90) 123-45-67',
  clinicName: '1-sonli Bolalar poliklinikasi, Yunusobod',
  medicalInsuranceOrId: 'MED-UZB-2026-9021',
  notes: 'Rejaviy ko\'riklar o\'z vaqtida o\'tmoqda.',
  createdAt: '2026-07-20T10:00:00.000Z',
  updatedAt: '2026-10-01T09:30:00.000Z',
};

const INITIAL_GROWTH_RECORDS: GrowthRecord[] = [
  { id: 'g-1', babyId: DEMO_BABY_ID, recordDate: '2026-04-10', ageMonths: 0, weightKg: 3.4, heightCm: 51.0, headCircumferenceCm: 35.0, notes: 'Tug\'ruqxonada o\'lchangan ko\'rsatkichlar' },
  { id: 'g-2', babyId: DEMO_BABY_ID, recordDate: '2026-05-10', ageMonths: 1, weightKg: 4.5, heightCm: 54.8, headCircumferenceCm: 37.2, notes: '1 oylik rejaviy profilaktik ko\'rik' },
  { id: 'g-3', babyId: DEMO_BABY_ID, recordDate: '2026-06-10', ageMonths: 2, weightKg: 5.6, heightCm: 58.5, headCircumferenceCm: 39.1, notes: '2 oylik ko\'rik va 1-bosqich vaksinalar oldi' },
  { id: 'g-4', babyId: DEMO_BABY_ID, recordDate: '2026-07-10', ageMonths: 3, weightKg: 6.4, heightCm: 61.5, headCircumferenceCm: 40.5, notes: '3 oylik me\'yordagi rivojlanish' },
  { id: 'g-5', babyId: DEMO_BABY_ID, recordDate: '2026-08-10', ageMonths: 4, weightKg: 7.0, heightCm: 64.0, headCircumferenceCm: 41.8, notes: '4 oylik vaksinalar qabul qilindi' },
  { id: 'g-6', babyId: DEMO_BABY_ID, recordDate: '2026-09-10', ageMonths: 5, weightKg: 7.5, heightCm: 66.0, headCircumferenceCm: 42.6, notes: '5 oylik o\'lchov' },
  { id: 'g-7', babyId: DEMO_BABY_ID, recordDate: '2026-10-05', ageMonths: 6, weightKg: 7.9, heightCm: 67.5, headCircumferenceCm: 43.2, notes: '6 oylik pediatr ko\'rigi, qo\'shimcha ovqatlanish boshlandi' },
];

const INITIAL_ALLERGIES: AllergyRecord[] = [
  {
    id: 'alg-1',
    babyId: DEMO_BABY_ID,
    allergen: 'Sigir suti oqsili (Laktaza/Kazein)',
    category: 'oziq_ovqat',
    severity: 'ortacha',
    symptoms: ['Yonoqlarda qizarish va mayda toshmalar', 'Qorinda dam bo\'lish', 'Bezovtalik'],
    reactionDate: '2026-09-02',
    diagnosedByDoctor: 'Dr. Sayyora Karimova',
    emergencyAction: 'Tarkibida sut bo\'lgan mahsulotlar darhol to\'xtatilsin. Bezovtalikda Fenistil tomchisi 3 tomchidan tavsiya etilgan.',
    avoidanceNotes: 'Onaga sut mahsulotlarisiz parhez (gipoallergen menyu). Bolaga faqat maxsus gidrolizlangan aralashma yoki ona suti.',
    createdAt: '2026-09-02T14:00:00.000Z',
    updatedAt: '2026-09-02T14:00:00.000Z',
  },
  {
    id: 'alg-2',
    babyId: DEMO_BABY_ID,
    allergen: 'Sintetik matolar va kuchli yuvish kukunlari',
    category: 'boshqa',
    severity: 'yengil',
    symptoms: ['Terida quruqlik', 'Bo\'yin sohasida mayda qizil nuqtalar'],
    reactionDate: '2026-07-15',
    diagnosedByDoctor: 'Dr. Sayyora Karimova',
    emergencyAction: 'Bolalar kiyimlarini faqat gipoallergen sovun bilan yuvish va yaxshilab chayish.',
    avoidanceNotes: 'Faqat 100% paxta (xlopok) kiyimlar kiyilsin.',
    createdAt: '2026-07-15T11:00:00.000Z',
    updatedAt: '2026-07-15T11:00:00.000Z',
  }
];

const INITIAL_MEDICAL_RECORDS: MedicalRecord[] = [
  {
    id: 'med-1',
    babyId: DEMO_BABY_ID,
    visitDate: '2026-10-05',
    title: '6 oylik rejali pediatr profilaktik ko\'rigi',
    doctorName: 'Dr. Sayyora Karimova',
    specialty: 'Pediatr',
    clinic: '1-sonli Bolalar poliklinikasi',
    reasonForVisit: '6 oylik rejali ko\'rik, tana o\'lchamlari va qo\'shimcha ovqat (prikorm) maslahati',
    diagnosis: 'Somatik sog\'lom. Sog\'lom bolaning yoshiga mos rivojlanishi.',
    symptoms: ['Shikoyat yo\'q', 'Ishtaha va uyqu yaxshi'],
    vitalSigns: {
      temperatureC: 36.6,
      weightKg: 7.9,
      heightCm: 67.5,
      heartRateBpm: 118,
    },
    prescriptions: [
      {
        id: 'rx-1',
        name: 'Akvadetrim (Vitamin D3)',
        dosage: '1 tomchi (500 ME)',
        frequency: 'Kuniga 1 mahal ertalab',
        durationDays: 180,
        instructions: 'Qoshiqchada ozroq suv yoki sut bilan berilsin.',
      }
    ],
    doctorNotes: 'Kichkintoy faol, o\'tirmoqda, qo\'llarini yaxshi muvofiqlashtirmoqda. Sabzavotli pyurelar bilan birinchi prikorm boshlashga ruxsat berildi.',
    nextAppointmentDate: '2026-11-05',
    createdAt: '2026-10-05T10:00:00.000Z',
    updatedAt: '2026-10-05T10:00:00.000Z',
  },
  {
    id: 'med-2',
    babyId: DEMO_BABY_ID,
    visitDate: '2026-09-02',
    title: 'Yonoqlarda allergik toshma ko\'rigi',
    doctorName: 'Dr. Sayyora Karimova',
    specialty: 'Pediatr / Allergolog',
    clinic: '1-sonli Bolalar poliklinikasi',
    reasonForVisit: 'Yonoqlarda qizarish va po\'stloq paydo bo\'lgani sababli navbatdan tashqari murojaat',
    diagnosis: 'Atopik dermatit (yengil daraja), oziq-ovqat allergiyasi foni',
    symptoms: ['Yonoq terisida giperemiya', 'Qichishish va bezovtalik'],
    vitalSigns: {
      temperatureC: 36.7,
      weightKg: 7.4,
      heightCm: 65.5,
      heartRateBpm: 122,
    },
    prescriptions: [
      {
        id: 'rx-2',
        name: 'Fenistil tomchi',
        dosage: '3 tomchi',
        frequency: 'Kuniga 2 mahal',
        durationDays: 5,
        instructions: 'Ovqatdan keyin berilsin.',
      }
    ],
    doctorNotes: 'Onaga sut mahsulotlaridan cheklanish tavsiya qilindi. 5 kunda toshmalar yo\'qoldi.',
    createdAt: '2026-09-02T15:00:00.000Z',
    updatedAt: '2026-09-02T15:00:00.000Z',
  }
];

const INITIAL_REMINDERS: ReminderItem[] = [
  {
    id: 'rem-1',
    babyId: DEMO_BABY_ID,
    title: '7 oylik profilaktik pediatr ko\'rigi',
    description: 'Dr. Sayyora Karimova qabuliga yozilish va oylik o\'lchovlarni o\'tkazish.',
    dueDate: '2026-11-05',
    type: 'shifokor_korigi',
    priority: 'muhim',
    isCompleted: false,
    createdAt: '2026-10-05T10:00:00.000Z',
  },
  {
    id: 'rem-2',
    babyId: DEMO_BABY_ID,
    title: 'Akvadetrim (Vitamin D3) ertalabki qabuli',
    description: 'Har kuni ertalab 1 tomchi (500 ME) berishni unutmang.',
    dueDate: '2026-10-08',
    type: 'dori',
    priority: 'oddiy',
    isCompleted: false,
    createdAt: '2026-10-05T10:00:00.000Z',
  }
];

const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    babyId: DEMO_BABY_ID,
    title: 'Vaksina shifokor tomonidan tasdiqlandi ✓',
    message: 'Dr. Sayyora Karimova tomonidan "Pentavalent 3 (DTP-Hib-HepB)" vaksinasi muvaffaqiyatli qabul qilinganligi tasdiqlandi va tibbiy muhr bilan tasdiqlandi.',
    type: 'vaccine_verified',
    timestamp: '2026-08-10T11:25:00.000Z',
    isRead: false,
    metadata: {
      vaccineName: 'Pentavalent 3 (DTP-Hib-HepB)',
      doctorName: 'Dr. Sayyora Karimova',
      clinic: '1-sonli Bolalar poliklinikasi',
      verifiedTime: '2026-08-10 11:25',
      stampCode: 'UZ-MED-STAMP-7892-2026',
    }
  },
  {
    id: 'notif-2',
    babyId: DEMO_BABY_ID,
    title: 'Vaksina shifokor tomonidan tasdiqlandi ✓',
    message: 'Dr. Sayyora Karimova tomonidan "OPV 3 (Poliomiyelit)" vaksinasi qabul qilinganligi tasdiqlandi.',
    type: 'vaccine_verified',
    timestamp: '2026-08-10T11:28:00.000Z',
    isRead: true,
    metadata: {
      vaccineName: 'OPV 3 (Poliomiyelit)',
      doctorName: 'Dr. Sayyora Karimova',
      clinic: '1-sonli Bolalar poliklinikasi',
      verifiedTime: '2026-08-10 11:28',
      stampCode: 'UZ-MED-STAMP-7892-2026',
    }
  }
];

class StorageService {
  private state: StorageState;

  constructor() {
    this.state = this.loadInitialState();
  }

  private loadInitialState(): StorageState {
    try {
      const stored = localStorage.getItem(`${STORAGE_KEY_PREFIX}state`);
      if (stored) {
        const parsed = JSON.parse(stored) as StorageState;
        if (parsed && parsed.babies && parsed.babies.length > 0) {
          if (!parsed.currentRole) parsed.currentRole = 'parent';
          if (!parsed.doctor) parsed.doctor = INITIAL_DOCTOR;
          if (!parsed.notifications) parsed.notifications = { [DEMO_BABY_ID]: INITIAL_NOTIFICATIONS };
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to parse stored Baby Doctor state, re-seeding:', e);
    }

    // Default Seed with doctor-verified vaccines
    const initialVaccines = buildInitialVaccineRecords(DEMO_BABY_ID, INITIAL_BABY_1.birthDate);
    // Mark birth and 4m vaccines as doctor-verified
    initialVaccines.forEach((v) => {
      if (v.targetAgeMonths <= 4 && v.status === 'olingan') {
        v.status = 'shifokor_tasdiqlagan';
        v.doctorVerification = {
          doctorId: INITIAL_DOCTOR.id,
          doctorName: INITIAL_DOCTOR.fullName,
          doctorSpecialty: INITIAL_DOCTOR.specialty,
          doctorLicenseId: INITIAL_DOCTOR.doctorId,
          clinic: INITIAL_DOCTOR.clinic,
          verifiedAt: `${v.administeredDate || v.dueDate}T10:30:00.000Z`,
          batchNumber: v.batchNumber || 'SER-2026-88',
          stampCode: 'UZ-MED-STAMP-7892-2026',
          clinicalNotes: 'Bola ko\'rikdan o\'tdi, tana harorati 36.6°C. Emlashga qarshi ko\'rsatmalar yo\'q.',
        };
      }
    });

    const baby2Vaccines = buildInitialVaccineRecords(DEMO_BABY_2_ID, INITIAL_BABY_2.birthDate);

    const defaultState: StorageState = {
      currentRole: 'parent',
      user: INITIAL_PARENT,
      doctor: INITIAL_DOCTOR,
      babies: [INITIAL_BABY_1, INITIAL_BABY_2],
      activeBabyId: DEMO_BABY_ID,
      vaccines: {
        [DEMO_BABY_ID]: initialVaccines,
        [DEMO_BABY_2_ID]: baby2Vaccines,
      },
      medicalRecords: {
        [DEMO_BABY_ID]: INITIAL_MEDICAL_RECORDS,
        [DEMO_BABY_2_ID]: [],
      },
      allergies: {
        [DEMO_BABY_ID]: INITIAL_ALLERGIES,
        [DEMO_BABY_2_ID]: [],
      },
      growthRecords: {
        [DEMO_BABY_ID]: INITIAL_GROWTH_RECORDS,
        [DEMO_BABY_2_ID]: [],
      },
      reminders: {
        [DEMO_BABY_ID]: INITIAL_REMINDERS,
        [DEMO_BABY_2_ID]: [],
      },
      notifications: {
        [DEMO_BABY_ID]: INITIAL_NOTIFICATIONS,
        [DEMO_BABY_2_ID]: [],
      },
      isAppLocked: false,
    };

    this.saveState(defaultState);
    return defaultState;
  }

  private saveState(state: StorageState): void {
    try {
      localStorage.setItem(`${STORAGE_KEY_PREFIX}state`, JSON.stringify(state));
    } catch (e) {
      console.error('Failed to save state to localStorage:', e);
    }
  }

  private persist(): void {
    this.saveState(this.state);
  }

  // --- Role Management ---
  public getCurrentRole(): UserRole {
    return this.state.currentRole || 'parent';
  }

  public setRole(role: UserRole): void {
    this.state.currentRole = role;
    this.persist();
  }

  // --- Parent User ---
  public getUser(): ParentUser {
    return { ...this.state.user };
  }

  public updateUser(userUpdate: Partial<ParentUser>): void {
    this.state.user = { ...this.state.user, ...userUpdate };
    this.persist();
  }

  // --- Doctor Profile ---
  public getDoctorProfile(): DoctorProfile {
    return { ...this.state.doctor };
  }

  public updateDoctorProfile(doctorUpdate: Partial<DoctorProfile>): void {
    this.state.doctor = { ...this.state.doctor, ...doctorUpdate };
    this.persist();
  }

  // --- Security & PIN ---
  public isAppLocked(): boolean {
    return this.state.isAppLocked && this.state.user.isPinEnabled;
  }

  public setAppLocked(locked: boolean): void {
    this.state.isAppLocked = locked;
    this.persist();
  }

  public verifyPin(enteredPin: string): boolean {
    if (!this.state.user.pinCode) return true;
    return this.state.user.pinCode === enteredPin;
  }

  // --- Baby Profiles ---
  public getBabies(): BabyProfile[] {
    return [...this.state.babies];
  }

  public getActiveBaby(): BabyProfile {
    const active = this.state.babies.find(b => b.id === this.state.activeBabyId);
    if (active) return active;
    if (this.state.babies.length > 0) {
      this.state.activeBabyId = this.state.babies[0].id;
      this.persist();
      return this.state.babies[0];
    }
    return INITIAL_BABY_1;
  }

  public setActiveBabyId(id: string): void {
    if (this.state.babies.some(b => b.id === id)) {
      this.state.activeBabyId = id;
      this.state.user.activeBabyId = id;
      this.persist();
    }
  }

  public saveBaby(baby: BabyProfile): void {
    const index = this.state.babies.findIndex(b => b.id === baby.id);
    if (index >= 0) {
      this.state.babies[index] = { ...baby, updatedAt: new Date().toISOString() };
    } else {
      this.state.babies.push(baby);
      if (!this.state.vaccines[baby.id]) {
        this.state.vaccines[baby.id] = buildInitialVaccineRecords(baby.id, baby.birthDate);
      }
      if (!this.state.growthRecords[baby.id]) {
        this.state.growthRecords[baby.id] = [
          {
            id: `g-birth-${baby.id}`,
            babyId: baby.id,
            recordDate: baby.birthDate,
            ageMonths: 0,
            weightKg: baby.birthWeightKg,
            heightCm: baby.birthHeightCm,
            headCircumferenceCm: baby.birthHeadCircumferenceCm,
            notes: 'Tug\'ilishdagi dastlabki ko\'rsatkichlar',
          }
        ];
      }
      if (!this.state.medicalRecords[baby.id]) this.state.medicalRecords[baby.id] = [];
      if (!this.state.allergies[baby.id]) this.state.allergies[baby.id] = [];
      if (!this.state.reminders[baby.id]) this.state.reminders[baby.id] = [];
      if (!this.state.notifications[baby.id]) this.state.notifications[baby.id] = [];
    }
    this.persist();
  }

  public deleteBaby(id: string): void {
    if (this.state.babies.length <= 1) {
      throw new Error("Oxirgi bolaning profilini o'chirish mumkin emas.");
    }
    this.state.babies = this.state.babies.filter(b => b.id !== id);
    delete this.state.vaccines[id];
    delete this.state.medicalRecords[id];
    delete this.state.allergies[id];
    delete this.state.growthRecords[id];
    delete this.state.reminders[id];
    delete this.state.notifications[id];

    if (this.state.activeBabyId === id) {
      this.state.activeBabyId = this.state.babies[0].id;
      this.state.user.activeBabyId = this.state.babies[0].id;
    }
    this.persist();
  }

  // --- Vaccines & Doctor Verification ---
  public getVaccines(babyId?: string): VaccineRecord[] {
    const id = babyId || this.state.activeBabyId;
    return this.state.vaccines[id] || [];
  }

  public saveVaccine(vaccine: VaccineRecord): void {
    const id = vaccine.babyId || this.state.activeBabyId;
    if (!this.state.vaccines[id]) {
      this.state.vaccines[id] = [];
    }
    const list = this.state.vaccines[id];
    const index = list.findIndex(v => v.id === vaccine.id);
    if (index >= 0) {
      list[index] = { ...vaccine, updatedAt: new Date().toISOString() };
    } else {
      list.push(vaccine);
    }
    this.persist();
  }

  /**
   * CRITICAL WORKFLOW: Doctor verifies administered vaccine.
   * Only authorized doctors can call this!
   * Automatically adds a notification to the parent:
   * “Vaksina shifokor tomonidan tasdiqlandi ✓”
   */
  public verifyVaccineByDoctor(
    babyId: string,
    vaccineId: string,
    verificationData: {
      administeredDate: string;
      batchNumber: string;
      clinicalNotes?: string;
      clinic?: string;
    }
  ): { vaccine: VaccineRecord; notification: AppNotification } {
    const list = this.state.vaccines[babyId];
    if (!list) throw new Error('Bola vaksinalari ro\'yxati topilmadi');

    const index = list.findIndex(v => v.id === vaccineId);
    if (index < 0) throw new Error('Vaksina topilmadi');

    const vaccine = list[index];
    const nowIso = new Date().toISOString();
    const doctor = this.state.doctor;

    const stampCode = `UZ-MED-STAMP-${doctor.doctorId}-${new Date().getFullYear()}`;

    const docVerification: DoctorVerification = {
      doctorId: doctor.id,
      doctorName: doctor.fullName,
      doctorSpecialty: doctor.specialty,
      doctorLicenseId: doctor.doctorId,
      clinic: verificationData.clinic || doctor.clinic,
      verifiedAt: nowIso,
      batchNumber: verificationData.batchNumber,
      clinicalNotes: verificationData.clinicalNotes || 'Vaksina shifokor ko\'rigidan so\'ng qabul qilindi. Reaksiya me\'yorda.',
      stampCode,
    };

    const updatedVaccine: VaccineRecord = {
      ...vaccine,
      status: 'shifokor_tasdiqlagan',
      administeredDate: verificationData.administeredDate,
      batchNumber: verificationData.batchNumber,
      clinic: docVerification.clinic,
      doctorName: doctor.fullName,
      doctorVerification: docVerification,
      notes: verificationData.clinicalNotes,
      updatedAt: nowIso,
    };

    list[index] = updatedVaccine;

    // Increment doctor's verified badges count
    this.state.doctor.verifiedBadgesCount = (this.state.doctor.verifiedBadgesCount || 0) + 1;

    // Create automated notification for parent
    if (!this.state.notifications[babyId]) {
      this.state.notifications[babyId] = [];
    }

    const baby = this.state.babies.find(b => b.id === babyId);
    const babyName = baby ? baby.fullName : 'bolangiz';

    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      babyId,
      title: 'Vaksina shifokor tomonidan tasdiqlandi ✓',
      message: `${doctor.fullName} tomonidan ${babyName} uchun "${vaccine.nameUz}" vaksinasi muvaffaqiyatli qabul qilinganligi tasdiqlandi va rasmiy elektron muhr bilan imzolandi.`,
      type: 'vaccine_verified',
      timestamp: nowIso,
      isRead: false,
      metadata: {
        vaccineName: vaccine.nameUz,
        doctorName: doctor.fullName,
        clinic: docVerification.clinic,
        verifiedTime: nowIso.replace('T', ' ').substring(0, 16),
        vaccineId: vaccine.id,
        stampCode,
      },
    };

    this.state.notifications[babyId].unshift(newNotif);
    this.persist();

    return { vaccine: updatedVaccine, notification: newNotif };
  }

  // --- Notifications ---
  public getNotifications(babyId?: string): AppNotification[] {
    const id = babyId || this.state.activeBabyId;
    return this.state.notifications[id] || [];
  }

  public markNotificationAsRead(notifId: string, babyId?: string): void {
    const id = babyId || this.state.activeBabyId;
    const list = this.state.notifications[id];
    if (list) {
      const item = list.find(n => n.id === notifId);
      if (item) {
        item.isRead = true;
        this.persist();
      }
    }
  }

  public markAllNotificationsAsRead(babyId?: string): void {
    const id = babyId || this.state.activeBabyId;
    const list = this.state.notifications[id];
    if (list) {
      list.forEach(n => { n.isRead = true; });
      this.persist();
    }
  }

  public getUnreadNotificationsCount(babyId?: string): number {
    const id = babyId || this.state.activeBabyId;
    const list = this.state.notifications[id] || [];
    return list.filter(n => !n.isRead).length;
  }

  // --- Medical Records ---
  public getMedicalRecords(babyId?: string): MedicalRecord[] {
    const id = babyId || this.state.activeBabyId;
    return (this.state.medicalRecords[id] || []).sort((a, b) => 
      new Date(b.visitDate).getTime() - new Date(a.visitDate).getTime()
    );
  }

  public saveMedicalRecord(record: MedicalRecord): void {
    const id = record.babyId || this.state.activeBabyId;
    if (!this.state.medicalRecords[id]) {
      this.state.medicalRecords[id] = [];
    }
    const list = this.state.medicalRecords[id];
    const index = list.findIndex(m => m.id === record.id);
    if (index >= 0) {
      list[index] = { ...record, updatedAt: new Date().toISOString() };
    } else {
      list.unshift(record);
    }
    this.persist();
  }

  public deleteMedicalRecord(id: string, babyId?: string): void {
    const bId = babyId || this.state.activeBabyId;
    if (this.state.medicalRecords[bId]) {
      this.state.medicalRecords[bId] = this.state.medicalRecords[bId].filter(m => m.id !== id);
      this.persist();
    }
  }

  // --- Allergies ---
  public getAllergies(babyId?: string): AllergyRecord[] {
    const id = babyId || this.state.activeBabyId;
    return this.state.allergies[id] || [];
  }

  public saveAllergy(allergy: AllergyRecord): void {
    const id = allergy.babyId || this.state.activeBabyId;
    if (!this.state.allergies[id]) {
      this.state.allergies[id] = [];
    }
    const list = this.state.allergies[id];
    const index = list.findIndex(a => a.id === allergy.id);
    if (index >= 0) {
      list[index] = { ...allergy, updatedAt: new Date().toISOString() };
    } else {
      list.push(allergy);
    }
    this.persist();
  }

  public deleteAllergy(id: string, babyId?: string): void {
    const bId = babyId || this.state.activeBabyId;
    if (this.state.allergies[bId]) {
      this.state.allergies[bId] = this.state.allergies[bId].filter(a => a.id !== id);
      this.persist();
    }
  }

  // --- Growth Records ---
  public getGrowthRecords(babyId?: string): GrowthRecord[] {
    const id = babyId || this.state.activeBabyId;
    return (this.state.growthRecords[id] || []).sort((a, b) => 
      new Date(a.recordDate).getTime() - new Date(b.recordDate).getTime()
    );
  }

  public saveGrowthRecord(growth: GrowthRecord): void {
    const id = growth.babyId || this.state.activeBabyId;
    if (!this.state.growthRecords[id]) {
      this.state.growthRecords[id] = [];
    }
    const list = this.state.growthRecords[id];
    const index = list.findIndex(g => g.id === growth.id);
    if (index >= 0) {
      list[index] = growth;
    } else {
      list.push(growth);
    }

    const baby = this.state.babies.find(b => b.id === id);
    if (baby) {
      const sorted = [...list].sort((a, b) => new Date(b.recordDate).getTime() - new Date(a.recordDate).getTime());
      if (sorted.length > 0 && sorted[0].id === growth.id) {
        baby.currentWeightKg = growth.weightKg;
        baby.currentHeightCm = growth.heightCm;
        if (growth.headCircumferenceCm) {
          baby.currentHeadCircumferenceCm = growth.headCircumferenceCm;
        }
        baby.updatedAt = new Date().toISOString();
      }
    }

    this.persist();
  }

  public deleteGrowthRecord(id: string, babyId?: string): void {
    const bId = babyId || this.state.activeBabyId;
    if (this.state.growthRecords[bId]) {
      this.state.growthRecords[bId] = this.state.growthRecords[bId].filter(g => g.id !== id);
      this.persist();
    }
  }

  // --- Reminders ---
  public getReminders(babyId?: string): ReminderItem[] {
    const id = babyId || this.state.activeBabyId;
    return (this.state.reminders[id] || []).sort((a, b) => 
      new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
    );
  }

  public saveReminder(reminder: ReminderItem): void {
    const id = reminder.babyId || this.state.activeBabyId;
    if (!this.state.reminders[id]) {
      this.state.reminders[id] = [];
    }
    const list = this.state.reminders[id];
    const index = list.findIndex(r => r.id === reminder.id);
    if (index >= 0) {
      list[index] = reminder;
    } else {
      list.push(reminder);
    }
    this.persist();
  }

  public toggleReminderCompleted(reminderId: string, babyId?: string): void {
    const id = babyId || this.state.activeBabyId;
    if (this.state.reminders[id]) {
      const item = this.state.reminders[id].find(r => r.id === reminderId);
      if (item) {
        item.isCompleted = !item.isCompleted;
        this.persist();
      }
    }
  }

  public deleteReminder(reminderId: string, babyId?: string): void {
    const id = babyId || this.state.activeBabyId;
    if (this.state.reminders[id]) {
      this.state.reminders[id] = this.state.reminders[id].filter(r => r.id !== reminderId);
      this.persist();
    }
  }

  // --- Export / Import / Reset ---
  public exportDataJSON(): string {
    return JSON.stringify(this.state, null, 2);
  }

  public importDataJSON(jsonStr: string): boolean {
    try {
      const parsed = JSON.parse(jsonStr) as StorageState;
      if (parsed && Array.isArray(parsed.babies) && parsed.babies.length > 0) {
        this.state = parsed;
        this.persist();
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }

  public resetToDefaultDemo(): void {
    localStorage.removeItem(`${STORAGE_KEY_PREFIX}state`);
    this.state = this.loadInitialState();
  }
}

export const storage = new StorageService();
