import React, { useState } from 'react';
import { VaccineRecord, VaccineStatus } from '../types/vaccine.ts';
import { VaccineCard } from '../components/VaccineCard.tsx';
import {
  Syringe,
  Search,
  Plus,
  ShieldCheck,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Info,
  Lock
} from 'lucide-react';

interface VaccinesPageProps {
  vaccines: VaccineRecord[];
  onSelectVaccine: (vaccine: VaccineRecord) => void;
  onOpenAddVaccine: () => void;
}

export const VaccinesPage: React.FC<VaccinesPageProps> = ({
  vaccines,
  onSelectVaccine,
  onOpenAddVaccine,
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('hammasi');
  const [searchQuery, setSearchQuery] = useState('');

  // Metrics
  const totalCount = vaccines.length;
  const verifiedCount = vaccines.filter(v => v.status === 'shifokor_tasdiqlagan').length;
  const completedCount = vaccines.filter(v => v.status === 'olingan').length;
  const upcomingCount = vaccines.filter(v => v.status === 'kutilmoqda').length;
  const notCompletedCount = vaccines.filter(v => v.status === 'muddati_otgan' || v.status === 'olinmagan').length;

  const totalDoneCount = verifiedCount + completedCount;
  const percentComplete = Math.round((totalDoneCount / Math.max(1, totalCount)) * 100);

  // Filtered vaccines
  const filtered = vaccines.filter((v) => {
    let matchesFilter = true;
    if (filterStatus === 'doctor_verified') {
      matchesFilter = v.status === 'shifokor_tasdiqlagan';
    } else if (filterStatus === 'completed') {
      matchesFilter = v.status === 'olingan';
    } else if (filterStatus === 'upcoming') {
      matchesFilter = v.status === 'kutilmoqda';
    } else if (filterStatus === 'not_completed') {
      matchesFilter = v.status === 'muddati_otgan' || v.status === 'olinmagan';
    }

    const q = searchQuery.toLowerCase();
    const matchesSearch =
      v.nameUz.toLowerCase().includes(q) ||
      v.nameEn.toLowerCase().includes(q) ||
      v.targetAgeLabel.toLowerCase().includes(q) ||
      v.descriptionUz.toLowerCase().includes(q);

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-5 pb-12">
      {/* Header & Stats Banner */}
      <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
                <Syringe className="w-4 h-4" />
              </div>
              <h2 className="text-lg font-bold text-slate-800">
                Emlash taqvimi va holati
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              O‘zbekiston Milliy Emlash Taqvimi bo‘yicha vaksinalar monitoringi
            </p>
          </div>

          <button
            onClick={onOpenAddVaccine}
            className="px-3.5 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Qo‘shimcha vaksina</span>
          </button>
        </div>

        {/* Immunization Progress Indicator */}
        <div className="p-3.5 rounded-2xl bg-sky-50/50 border border-sky-100 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-sky-900 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Umumiy emlash darajasi: {percentComplete}%</span>
            </span>
            <span className="text-slate-500">
              {verifiedCount} tasdiqlangan · {totalDoneCount}/{totalCount} olingan
            </span>
          </div>

          <div className="w-full bg-white rounded-full h-2.5 overflow-hidden border border-sky-200">
            <div
              className="bg-emerald-500 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${percentComplete}%` }}
            />
          </div>

          {/* Quick status counter cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-center text-xs">
            <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200">
              <span className="text-[10px] text-emerald-800 block font-semibold">Shifokor tasdiqlagan ✓</span>
              <strong className="text-emerald-950 font-bold text-sm">{verifiedCount}</strong>
            </div>
            <div className="p-2 rounded-xl bg-white border border-slate-200">
              <span className="text-[10px] text-slate-500 block font-semibold">Olingan (Completed)</span>
              <strong className="text-slate-800 font-bold text-sm">{completedCount}</strong>
            </div>
            <div className="p-2 rounded-xl bg-white border border-slate-200">
              <span className="text-[10px] text-slate-500 block font-semibold">Kutilmoqda (Upcoming)</span>
              <strong className="text-sky-700 font-bold text-sm">{upcomingCount}</strong>
            </div>
            <div className="p-2 rounded-xl bg-white border border-slate-200">
              <span className="text-[10px] text-slate-500 block font-semibold">Kechikkan / Olinmagan</span>
              <strong className="text-rose-700 font-bold text-sm">{notCompletedCount}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Parent Medical Security Notice */}
      <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center gap-2.5">
        <Lock className="w-4 h-4 text-slate-400 shrink-0" />
        <p className="text-[11px] leading-relaxed">
          <strong>Ota-ona eslatmasi:</strong> Vaksinani tibbiy tasdiqlash va imzolash faqat vakolatli pediatr shifokor tomonidan amalga oshiriladi. Ota-onalar emlash holatini kuzatishi va ko‘rishi mumkin.
        </p>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="space-y-3">
        {/* Search input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Vaksina nomi yoki yoshi bo‘yicha qidirish..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:border-sky-500 shadow-2xs"
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
          {[
            { id: 'hammasi', label: `Barchasi (${totalCount})` },
            { id: 'doctor_verified', label: `Shifokor tasdiqlagan ✓ (${verifiedCount})` },
            { id: 'upcoming', label: `Kutilmoqda (${upcomingCount})` },
            { id: 'completed', label: `Olingan (${completedCount})` },
            { id: 'not_completed', label: `Kechikkan / Olinmagan (${notCompletedCount})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterStatus(tab.id)}
              className={`px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap transition-all ${
                filterStatus === tab.id
                  ? 'bg-sky-600 text-white shadow-2xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Vaccines List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="p-8 rounded-3xl bg-white border border-slate-200 text-center space-y-2">
            <p className="text-xs text-slate-500">Hech qanday vaksina topilmadi</p>
            <button
              onClick={() => {
                setFilterStatus('hammasi');
                setSearchQuery('');
              }}
              className="text-xs text-sky-600 font-semibold"
            >
              Filtrni tozalash
            </button>
          </div>
        ) : (
          filtered.map((v) => (
            <VaccineCard
              key={v.id}
              vaccine={v}
              onClick={() => onSelectVaccine(v)}
              userRole="parent"
            />
          ))
        )}
      </div>

      {/* Educational Note */}
      <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200/70 text-xs text-amber-950 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <p className="text-[11px] leading-relaxed">
          Emlashdan oldin bolaning umumiy tana harorati me'yorda ekanligi va pediatr tomonidan ruxsat berilganligiga ishonch hosil qiling. Shifokor tasdiqlaganidan so‘ng profilingizga xabarnoma keladi.
        </p>
      </div>
    </div>
  );
};
