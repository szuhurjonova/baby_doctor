import React, { useState } from 'react';
import { MedicalRecord } from '../../types/medical.ts';
import { BabyProfile } from '../../types/baby.ts';
import { formatDateUz } from '../../utils/dateUtils.ts';
import {
  FileText,
  Search,
  Plus,
  Stethoscope,
  Building,
  Calendar,
  Pill,
  HeartPulse,
  Trash2,
  Edit,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface DoctorMedicalHistoryPageProps {
  records: MedicalRecord[];
  baby: BabyProfile;
  onOpenAddRecord: () => void;
  onEditRecord: (record: MedicalRecord) => void;
  onDeleteRecord: (id: string) => void;
}

export const DoctorMedicalHistoryPage: React.FC<DoctorMedicalHistoryPageProps> = ({
  records,
  baby,
  onOpenAddRecord,
  onEditRecord,
  onDeleteRecord,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(records.length > 0 ? records[0].id : null);

  const filtered = records.filter((r) => {
    const q = searchQuery.toLowerCase();
    return (
      r.title.toLowerCase().includes(q) ||
      r.diagnosis.toLowerCase().includes(q) ||
      r.doctorName.toLowerCase().includes(q) ||
      r.symptoms.some(s => s.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-5 pb-12">
      {/* Header */}
      <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <FileText className="w-4 h-4" />
              </div>
              <h2 className="text-lg font-bold text-slate-800">
                Klinik ko‘riklar va tibbiy tarix
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Bemor: <strong>{baby.fullName}</strong> · Shifokor qabullari, tashxislar va tayinlangan terapiya
            </p>
          </div>

          <button
            onClick={onOpenAddRecord}
            className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Yangi ko‘rik qo‘shish</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tashxis yoki simptomlar bo‘yicha qidirish..."
            className="w-full pl-10 pr-4 py-2 rounded-2xl bg-white border border-slate-200 text-xs text-slate-800 focus:outline-hidden focus:border-emerald-500 shadow-2xs"
          />
        </div>
      </div>

      {/* History List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="p-8 rounded-3xl bg-white border border-slate-200 text-center space-y-2">
            <p className="text-xs text-slate-500">Klinik qaydlar topilmadi</p>
            <button
              onClick={onOpenAddRecord}
              className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold"
            >
              Ko‘rikni kiritish
            </button>
          </div>
        ) : (
          filtered.map((rec) => {
            const isExpanded = expandedId === rec.id;
            return (
              <div
                key={rec.id}
                className="rounded-3xl bg-white border border-slate-200/80 shadow-2xs overflow-hidden transition-all"
              >
                <div
                  onClick={() => setExpandedId(isExpanded ? null : rec.id)}
                  className="p-4 flex items-start justify-between gap-3 cursor-pointer hover:bg-slate-50/50"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-sm font-bold text-slate-900">{rec.title}</h3>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {rec.specialty}
                      </span>
                    </div>

                    <div className="text-xs text-slate-500 flex items-center gap-2">
                      <span>{formatDateUz(rec.visitDate)}</span>
                      <span aria-hidden="true">·</span>
                      <span>Shifokor: {rec.doctorName}</span>
                      <span aria-hidden="true">·</span>
                      <span>{rec.clinic}</span>
                    </div>

                    <div className="text-xs text-slate-700 font-medium">
                      Klinik tashxis: <strong className="text-slate-900">{rec.diagnosis}</strong>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onEditRecord(rec);
                      }}
                      className="p-1.5 text-slate-400 hover:text-emerald-700 rounded-lg hover:bg-slate-100"
                      title="Tahrirlash"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteRecord(rec.id);
                      }}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-100"
                      title="O‘chirish"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="p-1.5 text-slate-400">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>
                </div>

                {isExpanded && (
                  <div className="px-4 pb-4 pt-1 space-y-3 border-t border-slate-100 text-xs">
                    {/* Vitals */}
                    {rec.vitalSigns && (
                      <div className="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-center">
                        <div>
                          <span className="text-[10px] text-slate-500 block">Harorat</span>
                          <strong className="text-slate-800">{rec.vitalSigns.temperatureC ? `${rec.vitalSigns.temperatureC} °C` : '—'}</strong>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-500 block">Vazn</span>
                          <strong className="text-slate-800">{rec.vitalSigns.weightKg ? `${rec.vitalSigns.weightKg} kg` : '—'}</strong>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-500 block">Bo‘yi</span>
                          <strong className="text-slate-800">{rec.vitalSigns.heightCm ? `${rec.vitalSigns.heightCm} sm` : '—'}</strong>
                        </div>
                      </div>
                    )}

                    {/* Prescriptions */}
                    {rec.prescriptions && rec.prescriptions.length > 0 && (
                      <div className="space-y-1.5">
                        <span className="text-[11px] font-semibold text-slate-600 flex items-center gap-1.5">
                          <Pill className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Tayinlangan retsept / Tavsiyanoma:</span>
                        </span>
                        <div className="space-y-1">
                          {rec.prescriptions.map((p, idx) => (
                            <div
                              key={p.id || idx}
                              className="p-2 rounded-xl bg-emerald-50/50 border border-emerald-100 flex items-center justify-between text-xs"
                            >
                              <div>
                                <strong className="text-emerald-950">{p.name}</strong>
                                <span className="text-slate-600 ml-2">({p.dosage} · {p.frequency})</span>
                              </div>
                              <span className="text-[10px] text-emerald-800 font-medium">{p.durationDays} kun</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Doctor notes */}
                    {rec.doctorNotes && (
                      <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                        <span className="text-[10px] font-bold text-slate-700 block mb-0.5 uppercase tracking-wider">
                          Shifokor ko‘rsatmalari:
                        </span>
                        <p className="text-xs text-slate-700 whitespace-pre-line leading-relaxed">
                          {rec.doctorNotes}
                        </p>
                      </div>
                    )}

                    {rec.nextAppointmentDate && (
                      <div className="text-[11px] text-slate-600 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Keyingi rejaviy qabul: <strong>{formatDateUz(rec.nextAppointmentDate)}</strong></span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
