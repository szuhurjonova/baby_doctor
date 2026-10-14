import React, { useState } from 'react';
import { VaccineRecord } from '../types/vaccine.ts';
import { getVaccineStatusInfo, formatDateUz, formatDateTimeUz } from '../utils/dateUtils.ts';
import { X, ShieldCheck, Clock, AlertTriangle, Building, Info, Lock } from 'lucide-react';

interface ParentVaccineModalProps {
  vaccine: VaccineRecord | null;
  isOpen: boolean;
  onClose: () => void;
  onSaveParentNotes: (vaccineId: string, notes: string) => void;
}

export const ParentVaccineModal: React.FC<ParentVaccineModalProps> = ({
  vaccine,
  isOpen,
  onClose,
  onSaveParentNotes,
}) => {
  if (!isOpen || !vaccine) return null;

  const [parentNotes, setParentNotes] = useState(vaccine.notes || '');
  const statusInfo = getVaccineStatusInfo(vaccine.status);
  const isVerified = vaccine.status === 'shifokor_tasdiqlagan' && !!vaccine.doctorVerification;

  const handleSaveNotes = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveParentNotes(vaccine.id, parentNotes.trim());
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-lg bg-white rounded-3xl p-5 sm:p-6 shadow-2xl border border-slate-100 max-h-[90vh] flex flex-col my-auto">
        {/* Header */}
        <div className="flex items-start justify-between pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-bold text-slate-800">
                {vaccine.nameUz}
              </h3>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${statusInfo.badgeBg} ${statusInfo.textColor} ${statusInfo.borderColor}`}
              >
                {statusInfo.label}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {vaccine.nameEn} · Doza {vaccine.doseNumber}/{vaccine.totalDoses || 1}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal content */}
        <div className="py-4 overflow-y-auto space-y-4 flex-1">
          {/* Official Doctor Verification Seal if verified */}
          {isVerified && vaccine.doctorVerification ? (
            <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-300 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-emerald-950 font-bold text-xs sm:text-sm">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Rasmiy tibbiy tasdiq ✓</span>
                </div>
                <span className="font-mono text-[10px] bg-emerald-200/80 text-emerald-900 px-2 py-0.5 rounded-md font-bold">
                  {vaccine.doctorVerification.stampCode}
                </span>
              </div>

              <p className="text-xs text-emerald-900 leading-relaxed">
                Ushbu vaksina vakolatli pediatr shifokor <strong>{vaccine.doctorVerification.doctorName}</strong> ({vaccine.doctorVerification.doctorSpecialty}) tomonidan tekshirilib, rasmiy tasdiqlangan.
              </p>

              <div className="p-2.5 rounded-xl bg-white/90 border border-emerald-200 text-[11px] text-slate-700 space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-500">Tibbiy muassasa:</span>
                  <strong>{vaccine.doctorVerification.clinic}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Emlangan sana:</span>
                  <span>{formatDateUz(vaccine.administeredDate)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Seriya raqami:</span>
                  <span className="font-mono">{vaccine.doctorVerification.batchNumber || vaccine.batchNumber}</span>
                </div>
                {vaccine.doctorVerification.clinicalNotes && (
                  <div className="pt-1 border-t border-slate-100 text-slate-600 italic">
                    Shifokor xulosasi: "{vaccine.doctorVerification.clinicalNotes}"
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Non-verified notice (explains parent permission constraint) */
            <div className="p-3.5 rounded-2xl bg-sky-50/70 border border-sky-200 text-xs text-sky-950 space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-sky-900">
                <Clock className="w-4 h-4 text-sky-600" />
                <span>Shifokor tasdig‘i kutilmoqda</span>
              </div>
              <p className="text-[11px] leading-relaxed text-sky-800">
                Reja bo‘yicha emlash sanasi: <strong>{formatDateUz(vaccine.dueDate)}</strong> ({vaccine.targetAgeLabel}).
              </p>
              <div className="p-2 rounded-xl bg-white/80 border border-sky-100 text-[10px] text-slate-600 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>
                  Xavfsizlik qoidasi: Vaksinani tibbiy tasdiqlash faqat vakolatli pediatr shifokor tomonidan amalga oshiriladi.
                </span>
              </div>
            </div>
          )}

          {/* Vaccine clinical description */}
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700 space-y-1">
            <div className="font-semibold text-slate-800">Vaksina vazifasi:</div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              {vaccine.descriptionUz}
            </p>
          </div>

          {/* Parent Notes Form */}
          <form onSubmit={handleSaveNotes} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Ota-onaning shaxsiy kuzatuv eslatmalari
              </label>
              <textarea
                rows={2}
                value={parentNotes}
                onChange={(e) => setParentNotes(e.target.value)}
                placeholder="Emlashdan keyingi bola holati yoki eslatma..."
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:border-sky-500 bg-white"
              />
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50"
              >
                Yopish
              </button>
              <button
                type="submit"
                className="flex-1 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold shadow-xs"
              >
                Eslatmani saqlash
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
