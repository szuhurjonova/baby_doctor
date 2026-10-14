import React, { useState } from 'react';
import { BabyProfile } from '../types/baby.ts';
import { VaccineRecord } from '../types/vaccine.ts';
import { MedicalRecord } from '../types/medical.ts';
import { AllergyRecord } from '../types/allergy.ts';
import { ReminderItem, GrowthRecord } from '../types/growth.ts';
import { calculateAge, formatDateUz, getVaccineStatusInfo } from '../utils/dateUtils.ts';
import { evaluateWeightForAge } from '../services/growthStandards.ts';
import { MedicalDisclaimerBanner } from '../components/MedicalDisclaimerBanner.tsx';
import heroImg from '../assets/baby-doctor-hero.jpg';
import {
  Scale,
  Ruler,
  Activity,
  Syringe,
  AlertTriangle,
  FileText,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Plus,
  Clock,
  ShieldCheck,
  PhoneCall,
  Bell,
  Check
} from 'lucide-react';

interface DashboardPageProps {
  baby: BabyProfile;
  vaccines: VaccineRecord[];
  medicalRecords: MedicalRecord[];
  allergies: AllergyRecord[];
  reminders: ReminderItem[];
  growthRecords: GrowthRecord[];
  onNavigateTab: (tab: any) => void;
  onOpenAddGrowth: () => void;
  onOpenAddMedical: () => void;
  onOpenAddAllergy: () => void;
  onSelectVaccine: (v: VaccineRecord) => void;
  onToggleReminder: (id: string) => void;
  onOpenAddReminder: () => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  baby,
  vaccines,
  medicalRecords,
  allergies,
  reminders,
  growthRecords,
  onNavigateTab,
  onOpenAddGrowth,
  onOpenAddMedical,
  onOpenAddAllergy,
  onSelectVaccine,
  onToggleReminder,
  onOpenAddReminder,
}) => {
  const age = calculateAge(baby.birthDate);
  const weightEval = evaluateWeightForAge(age.months, baby.currentWeightKg, baby.gender);

  // Vaccines metrics
  const receivedCount = vaccines.filter(v => v.status === 'olingan').length;
  const overdueCount = vaccines.filter(v => v.status === 'muddati_otgan').length;
  const pendingVaccines = vaccines.filter(v => v.status === 'kutilmoqda' || v.status === 'muddati_otgan');
  const nextVaccine = pendingVaccines.length > 0 ? pendingVaccines[0] : null;

  // Active reminders
  const activeReminders = reminders.filter(r => !r.isCompleted);

  return (
    <div className="space-y-5 pb-12">
      {/* Hero Welcome Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sky-500 via-sky-600 to-sky-700 text-white p-5 sm:p-6 shadow-md">
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-md">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-xs font-semibold text-sky-50 border border-white/25">
              <ShieldCheck className="w-3.5 h-3.5 text-sky-200" />
              <span>Salomatlik nazorati faol</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black font-display tracking-tight text-white">
              {baby.fullName}
            </h2>

            {/* Unboxed metadata with typographic separators */}
            <div className="flex items-center gap-2 text-xs sm:text-sm text-sky-100 flex-wrap font-medium">
              <span>{age.formattedUz}</span>
              <span aria-hidden="true">·</span>
              <span>{baby.gender === 'ogil' ? 'O‘g‘il bola' : 'Qiz bola'}</span>
              <span aria-hidden="true">·</span>
              <span>Qon guruhi: {baby.bloodType}</span>
            </div>

            <p className="text-xs text-sky-100/90 pt-1 leading-relaxed">
              Pediatr: <strong>{baby.pediatricianName}</strong> ({baby.clinicName})
            </p>
          </div>

          {/* Baby Doctor mascot hero illustration */}
          <div className="shrink-0 flex items-center justify-center">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-white/10 ring-4 ring-white/25 shadow-lg">
              <img
                src={heroImg}
                alt="Baby Doctor"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Subtle decorative circles */}
        <div className="absolute -top-12 -right-12 w-44 h-44 rounded-full bg-white/10 blur-xl pointer-events-none" />
        <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-sky-400/20 blur-lg pointer-events-none" />
      </div>

      {/* Quick Physical Parameters & Growth Cards */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <Activity className="w-4 h-4 text-sky-600" />
            <span>Joriy o‘sish ko‘rsatkichlari</span>
          </h3>
          <button
            onClick={onOpenAddGrowth}
            className="text-xs font-semibold text-sky-600 hover:text-sky-700 flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>O‘lchov qo‘shish</span>
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2.5 sm:gap-3.5">
          {/* Weight */}
          <div
            onClick={() => onNavigateTab('baby')}
            className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:border-sky-300 hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-[11px] font-semibold text-slate-500">Vazn</span>
              <Scale className="w-4 h-4 text-sky-500" />
            </div>
            <div>
              <div className="text-lg sm:text-xl font-bold text-slate-900 font-display">
                {baby.currentWeightKg} <span className="text-xs font-normal text-slate-500">kg</span>
              </div>
              <div className="text-[10px] text-emerald-700 font-medium mt-0.5 truncate">
                {weightEval.labelUz.includes("me'yorda") ? "Me'yorda (JSST)" : weightEval.percentileApprox}
              </div>
            </div>
          </div>

          {/* Height */}
          <div
            onClick={() => onNavigateTab('baby')}
            className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:border-sky-300 hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-[11px] font-semibold text-slate-500">Bo‘yi</span>
              <Ruler className="w-4 h-4 text-amber-500" />
            </div>
            <div>
              <div className="text-lg sm:text-xl font-bold text-slate-900 font-display">
                {baby.currentHeightCm} <span className="text-xs font-normal text-slate-500">sm</span>
              </div>
              <div className="text-[10px] text-slate-500 font-medium mt-0.5">
                +{Math.round((baby.currentHeightCm - baby.birthHeightCm) * 10) / 10} sm tug‘ilgandan
              </div>
            </div>
          </div>

          {/* Head Circumference */}
          <div
            onClick={() => onNavigateTab('baby')}
            className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:border-sky-300 hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-[11px] font-semibold text-slate-500">Bosh aylanasi</span>
              <Activity className="w-4 h-4 text-rose-500" />
            </div>
            <div>
              <div className="text-lg sm:text-xl font-bold text-slate-900 font-display">
                {baby.currentHeadCircumferenceCm} <span className="text-xs font-normal text-slate-500">sm</span>
              </div>
              <div className="text-[10px] text-slate-500 font-medium mt-0.5">
                +{Math.round((baby.currentHeadCircumferenceCm - baby.birthHeadCircumferenceCm) * 10) / 10} sm
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vaccine Schedule Spotlight Card */}
      <div className="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200/80 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
              <Syringe className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800">
                Emlash holati (Milliy taqvim)
              </h3>
              <p className="text-xs text-slate-500">
                {receivedCount} ta vaksina olingan · {vaccines.length - receivedCount} ta qolgan
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigateTab('vaccines')}
            className="text-xs font-semibold text-sky-600 hover:text-sky-700 flex items-center gap-1"
          >
            <span>Barchasi</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="space-y-1">
          <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-emerald-500 h-2.5 rounded-full transition-all duration-500"
              style={{
                width: `${Math.round((receivedCount / Math.max(1, vaccines.length)) * 100)}%`,
              }}
            />
          </div>
          <div className="flex justify-between text-[11px] text-slate-500">
            <span>Bajarildi: {Math.round((receivedCount / Math.max(1, vaccines.length)) * 100)}%</span>
            {overdueCount > 0 ? (
              <span className="text-rose-600 font-semibold">{overdueCount} ta muddati o‘tgan!</span>
            ) : (
              <span className="text-emerald-600 font-medium">Reja bo‘yicha ketmoqda</span>
            )}
          </div>
        </div>

        {/* Next upcoming vaccine banner */}
        {nextVaccine && (
          <div
            onClick={() => onSelectVaccine(nextVaccine)}
            className="p-3 rounded-2xl bg-sky-50/70 border border-sky-200/60 flex items-center justify-between gap-3 cursor-pointer hover:bg-sky-100/60 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-sky-500 text-white flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <div className="font-bold text-slate-800">{nextVaccine.nameUz}</div>
                <div className="text-[11px] text-slate-600">
                  Rejalashtirilgan sana: <strong>{formatDateUz(nextVaccine.dueDate)}</strong> ({nextVaccine.targetAgeLabel})
                </div>
              </div>
            </div>
            <span className="text-xs font-bold text-sky-700 shrink-0">Ko‘rish</span>
          </div>
        )}
      </div>

      {/* Allergies Alert Banner */}
      {allergies.length > 0 && (
        <div
          onClick={() => onNavigateTab('allergies')}
          className="p-4 rounded-3xl bg-amber-50/80 border border-amber-200/80 shadow-2xs cursor-pointer hover:bg-amber-100/60 transition-colors space-y-2"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-amber-200/80 text-amber-800 flex items-center justify-center">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-amber-950">
                  Qayd etilgan allergiyalar ({allergies.length})
                </h4>
                <p className="text-[11px] text-amber-800">
                  Bolada oziq-ovqat yoki dorilar ta'siri kuzatilgan
                </p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-amber-700" />
          </div>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {allergies.map(a => (
              <span
                key={a.id}
                className="text-xs px-2.5 py-1 rounded-xl bg-white/80 border border-amber-300 text-amber-900 font-medium"
              >
                {a.allergen} ({a.severity})
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Recent Medical Records / Pediatric Checkups */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <FileText className="w-4 h-4 text-sky-600" />
            <span>So‘nggi shifokor ko‘riklari</span>
          </h3>
          <button
            onClick={() => onNavigateTab('medical')}
            className="text-xs font-semibold text-sky-600 hover:text-sky-700 flex items-center gap-1"
          >
            <span>Barchasi</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {medicalRecords.length === 0 ? (
          <div className="p-6 rounded-3xl bg-white border border-slate-200/70 text-center space-y-2">
            <p className="text-xs text-slate-500">Hozircha tibbiy qaydlar kiritilmagan</p>
            <button
              onClick={onOpenAddMedical}
              className="px-3.5 py-1.5 rounded-xl bg-sky-50 text-sky-700 text-xs font-bold hover:bg-sky-100"
            >
              Ko‘rik natijasini qo‘shish
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            {medicalRecords.slice(0, 2).map((rec) => (
              <div
                key={rec.id}
                onClick={() => onNavigateTab('medical')}
                className="p-3.5 rounded-2xl bg-white border border-slate-200/70 shadow-2xs hover:border-sky-300 hover:shadow-xs transition-all cursor-pointer space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-800">{rec.title}</h4>
                  <span className="text-[11px] text-slate-500">{formatDateUz(rec.visitDate)}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <span>{rec.doctorName} ({rec.specialty})</span>
                  <span aria-hidden="true">·</span>
                  <span>{rec.clinic}</span>
                </div>
                <div className="text-xs text-sky-900 font-medium bg-sky-50/50 p-2 rounded-xl">
                  Tashxis: {rec.diagnosis}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Reminders / Notification Checklist */}
      <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800">Eslatmalar</h3>
              <p className="text-xs text-slate-500">Vaksinalar va dori qabul qilish vaqtlari</p>
            </div>
          </div>
          <button
            onClick={onOpenAddReminder}
            className="text-xs font-semibold text-sky-600 hover:text-sky-700 flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Qo‘shish</span>
          </button>
        </div>

        {activeReminders.length === 0 ? (
          <p className="text-xs text-slate-400 italic py-2 text-center">Barcha eslatmalar bajarilgan</p>
        ) : (
          <div className="space-y-2">
            {activeReminders.slice(0, 3).map((r) => (
              <div
                key={r.id}
                className="p-3 rounded-2xl bg-slate-50/70 border border-slate-200/60 flex items-start justify-between gap-3"
              >
                <div className="space-y-0.5 text-xs">
                  <div className="font-bold text-slate-800">{r.title}</div>
                  <div className="text-[11px] text-slate-500">{r.description}</div>
                  <div className="text-[10px] text-sky-700 font-medium">Muddati: {formatDateUz(r.dueDate)}</div>
                </div>

                <button
                  onClick={() => onToggleReminder(r.id)}
                  className="w-7 h-7 rounded-xl bg-white border border-slate-300 hover:border-emerald-500 hover:bg-emerald-50 flex items-center justify-center text-slate-400 hover:text-emerald-600 transition-colors shrink-0"
                  title="Bajarildi deb belgilash"
                >
                  <Check className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Required MedTech Disclaimer Notice */}
      <MedicalDisclaimerBanner compact={true} />
    </div>
  );
};
