import { VaccineRecord, VaccineStatus } from '../types/vaccine.ts';

export interface DefaultVaccineTemplate {
  key: string;
  nameUz: string;
  nameEn: string;
  descriptionUz: string;
  doseNumber: number;
  totalDoses: number;
  targetAgeMonths: number;
  targetAgeLabel: string;
  isMandatory: boolean;
}

export const NATIONAL_VACCINE_CALENDAR_UZ: DefaultVaccineTemplate[] = [
  {
    key: 'bcg',
    nameUz: 'BTsJ (BCG)',
    nameEn: 'BCG (Bacillus Calmette–Guérin)',
    descriptionUz: 'Sil kasalligiga qarshi himoya vaksina. Tug\'uruqxonada amalga oshiriladi.',
    doseNumber: 1,
    totalDoses: 1,
    targetAgeMonths: 0,
    targetAgeLabel: 'Tug\'ilganda (0-4 kun)',
    isMandatory: true,
  },
  {
    key: 'hepb-1',
    nameUz: 'VG-V 1 (Gepatit B 1)',
    nameEn: 'Hepatitis B 1',
    descriptionUz: 'Virusli Gepatit B ga qarshi birinchi doza. Tug\'uruqxonaning dastlabki 24 soatida beriladi.',
    doseNumber: 1,
    totalDoses: 4,
    targetAgeMonths: 0,
    targetAgeLabel: 'Tug\'ilganda (1-kun)',
    isMandatory: true,
  },
  {
    key: 'penta-1',
    nameUz: 'Pentavalent 1 (DTP-Hib-HepB)',
    nameEn: 'Pentavalent 1 (DTP-HepB-Hib)',
    descriptionUz: 'Bo\'g\'ma, qoqshol, ko\'kyo\'tal, gemofil infeksiya va Gepatit B ga qarshi besh komponentli vaksina.',
    doseNumber: 1,
    totalDoses: 3,
    targetAgeMonths: 2,
    targetAgeLabel: '2 oylikda',
    isMandatory: true,
  },
  {
    key: 'opv-1',
    nameUz: 'OPV 1 (Poliomiyelit)',
    nameEn: 'OPV 1 (Oral Polio Vaccine)',
    descriptionUz: 'Poliomiyelit (shol) kasalligiga qarshi og\'iz orqali tomiziladigan vaksina.',
    doseNumber: 1,
    totalDoses: 4,
    targetAgeMonths: 2,
    targetAgeLabel: '2 oylikda',
    isMandatory: true,
  },
  {
    key: 'rota-1',
    nameUz: 'Rotavirus 1',
    nameEn: 'Rotavirus 1',
    descriptionUz: 'Og\'ir o\'tkir rotavirusli diareya va suvsizlanishga qarshi himoya tomchisi.',
    doseNumber: 1,
    totalDoses: 2,
    targetAgeMonths: 2,
    targetAgeLabel: '2 oylikda',
    isMandatory: true,
  },
  {
    key: 'pneumo-1',
    nameUz: 'Pnevmokokk 1',
    nameEn: 'Pneumococcal Conjugate 1',
    descriptionUz: 'Pnevmokokk bakteriyasi keltirib chiqaradigan pnevmoniya, meningit va otitdan himoya.',
    doseNumber: 1,
    totalDoses: 3,
    targetAgeMonths: 2,
    targetAgeLabel: '2 oylikda',
    isMandatory: true,
  },
  {
    key: 'penta-2',
    nameUz: 'Pentavalent 2 (DTP-Hib-HepB)',
    nameEn: 'Pentavalent 2',
    descriptionUz: 'Bo\'g\'ma, qoqshol, ko\'kyo\'tal, gemofil infeksiya va Gepatit B ga qarshi ikkinchi doza.',
    doseNumber: 2,
    totalDoses: 3,
    targetAgeMonths: 3,
    targetAgeLabel: '3 oylikda',
    isMandatory: true,
  },
  {
    key: 'opv-2',
    nameUz: 'OPV 2 (Poliomiyelit)',
    nameEn: 'OPV 2',
    descriptionUz: 'Poliomiyelit kasalligiga qarshi ikkinchi og\'iz orqali doza.',
    doseNumber: 2,
    totalDoses: 4,
    targetAgeMonths: 3,
    targetAgeLabel: '3 oylikda',
    isMandatory: true,
  },
  {
    key: 'rota-2',
    nameUz: 'Rotavirus 2',
    nameEn: 'Rotavirus 2',
    descriptionUz: 'Rotavirus infeksiyasiga qarshi ikkinchi va yakuniy doza.',
    doseNumber: 2,
    totalDoses: 2,
    targetAgeMonths: 3,
    targetAgeLabel: '3 oylikda',
    isMandatory: true,
  },
  {
    key: 'pneumo-2',
    nameUz: 'Pnevmokokk 2',
    nameEn: 'Pneumococcal Conjugate 2',
    descriptionUz: 'Pnevmokokkga qarshi ikkinchi emlash dozasi.',
    doseNumber: 2,
    totalDoses: 3,
    targetAgeMonths: 3,
    targetAgeLabel: '3 oylikda',
    isMandatory: true,
  },
  {
    key: 'penta-3',
    nameUz: 'Pentavalent 3 (DTP-Hib-HepB)',
    nameEn: 'Pentavalent 3',
    descriptionUz: 'Bo\'g\'ma, qoqshol, ko\'kyo\'tal, gemofil va Gepatit B ga qarshi uchinchi doza.',
    doseNumber: 3,
    totalDoses: 3,
    targetAgeMonths: 4,
    targetAgeLabel: '4 oylikda',
    isMandatory: true,
  },
  {
    key: 'opv-3',
    nameUz: 'OPV 3 (Poliomiyelit)',
    nameEn: 'OPV 3',
    descriptionUz: 'Poliomiyelitga qarshi uchinchi doza.',
    doseNumber: 3,
    totalDoses: 4,
    targetAgeMonths: 4,
    targetAgeLabel: '4 oylikda',
    isMandatory: true,
  },
  {
    key: 'ipv-1',
    nameUz: 'IPV (Inaktivatsiyalangan poliomiyelit)',
    nameEn: 'Inactivated Polio Vaccine',
    descriptionUz: 'In\'eksiya shaklidagi xavfsiz inaktivatsiyalangan poliomiyelit vaksina.',
    doseNumber: 1,
    totalDoses: 1,
    targetAgeMonths: 4,
    targetAgeLabel: '4 oylikda',
    isMandatory: true,
  },
  {
    key: 'qpm-1',
    nameUz: 'QPM 1 (Qizamiq, Parotit, Qizilcha)',
    nameEn: 'MMR 1 (Measles, Mumps, Rubella)',
    descriptionUz: 'Qizamiq, tepki (parotit) va qizilchadan umrbod kuchli immunitet shakllantirish.',
    doseNumber: 1,
    totalDoses: 2,
    targetAgeMonths: 12,
    targetAgeLabel: '12 oylikda (1 yosh)',
    isMandatory: true,
  },
  {
    key: 'pneumo-3',
    nameUz: 'Pnevmokokk 3 (Revaksinatsiya)',
    nameEn: 'Pneumococcal Booster',
    descriptionUz: 'Pnevmokokkga qarshi quvvatlantiruvchi uchinchi revaksinatsiya dozasi.',
    doseNumber: 3,
    totalDoses: 3,
    targetAgeMonths: 12,
    targetAgeLabel: '12 oylikda (1 yosh)',
    isMandatory: true,
  },
  {
    key: 'dtp-revax',
    nameUz: 'DTP 4 (Revaksinatsiya)',
    nameEn: 'DTP Booster',
    descriptionUz: 'Bo\'g\'ma, qoqshol va ko\'kyo\'talga qarshi birinchi quvvatlantiruvchi doza.',
    doseNumber: 4,
    totalDoses: 4,
    targetAgeMonths: 16,
    targetAgeLabel: '16 oylikda',
    isMandatory: true,
  },
  {
    key: 'opv-4',
    nameUz: 'OPV 4 (Revaksinatsiya)',
    nameEn: 'OPV Booster',
    descriptionUz: 'Poliomiyelitga qarshi to\'rtinchi mustahkamlovchi doza.',
    doseNumber: 4,
    totalDoses: 4,
    targetAgeMonths: 16,
    targetAgeLabel: '16 oylikda',
    isMandatory: true,
  },
  {
    key: 'qpm-2',
    nameUz: 'QPM 2 (Revaksinatsiya)',
    nameEn: 'MMR 2',
    descriptionUz: 'Maktabga chiqish oldidan qizamiq, parotit va qizilchaga qarshi ikkinchi doza.',
    doseNumber: 2,
    totalDoses: 2,
    targetAgeMonths: 72, // 6 yosh
    targetAgeLabel: '6 yoshda',
    isMandatory: true,
  }
];

export function calculateDueDate(birthDateStr: string, targetAgeMonths: number): string {
  const birthDate = new Date(birthDateStr);
  const dueDate = new Date(birthDate);
  dueDate.setMonth(dueDate.getMonth() + targetAgeMonths);
  return dueDate.toISOString().split('T')[0];
}

export function buildInitialVaccineRecords(babyId: string, birthDateStr: string): VaccineRecord[] {
  const now = new Date();
  const currentDateStr = now.toISOString().split('T')[0];

  return NATIONAL_VACCINE_CALENDAR_UZ.map((template, idx) => {
    const dueDate = calculateDueDate(birthDateStr, template.targetAgeMonths);
    const isPastDue = dueDate < currentDateStr;

    // Default status logic based on target age vs baby's age:
    // Vaccines up to 4 months marked as 'olingan' for demonstration if baby is older than 4 months
    let status: VaccineStatus = 'kutilmoqda';
    let administeredDate: string | undefined = undefined;
    let batchNumber: string | undefined = undefined;
    let clinic: string | undefined = undefined;
    let doctorName: string | undefined = undefined;

    if (template.targetAgeMonths === 0) {
      status = 'olingan';
      administeredDate = calculateDueDate(birthDateStr, 0);
      batchNumber = `SER-${1000 + idx}`;
      clinic = '1-sonli Tug\'uruqxona';
      doctorName = 'Dr. Nodira Usmonova';
    } else if (template.targetAgeMonths <= 4) {
      // In sample data, baby is ~6 months old
      status = 'olingan';
      administeredDate = dueDate;
      batchNumber = `SER-${2000 + idx}`;
      clinic = '1-sonli Bolalar poliklinikasi';
      doctorName = 'Dr. Sayyora Karimova';
    } else {
      status = isPastDue ? 'muddati_otgan' : 'kutilmoqda';
    }

    return {
      id: `vac-${babyId}-${template.key}`,
      babyId,
      vaccineKey: template.key,
      nameUz: template.nameUz,
      nameEn: template.nameEn,
      descriptionUz: template.descriptionUz,
      doseNumber: template.doseNumber,
      totalDoses: template.totalDoses,
      targetAgeMonths: template.targetAgeMonths,
      targetAgeLabel: template.targetAgeLabel,
      dueDate,
      administeredDate,
      status,
      batchNumber,
      clinic,
      doctorName,
      isMandatoryNationalSchedule: template.isMandatory,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  });
}
