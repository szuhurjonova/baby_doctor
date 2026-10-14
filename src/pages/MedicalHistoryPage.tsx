import React, { useState } from 'react';
import { MedicalRecord } from '../types/medical.ts';
import { formatDateUz } from '../utils/dateUtils.ts';
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

interface MedicalHistoryPageProps {
  records: MedicalRecord[];
  onOpenAddRecord: () => void;
  onEditRecord: (record: MedicalRecord) => void;
  onDeleteRecord: (id: string) => void;
}

export const MedicalHistoryPage: React.FC<MedicalHistoryPageProps> = ({
  records,
  onOpenAddRecord,
  onEditRecord,
  onDeleteRecord,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [expandedRecordId, setExpandedRecordId] = useState<string | null>(
    records.length > 0 ? records[0].id : null
  );

  const specialties = [
    'all',
    'Pediatr',
    'Bolalar Nevrologi',
    'Bolalar Ortopedi',
    'Bolalar Oftalmologi',
    'LOR',
    'Allergolog',
  ];

  const filteredRecords = records.filter((r) => {
    const matchesSpecialty = selectedSpecialty === 'all' || r.specialty.includes(selectedSpecialty);
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      r.title.toLowerCase().includes(q) ||
      r.diagnosis.toLowerCase().includes(q) ||
      r.doctorName.toLowerCase().includes(q) ||
      r.clinic.toLowerCase().includes(q) ||
      r.symptoms.some(s => s.toLowerCase().includes(q));
    return matchesSpecialty && matchesSearch;
  });

  return (
    <div className="space-y-5 pb-12">
      {/* Header */}
      <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
                <FileText className="w-4 h-4" />
              </div>
              <h2 className="text-lg font-bold text-slate-800">
                Tibbiy tarix va ko‘riklar
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Pediatr va mutaxassis shifokorlar xulosalari, tashxislar va muolajalar
            </p>
          </div>

          <button
            onClick={onOpenAddRecord}
            className="px-3.5 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Ko‘rik qaydini qo‘shish</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tashxis, shifokor yoki shikoyat bo‘yicha qidirish..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:border-sky-500 shadow-2xs"
          />
        </div>

        {/* Specialty Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
          {specialties.map((spec) => (
            <button
              key={spec}
              onClick={() => setSelectedSpecialty(spec)}
              className={`px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap transition-all ${
                selectedSpecialty === spec
                  ? 'bg-sky-600 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900'
              }`}
            >
              {spec === 'all' ? 'Barcha mutaxassislar' : spec}
            </button>
          ))}
        </div>
      </div>

      {/* Records list */}
      <div className="space-y-3">
        {filteredRecords.length === 0 ? (
          <div className="p-8 rounded-3xl bg-white border border-slate-200 text-center space-y-2">
            <p className="text-xs text-slate-500">Qaydlar topilmadi</p>
            <button
              onClick={onOpenAddRecord}
              className="px-3 py-1.5 rounded-xl bg-sky-50 text-sky-700 text-xs font-bold hover:bg-sky-100"
            >
              Birinchi ko‘rikni qo‘shish
            </button>
          </div>
        ) : (
          filteredRecords.map((rec) => {
            const isExpanded = expandedRecordId === rec.id;
            return (
              <div
                key={rec.id}
                className="rounded-3xl bg-white border border-slate-200/80 shadow-2xs overflow-hidden transition-all"
              >
                {/* Header item */}
                <div
                  onClick={() => setExpandedRecordId(isExpanded ? null : rec.id)}
                  className="p-4 flex items-start justify-between gap-3 cursor-pointer hover:bg-slate-50/50"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-sm font-bold text-slate-800">{rec.title}</h3>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-sky-50 text-sky-700 border border-sky-200">
                        {rec.specialty}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span>{formatDateUz(rec.visitDate)}</span>
                      <span aria-hidden="true">·</span>
                      <span>{rec.doctorName}</span>
                      <span aria-hidden="true">·</span>
                      <span>{rec.clinic}</span>
                    </div>

                    <div className="text-xs text-slate-700 font-medium">
                      Tashxis: <strong className="text-slate-900">{rec.diagnosis}</strong>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onEditRecord(rec);
                      }}
                      className="p-1.5 text-slate-400 hover:text-sky-600 rounded-lg hover:bg-slate-100"
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

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="px-4 pb-4 pt-1 space-y-3 border-t border-slate-100 text-xs">
                    {/* Vitals */}
                    {rec.vitalSigns && (
                      <div className="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-center">
                        <div>
                          <span className="text-[10px] text-slate-500 block">Harorat</span>
                          <strong className="text-slate-800">
                            {rec.vitalSigns.temperatureC ? `${rec.vitalSigns.temperatureC} °C` : '—'}
                          </strong>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-500 block">Vazn</span>
                          <strong className="text-slate-800">
                            {rec.vitalSigns.weightKg ? `${rec.vitalSigns.weightKg} kg` : '—'}
                          </strong>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-500 block">Bo‘y</span>
                          <strong className="text-slate-800">
                            {rec.vitalSigns.heightCm ? `${rec.vitalSigns.heightCm} sm` : '—'}
                          </strong>
                        </div>
                      </div>
                    )}

                    {/* Symptoms */}
                    {rec.symptoms && rec.symptoms.length > 0 && (
                      <div>
                        <span className="text-[11px] font-semibold text-slate-500 block mb-1">
                          Kuzatilgan shikoyat va belgilar:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {rec.symptoms.map((s, idx) => (
                            <span
                              key={idx}
                              className="text-xs px-2 py-0.5 rounded-md bg-slate-100 text-slate-700"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Prescriptions */}
                    {rec.prescriptions && rec.prescriptions.length > 0 && (
                      <div className="space-y-1.5">
                        <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1.5">
                          <Pill className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Tayinlangan dorilar:</span>
                        </span>
                        <div className="space-y-1.5">
                          {rec.prescriptions.map((p, idx) => (
                            <div
                              key={p.id || idx}
                              className="p-2 rounded-xl bg-emerald-50/50 border border-emerald-100 flex items-center justify-between text-xs"
                            >
                              <div>
                                <strong className="text-emerald-950">{p.name}</strong>
                                <span className="text-slate-600 ml-2">({p.dosage} · {p.frequency})</span>
                              </div>
                              <span className="text-[10px] text-emerald-800 font-medium">
                                {p.durationDays} kun
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Doctor Notes */}
                    {rec.doctorNotes && (
                      <div className="p-3 rounded-2xl bg-sky-50/40 border border-sky-100">
                        <span className="text-[10px] font-bold text-sky-900 block mb-0.5 uppercase tracking-wider">
                          Shifokor xulosasi va ko‘rsatmalari:
                        </span>
                        <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line">
                          {rec.doctorNotes}
                        </p>
                      </div>
                    )}

                    {/* Next Appointment Date */}
                    {rec.nextAppointmentDate && (
                      <div className="text-[11px] text-slate-600 font-medium flex items-center gap-1.5 pt-1">
                        <Calendar className="w-3.5 h-3.5 text-sky-600" />
                        <span>Keyingi ko‘rik sanasi: <strong>{formatDateUz(rec.nextAppointmentDate)}</strong></span>
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
