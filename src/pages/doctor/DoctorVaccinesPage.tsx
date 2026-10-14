import React, { useState } from 'react';
import { VaccineRecord, VaccineStatus } from '../../types/vaccine.ts';
import { BabyProfile } from '../../types/baby.ts';
import { VaccineCard } from '../../components/VaccineCard.tsx';
import { formatDateUz } from '../../utils/dateUtils.ts';
import {
  Syringe,
  Search,
  Plus,
  ShieldCheck,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Users
} from 'lucide-react';

interface DoctorVaccinesPageProps {
  vaccines: VaccineRecord[];
  baby: BabyProfile;
  onOpenVerifyModal: (vaccine: VaccineRecord) => void;
  onSelectVaccineDetails: (vaccine: VaccineRecord) => void;
  onOpenAddCustomVaccine: () => void;
}

export const DoctorVaccinesPage: React.FC<DoctorVaccinesPageProps> = ({
  vaccines,
  baby,
  onOpenVerifyModal,
  onSelectVaccineDetails,
  onOpenAddCustomVaccine,
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const verifiedCount = vaccines.filter(v => v.status === 'shifokor_tasdiqlagan').length;
  const pendingCount = vaccines.filter(v => v.status === 'kutilmoqda' || v.status === 'muddati_otgan').length;

  const filtered = vaccines.filter((v) => {
    const matchesFilter =
      filterStatus === 'all'
        ? true
        : filterStatus === 'verified'
        ? v.status === 'shifokor_tasdiqlagan'
        : filterStatus === 'pending'
        ? v.status === 'kutilmoqda' || v.status === 'muddati_otgan'
        : v.status === filterStatus;

    const q = searchQuery.toLowerCase();
    const matchesSearch =
      v.nameUz.toLowerCase().includes(q) ||
      v.nameEn.toLowerCase().includes(q) ||
      v.targetAgeLabel.toLowerCase().includes(q);

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-5 pb-12">
      {/* Header */}
      <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <Syringe className="w-4 h-4" />
              </div>
              <h2 className="text-lg font-bold text-slate-800">
                Emlash nazorati va tasdiqlash
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Bemor: <strong className="text-slate-800">{baby.fullName}</strong> ({baby.gender === 'ogil' ? 'O‘g‘il' : 'Qiz'}, {baby.bloodType})
            </p>
          </div>

          <button
            onClick={onOpenAddCustomVaccine}
            className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Qo‘shimcha vaksina</span>
          </button>
        </div>

        {/* Doctor Verification Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1 text-center text-xs">
          <div className="p-2.5 rounded-2xl bg-emerald-50/70 border border-emerald-200">
            <span className="text-[10px] text-emerald-700 block font-semibold">Tasdiqlangan vaksinalar</span>
            <strong className="text-base text-emerald-950 font-bold">{verifiedCount} ta</strong>
          </div>

          <div className="p-2.5 rounded-2xl bg-amber-50/70 border border-amber-200">
            <span className="text-[10px] text-amber-700 block font-semibold">Tasdiq kutilayotgan</span>
            <strong className="text-base text-amber-950 font-bold">{pendingCount} ta</strong>
          </div>

          <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200 col-span-2 sm:col-span-1">
            <span className="text-[10px] text-slate-500 block font-semibold">Jami taqvim bo‘yicha</span>
            <strong className="text-base text-slate-800 font-bold">{vaccines.length} ta</strong>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Vaksina nomi bo‘yicha qidirish..."
            className="w-full pl-10 pr-4 py-2 rounded-2xl bg-white border border-slate-200 text-xs text-slate-800 focus:outline-hidden focus:border-emerald-500 shadow-2xs"
          />
        </div>

        {/* Filter controls */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
          {[
            { id: 'all', label: `Barchasi (${vaccines.length})` },
            { id: 'pending', label: `Tasdiq kutilmoqda (${pendingCount})` },
            { id: 'verified', label: `Shifokor tasdiqlagan ✓ (${verifiedCount})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterStatus(tab.id)}
              className={`px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap transition-all ${
                filterStatus === tab.id
                  ? 'bg-emerald-700 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Vaccines list with verification action */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="p-8 rounded-3xl bg-white border border-slate-200 text-center space-y-2">
            <p className="text-xs text-slate-500">Hech qanday vaksina topilmadi</p>
          </div>
        ) : (
          filtered.map((v) => (
            <VaccineCard
              key={v.id}
              vaccine={v}
              onClick={() => onSelectVaccineDetails(v)}
              userRole="doctor"
              onDoctorVerifyClick={() => onOpenVerifyModal(v)}
            />
          ))
        )}
      </div>
    </div>
  );
};
