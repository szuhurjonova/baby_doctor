import React, { useState } from 'react';
import { BabyProfile } from '../../types/baby.ts';
import { calculateAge, formatDateUz } from '../../utils/dateUtils.ts';
import {
  Users,
  Search,
  Plus,
  Check,
  Calendar,
  Heart,
  Scale,
  Ruler,
  Activity,
  ChevronRight,
  FileText,
  Syringe,
  AlertTriangle
} from 'lucide-react';

interface DoctorPatientsPageProps {
  babies: BabyProfile[];
  activeBabyId: string;
  onSelectBaby: (id: string) => void;
  onOpenAddNewPatient: () => void;
  onNavigateToVaccines: () => void;
  onNavigateToMedical: () => void;
}

export const DoctorPatientsPage: React.FC<DoctorPatientsPageProps> = ({
  babies,
  activeBabyId,
  onSelectBaby,
  onOpenAddNewPatient,
  onNavigateToVaccines,
  onNavigateToMedical,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = babies.filter((b) => {
    const q = searchQuery.toLowerCase();
    return (
      b.fullName.toLowerCase().includes(q) ||
      b.bloodType.toLowerCase().includes(q) ||
      (b.medicalInsuranceOrId && b.medicalInsuranceOrId.toLowerCase().includes(q))
    );
  });

  const activeBaby = babies.find(b => b.id === activeBabyId) || babies[0];
  const activeAge = calculateAge(activeBaby.birthDate);

  return (
    <div className="space-y-5 pb-12">
      {/* Header */}
      <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
              <h2 className="text-lg font-bold text-slate-800">
                Biriktirilgan bemor bolalar ro‘yxati
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Poliklinika hududidagi chaqaloqlar va ularning tibbiy kartalari
            </p>
          </div>

          <button
            onClick={onOpenAddNewPatient}
            className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Yangi bemor qo‘shish</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Bemor ismi, qon guruhi yoki tibbiy karta raqami bo‘yicha qidirish..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:border-emerald-500 shadow-2xs"
          />
        </div>
      </div>

      {/* Selected Patient Spotlight Card */}
      {activeBaby && (
        <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200/80 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-200/60 px-2.5 py-1 rounded-full">
              Hozir ko‘rilayotgan bemor kartasi
            </span>
            <div className="flex gap-2">
              <button
                onClick={onNavigateToVaccines}
                className="px-3 py-1.5 rounded-xl bg-white text-emerald-800 border border-emerald-300 text-xs font-bold flex items-center gap-1.5 hover:bg-emerald-100/50"
              >
                <Syringe className="w-3.5 h-3.5" />
                <span>Vaksinalari</span>
              </button>
              <button
                onClick={onNavigateToMedical}
                className="px-3 py-1.5 rounded-xl bg-white text-emerald-800 border border-emerald-300 text-xs font-bold flex items-center gap-1.5 hover:bg-emerald-100/50"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Tibbiy tarixi</span>
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-xl text-white shadow-sm ${
                  activeBaby.gender === 'ogil' ? 'bg-sky-500' : 'bg-pink-500'
                }`}
              >
                {activeBaby.fullName.charAt(0)}
              </div>
              <div className="space-y-0.5">
                <h3 className="text-base font-bold text-slate-900">{activeBaby.fullName}</h3>
                <div className="text-xs text-slate-600 flex items-center gap-2 flex-wrap">
                  <span>{activeAge.formattedUz}</span>
                  <span aria-hidden="true">·</span>
                  <span>{activeBaby.gender === 'ogil' ? 'O‘g‘il bola' : 'Qiz bola'}</span>
                  <span aria-hidden="true">·</span>
                  <span>Qon guruhi: <strong>{activeBaby.bloodType}</strong></span>
                </div>
                <div className="text-[11px] text-slate-500 font-mono">
                  ID: {activeBaby.medicalInsuranceOrId || 'MED-UZB-2026-8849'}
                </div>
              </div>
            </div>

            {/* Vitals summary */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2 rounded-xl bg-white border border-emerald-200">
                <span className="text-[10px] text-slate-400 block">Vazn</span>
                <strong className="text-slate-800 font-bold">{activeBaby.currentWeightKg} kg</strong>
              </div>
              <div className="p-2 rounded-xl bg-white border border-emerald-200">
                <span className="text-[10px] text-slate-400 block">Bo‘yi</span>
                <strong className="text-slate-800 font-bold">{activeBaby.currentHeightCm} sm</strong>
              </div>
              <div className="p-2 rounded-xl bg-white border border-emerald-200">
                <span className="text-[10px] text-slate-400 block">Bosh aylanasi</span>
                <strong className="text-slate-800 font-bold">{activeBaby.currentHeadCircumferenceCm} sm</strong>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Patient Directory List */}
      <div className="space-y-2.5">
        <h3 className="text-xs font-bold text-slate-600 uppercase tracking-wider px-1">
          Barcha bemorlar ({filtered.length})
        </h3>

        {filtered.map((b) => {
          const isSelected = b.id === activeBabyId;
          const bAge = calculateAge(b.birthDate);
          return (
            <div
              key={b.id}
              onClick={() => onSelectBaby(b.id)}
              className={`p-4 rounded-3xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                isSelected
                  ? 'bg-white border-emerald-500 shadow-sm ring-1 ring-emerald-300'
                  : 'bg-white border-slate-200/80 hover:border-slate-300 hover:bg-slate-50/50'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <div
                  className={`w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-sm text-white shrink-0 ${
                    b.gender === 'ogil' ? 'bg-sky-500' : 'bg-pink-500'
                  }`}
                >
                  {b.fullName.charAt(0)}
                </div>

                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-slate-900">{b.fullName}</h4>
                    {isSelected && (
                      <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">
                        <Check className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-500 flex items-center gap-2">
                    <span>{bAge.formattedUz}</span>
                    <span aria-hidden="true">·</span>
                    <span>Tug‘ilgan sana: {formatDateUz(b.birthDate)}</span>
                    <span aria-hidden="true">·</span>
                    <span>{b.bloodType}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-auto text-xs text-slate-600">
                <span className="font-semibold text-emerald-700">Tanlash</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
