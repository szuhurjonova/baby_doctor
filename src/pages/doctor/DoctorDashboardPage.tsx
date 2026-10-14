import React from 'react';
import { DoctorProfile } from '../../types/user.ts';
import { BabyProfile } from '../../types/baby.ts';
import { VaccineRecord } from '../../types/vaccine.ts';
import { MedicalRecord } from '../../types/medical.ts';
import { calculateAge, formatDateUz, formatDateTimeUz } from '../../utils/dateUtils.ts';
import {
  Stethoscope,
  Users,
  ShieldCheck,
  Clock,
  ChevronRight,
  Plus,
  Activity,
  AlertTriangle,
  Building,
  CheckCircle2,
  Syringe,
  FileText
} from 'lucide-react';

interface DoctorDashboardPageProps {
  doctor: DoctorProfile;
  activeBaby: BabyProfile;
  babies: BabyProfile[];
  vaccines: VaccineRecord[];
  medicalRecords: MedicalRecord[];
  onSelectBaby: (babyId: string) => void;
  onNavigateTab: (tab: string) => void;
  onOpenVerifyModal: (vaccine: VaccineRecord) => void;
  onOpenAddMedicalModal: () => void;
}

export const DoctorDashboardPage: React.FC<DoctorDashboardPageProps> = ({
  doctor,
  activeBaby,
  babies,
  vaccines,
  medicalRecords,
  onSelectBaby,
  onNavigateTab,
  onOpenVerifyModal,
  onOpenAddMedicalModal,
}) => {
  const age = calculateAge(activeBaby.birthDate);
  const pendingVaccines = vaccines.filter(v => v.status === 'kutilmoqda' || v.status === 'muddati_otgan');
  const verifiedVaccines = vaccines.filter(v => v.status === 'shifokor_tasdiqlagan');

  return (
    <div className="space-y-5 pb-12">
      {/* Doctor Header Banner */}
      <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-emerald-800 via-teal-800 to-slate-900 text-white shadow-md space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-white/10 ring-2 ring-emerald-400/40 flex items-center justify-center shrink-0 text-emerald-300">
              <Stethoscope className="w-7 h-7" />
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl font-bold font-display">{doctor.fullName}</h2>
                <span className="font-mono text-[10px] bg-emerald-500/30 text-emerald-200 px-2 py-0.5 rounded-md border border-emerald-400/30 font-bold">
                  ID: {doctor.doctorId}
                </span>
              </div>

              {/* Clean unboxed metadata with typographic separators */}
              <div className="flex items-center gap-2 text-xs text-emerald-200/90 flex-wrap">
                <span>{doctor.specialty}</span>
                <span aria-hidden="true">·</span>
                <span>{doctor.clinic}</span>
                <span aria-hidden="true">·</span>
                <span>Litsenziya: {doctor.licenseNumber}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigateTab('profile')}
            className="px-3.5 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-semibold border border-white/20 transition-colors self-stretch sm:self-auto text-center"
          >
            Shifokor profili
          </button>
        </div>

        {/* Clinical Statistics Counter Cards */}
        <div className="grid grid-cols-3 gap-2.5 pt-2 border-t border-white/15 text-center">
          <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-xs">
            <span className="text-[10px] text-emerald-200 block">Biriktirilgan bemorlar</span>
            <strong className="text-lg font-bold text-white font-display">{babies.length}</strong>
          </div>
          <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-xs">
            <span className="text-[10px] text-emerald-200 block">Tasdiqlangan vaksinalar</span>
            <strong className="text-lg font-bold text-emerald-300 font-display">{doctor.verifiedBadgesCount}</strong>
          </div>
          <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-xs">
            <span className="text-[10px] text-emerald-200 block">Kutilayotgan emlashlar</span>
            <strong className="text-lg font-bold text-amber-300 font-display">{pendingVaccines.length}</strong>
          </div>
        </div>
      </div>

      {/* Active Patient Bar & Switcher */}
      <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-emerald-600" />
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Tanlangan bemor bola:
            </h3>
          </div>
          <button
            onClick={() => onNavigateTab('patients')}
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
          >
            <span>Bemorlar ro‘yxati</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {babies.map((b) => {
            const isSelected = b.id === activeBaby.id;
            const bAge = calculateAge(b.birthDate);
            return (
              <button
                key={b.id}
                onClick={() => onSelectBaby(b.id)}
                className={`flex items-center gap-2.5 p-2 px-3 rounded-2xl border transition-all text-left ${
                  isSelected
                    ? 'bg-emerald-50 border-emerald-400 text-emerald-950 shadow-xs ring-1 ring-emerald-300'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs text-white ${
                    b.gender === 'ogil' ? 'bg-sky-500' : 'bg-pink-500'
                  }`}
                >
                  {b.fullName.charAt(0)}
                </div>
                <div>
                  <div className="text-xs font-bold">{b.fullName}</div>
                  <div className="text-[10px] text-slate-500">{bAge.formattedUz} · {b.bloodType}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Vaccination Verification Queue for Active Patient */}
      <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <Syringe className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800">
                Emlash navbati va tasdiqlash ({activeBaby.fullName})
              </h3>
              <p className="text-xs text-slate-500">
                Shifokor ko‘rigidan so‘ng vaksinani tasdiqlang
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigateTab('vaccines')}
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800"
          >
            Barchasi ({vaccines.length})
          </button>
        </div>

        {pendingVaccines.length === 0 ? (
          <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-200 text-center text-xs text-emerald-800">
            Ushbu bemorda tasdiqlash kutilayotgan vaksinalar yo‘q. Barcha yoshiga mos vaksinalar tasdiqlangan.
          </div>
        ) : (
          <div className="space-y-2.5">
            {pendingVaccines.slice(0, 3).map((v) => (
              <div
                key={v.id}
                className="p-3.5 rounded-2xl border border-slate-200/80 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-white hover:shadow-xs transition-all"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <strong className="text-xs sm:text-sm text-slate-800">{v.nameUz}</strong>
                    <span className="text-[10px] bg-amber-100 text-amber-900 px-1.5 py-0.2 rounded-md font-semibold">
                      {v.targetAgeLabel}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500">
                    Reja sanasi: <strong>{formatDateUz(v.dueDate)}</strong> · Doza {v.doseNumber}/{v.totalDoses || 1}
                  </div>
                </div>

                {/* Direct Doctor Verify Button */}
                <button
                  onClick={() => onOpenVerifyModal(v)}
                  className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-colors shrink-0"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Vaksinani tasdiqlash</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Clinical Examination Action */}
      <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800">
                Shifokor ko‘rigi qaydini kiritish
              </h3>
              <p className="text-xs text-slate-500">
                Profilaktik ko‘rik, tashxis va tavsiyanomalarni bemor kartasiga yozing
              </p>
            </div>
          </div>

          <button
            onClick={onOpenAddMedicalModal}
            className="px-3.5 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Ko‘rik qo‘shish</span>
          </button>
        </div>

        {medicalRecords.length > 0 && (
          <div className="text-xs text-slate-600 pt-1">
            So‘nggi ko‘rik: <strong>{medicalRecords[0].title}</strong> ({formatDateUz(medicalRecords[0].visitDate)}) — Tashxis: {medicalRecords[0].diagnosis}
          </div>
        )}
      </div>

      {/* Verified Vaccines by this Doctor */}
      <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <h3 className="text-sm font-bold text-slate-800">
              Shifokor tomonidan tasdiqlangan vaksinalar ({verifiedVaccines.length})
            </h3>
          </div>
        </div>

        <div className="space-y-2">
          {verifiedVaccines.slice(0, 3).map((v) => (
            <div
              key={v.id}
              className="p-3 rounded-2xl bg-emerald-50/40 border border-emerald-200/70 flex items-center justify-between text-xs"
            >
              <div>
                <strong className="text-emerald-950">{v.nameUz}</strong>
                <div className="text-[11px] text-slate-500">
                  Emlangan: {formatDateUz(v.administeredDate)} · Seriya: {v.batchNumber}
                </div>
              </div>

              {v.doctorVerification && (
                <span className="font-mono text-[10px] bg-white border border-emerald-300 text-emerald-800 px-2 py-1 rounded-lg font-bold">
                  {v.doctorVerification.stampCode}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
