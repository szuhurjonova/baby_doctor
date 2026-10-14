import React, { useState } from 'react';
import { VaccineRecord } from '../types/vaccine.ts';
import { DoctorProfile } from '../types/user.ts';
import { BabyProfile } from '../types/baby.ts';
import { X, ShieldCheck, Calendar, Building, FileText, CheckCircle2, User, Stethoscope } from 'lucide-react';

interface DoctorVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  vaccine: VaccineRecord | null;
  baby: BabyProfile;
  doctor: DoctorProfile;
  onConfirmVerification: (data: {
    administeredDate: string;
    batchNumber: string;
    clinicalNotes: string;
    clinic: string;
  }) => void;
}

export const DoctorVerificationModal: React.FC<DoctorVerificationModalProps> = ({
  isOpen,
  onClose,
  vaccine,
  baby,
  doctor,
  onConfirmVerification,
}) => {
  if (!isOpen || !vaccine) return null;

  const [administeredDate, setAdministeredDate] = useState(
    vaccine.administeredDate || new Date().toISOString().split('T')[0]
  );
  const [batchNumber, setBatchNumber] = useState(
    vaccine.batchNumber || `SER-${Math.floor(10000 + Math.random() * 90000)}`
  );
  const [clinic, setClinic] = useState(vaccine.clinic || doctor.clinic);
  const [clinicalNotes, setClinicalNotes] = useState(
    vaccine.notes || "Emlashdan oldin pediatr ko‘rigi o‘tkazildi. Tana harorati 36.6°C, somatik holati barqaror. Emlashga qarshi ko‘rsatmalar yo‘q."
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!batchNumber.trim()) return;

    onConfirmVerification({
      administeredDate,
      batchNumber: batchNumber.trim(),
      clinicalNotes: clinicalNotes.trim(),
      clinic: clinic.trim(),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-lg bg-white rounded-3xl p-5 sm:p-6 shadow-2xl border border-slate-100 max-h-[90vh] flex flex-col my-auto">
        {/* Header */}
        <div className="flex items-start justify-between pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-800">
                Vaksinani tibbiy tasdiqlash
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Bemor: <strong>{baby.fullName}</strong> · Vaksina: <strong>{vaccine.nameUz}</strong>
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="py-4 overflow-y-auto space-y-4 flex-1">
          {/* Doctor Credentials Card */}
          <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 text-xs text-emerald-950 space-y-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold">
                <Stethoscope className="w-4 h-4 text-emerald-700" />
                <span>Tasdiqlovchi shifokor: {doctor.fullName}</span>
              </div>
              <span className="font-mono text-[10px] bg-emerald-200/70 text-emerald-900 px-2 py-0.5 rounded-md font-bold">
                ID: {doctor.doctorId}
              </span>
            </div>
            <div className="text-[11px] text-emerald-800">
              {doctor.specialty} · Litsenziya: {doctor.licenseNumber}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Emlash o‘tkazilgan sana *
            </label>
            <div className="relative">
              <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="date"
                required
                value={administeredDate}
                onChange={(e) => setAdministeredDate(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:border-emerald-500 focus:outline-hidden"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Vaksina seriya raqami (Batch #) *
              </label>
              <input
                type="text"
                required
                value={batchNumber}
                onChange={(e) => setBatchNumber(e.target.value)}
                placeholder="Masalan: SER-2026-99"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tibbiyot muassasasi *
              </label>
              <div className="relative">
                <Building className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                <input
                  type="text"
                  required
                  value={clinic}
                  onChange={(e) => setClinic(e.target.value)}
                  placeholder="Poliklinika nomi"
                  className="w-full pl-8 pr-2 py-2 rounded-xl border border-slate-200 text-xs bg-white"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Shifokor ko‘rigi va klinik xulosa *
            </label>
            <textarea
              rows={3}
              required
              value={clinicalNotes}
              onChange={(e) => setClinicalNotes(e.target.value)}
              placeholder="Ko‘rik natijalari va emlashga ruxsat xulosasi..."
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-emerald-500 focus:outline-hidden"
            />
          </div>

          {/* Workflow Notice */}
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 space-y-1">
            <div className="font-semibold text-slate-800 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Avtomatik xabarnoma tizimi</span>
            </div>
            <p className="leading-relaxed">
              Tasdiqlash tugmasini bosishingiz bilan bolaning ota-onasi profiliga <strong>“Vaksina shifokor tomonidan tasdiqlandi ✓”</strong> xabarnomasi yuboriladi va tizimda rasmiy elektron muhr kodi saqlanadi.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50"
            >
              Bekor qilish
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm flex items-center justify-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Vaksinani tasdiqlash va imzolash</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
