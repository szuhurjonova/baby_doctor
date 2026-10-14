import { VaccineStatus } from '../types/vaccine.ts';

export function calculateAge(birthDateStr: string): { months: number; days: number; years: number; formattedUz: string } {
  const birth = new Date(birthDateStr);
  const now = new Date(); // In 2026

  let years = now.getFullYear() - birth.getFullYear();
  let months = now.getMonth() - birth.getMonth();
  let days = now.getDate() - birth.getDate();

  if (days < 0) {
    months -= 1;
    const prevMonthLastDay = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    days += prevMonthLastDay;
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const totalMonths = years * 12 + months;

  let formattedUz = '';
  if (years >= 1) {
    formattedUz = `${years} yosh ${months > 0 ? `${months} oylik` : ''}`.trim();
  } else if (months >= 1) {
    formattedUz = `${months} oylik ${days > 0 ? `(${days} kun)` : ''}`.trim();
  } else {
    formattedUz = `${Math.max(1, days)} kunlik`;
  }

  return { months: totalMonths, days, years, formattedUz };
}

const UZ_MONTH_NAMES = [
  'yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun',
  'iyul', 'avgust', 'sentabr', 'oktabr', 'noyabr', 'dekabr'
];

export function formatDateUz(dateStr?: string): string {
  if (!dateStr) return '—';
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    const day = d.getDate();
    const month = UZ_MONTH_NAMES[d.getMonth()];
    const year = d.getFullYear();
    return `${day}-${month}, ${year}`;
  } catch {
    return dateStr;
  }
}

export function formatDateTimeUz(isoStr?: string): string {
  if (!isoStr) return '—';
  try {
    const d = new Date(isoStr);
    if (isNaN(d.getTime())) return isoStr;
    const day = d.getDate();
    const month = UZ_MONTH_NAMES[d.getMonth()];
    const year = d.getFullYear();
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    return `${day}-${month}, ${year} ${hours}:${minutes}`;
  } catch {
    return isoStr;
  }
}

export function formatShortDateUz(dateStr?: string): string {
  if (!dateStr) return '—';
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    return `${day}.${month}.${d.getFullYear()}`;
  } catch {
    return dateStr;
  }
}

export function getVaccineStatusInfo(status: VaccineStatus): {
  label: string;
  badgeBg: string;
  textColor: string;
  borderColor: string;
  iconName: string;
} {
  switch (status) {
    case 'shifokor_tasdiqlagan':
      return {
        label: 'Shifokor tasdiqlagan ✓',
        badgeBg: 'bg-emerald-100/80',
        textColor: 'text-emerald-900',
        borderColor: 'border-emerald-300',
        iconName: 'ShieldCheck',
      };
    case 'olingan':
      return {
        label: 'Olingan',
        badgeBg: 'bg-emerald-50',
        textColor: 'text-emerald-700',
        borderColor: 'border-emerald-200',
        iconName: 'CheckCircle2',
      };
    case 'kutilmoqda':
      return {
        label: 'Kutilmoqda',
        badgeBg: 'bg-sky-50',
        textColor: 'text-sky-700',
        borderColor: 'border-sky-200',
        iconName: 'Clock',
      };
    case 'muddati_otgan':
      return {
        label: 'Muddati o‘tgan',
        badgeBg: 'bg-rose-50',
        textColor: 'text-rose-700',
        borderColor: 'border-rose-200',
        iconName: 'AlertTriangle',
      };
    case 'olinmagan':
    default:
      return {
        label: 'Olinmagan',
        badgeBg: 'bg-slate-100',
        textColor: 'text-slate-600',
        borderColor: 'border-slate-200',
        iconName: 'Circle',
      };
  }
}
