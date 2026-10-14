import React, { useState } from 'react';
import { VaccineRecord, VaccineStatus } from '../types/vaccine.ts';
import { getVaccineStatusInfo, formatDateUz } from '../utils/dateUtils.ts';
import { X, Calendar, CheckCircle2, Clock, AlertTriangle, ShieldCheck, Building, User, Info } from 'lucide-react';

interface VaccineDetailModalProps {
  vaccine: VaccineRecord | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updated: VaccineRecord) => void;
}

export const VaccineDetailModal: React.FC<VaccineDetailModalProps> = ({
  vaccine,
  isOpen,
  onClose,
  onSave,
}) => {
  if (!isOpen || !vaccine) return null;

  const [status, setStatus] = useState<VaccineStatus>(vaccine.status);
  const [administeredDate, setAdministeredDate] = useState<string>(
    vaccine.administeredDate || new Date().toISOString().split('T')[0]
  );
  const [batchNumber, setBatchNumber] = useState<string>(vaccine.batchNumber || '');
  const [clinic, setClinic] = useState<string>(vaccine.clinic || '1-sonli Bolalar poliklinikasi');
  const [doctorName, setDoctorName] = useState<string>(vaccine.doctorName || 'Dr. Sayyora Karimova');
  const [sideEffects, setSideEffects] = useState<string>(vaccine.sideEffects || '');
  const [notes, setNotes] = useState<string>(vaccine.notes || '');

  const statusInfo = getVaccineStatusInfo(status);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: VaccineRecord = {
      ...vaccine,
      status,
      administeredDate: status === 'olingan' ? administeredDate : undefined,
      batchNumber: batchNumber.trim() || undefined,
      clinic: clinic.trim() || undefined,
      doctorName: doctorName.trim() || undefined,
      sideEffects: sideEffects.trim() || undefined,
      notes: notes.trim() || undefined,
      updatedAt: new Date().toISOString(),
    };
    onSave(updated);
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
              {vaccine.isMandatoryNationalSchedule && (
                <span className="text-[10px] text-sky-700 bg-sky-50 px-2 py-0.5 rounded-full font-semibold border border-sky-200">
                  Milliy taqvim
                </span>
              )}
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="py-4 overflow-y-auto space-y-4 flex-1">
          {/* Medical description card */}
          <div className="p-3 rounded-2xl bg-sky-50/60 border border-sky-100/80 text-xs text-slate-700 space-y-1">
            <div className="flex items-center gap-1.5 font-semibold text-sky-900">
              <Info className="w-4 h-4 text-sky-600 shrink-0" />
              <span>Vaksina haqida ma'lumot</span>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              {vaccine.descriptionUz}
            </p>
            <div className="flex items-center gap-2 text-[11px] text-sky-800 font-medium pt-1">
              <span>Rejalashtirilgan yosh: <strong>{vaccine.targetAgeLabel}</strong></span>
              <span aria-hidden="true">·</span>
              <span>Reja sanasi: <strong>{formatDateUz(vaccine.dueDate)}</strong></span>
            </div>
          </div>

          {/* Status selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Emlash holati (Status) *
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1 bg-slate-100 rounded-2xl">
              {[
                { id: 'olingan' as VaccineStatus, label: 'Olingan', color: 'bg-emerald-500 text-white' },
                { id: 'kutilmoqda' as VaccineStatus, label: 'Kutilmoqda', color: 'bg-sky-500 text-white' },
                { id: 'muddati_otgan' as VaccineStatus, label: 'Muddati o‘tgan', color: 'bg-rose-500 text-white' },
                { id: 'olinmagan' as VaccineStatus, label: 'Olinmagan', color: 'bg-slate-600 text-white' },
              ].map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setStatus(s.id)}
                  className={`py-2 px-2 text-xs font-semibold rounded-xl transition-all ${
                    status === s.id
                      ? `${s.color} shadow-xs`
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Administered details (if received) */}
          {status === 'olingan' && (
            <div className="space-y-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Emlangan sana *
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="date"
                    required
                    value={administeredDate}
                    onChange={(e) => setAdministeredDate(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs bg-white focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Vaksina seriyasi (Batch #)
                  </label>
                  <input
                    type="text"
                    value={batchNumber}
                    onChange={(e) => setBatchNumber(e.target.value)}
                    placeholder="Masalan: SER-88392"
                    className="w-full px-3 py-1.5 rounded-xl border border-slate-200 text-xs bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Shifokor / Hamshira
                  </label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2" />
                    <input
                      type="text"
                      value={doctorName}
                      onChange={(e) => setDoctorName(e.target.value)}
                      placeholder="Dr. Karimova"
                      className="w-full pl-7 pr-2 py-1.5 rounded-xl border border-slate-200 text-xs bg-white"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Poliklinika / Emlash punkti
                </label>
                <div className="relative">
                  <Building className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2" />
                  <input
                    type="text"
                    value={clinic}
                    onChange={(e) => setClinic(e.target.value)}
                    placeholder="1-sonli Bolalar poliklinikasi"
                    className="w-full pl-7 pr-2 py-1.5 rounded-xl border border-slate-200 text-xs bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Emlashdan keyingi reaksiya / Nojo‘ya ta'sir (agar bo‘lsa)
                </label>
                <input
                  type="text"
                  value={sideEffects}
                  onChange={(e) => setSideEffects(e.target.value)}
                  placeholder="Masalan: Reaksiya kuzatilmadi, harorat 36.8°C"
                  className="w-full px-3 py-1.5 rounded-xl border border-slate-200 text-xs bg-white"
                />
              </div>
            </div>
          )}

          {/* Notes */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Ota-ona eslatmalari
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Emlash oldi tahlillari yoki shifokor maslahatlari..."
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-hidden"
            />
          </div>

          {/* Actions */}
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
              className="flex-1 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold shadow-sm"
            >
              Saqlash
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
