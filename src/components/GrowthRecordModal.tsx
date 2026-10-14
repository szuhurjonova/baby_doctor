import React, { useState } from 'react';
import { GrowthRecord } from '../types/growth.ts';
import { BabyProfile } from '../types/baby.ts';
import { evaluateWeightForAge } from '../services/growthStandards.ts';
import { calculateAge } from '../utils/dateUtils.ts';
import { X, Scale, Ruler, Calendar, CheckCircle, Info } from 'lucide-react';

interface GrowthRecordModalProps {
  isOpen: boolean;
  onClose: () => void;
  baby: BabyProfile;
  onSave: (record: GrowthRecord) => void;
  existingRecord?: GrowthRecord | null;
}

export const GrowthRecordModal: React.FC<GrowthRecordModalProps> = ({
  isOpen,
  onClose,
  baby,
  onSave,
  existingRecord,
}) => {
  if (!isOpen) return null;

  const [recordDate, setRecordDate] = useState(
    existingRecord?.recordDate || new Date().toISOString().split('T')[0]
  );
  const [weightKg, setWeightKg] = useState(
    existingRecord ? String(existingRecord.weightKg) : String(baby.currentWeightKg || '7.5')
  );
  const [heightCm, setHeightCm] = useState(
    existingRecord ? String(existingRecord.heightCm) : String(baby.currentHeightCm || '65')
  );
  const [headCircumferenceCm, setHeadCircumferenceCm] = useState(
    existingRecord?.headCircumferenceCm
      ? String(existingRecord.headCircumferenceCm)
      : String(baby.currentHeadCircumferenceCm || '42')
  );
  const [notes, setNotes] = useState(existingRecord?.notes || '');

  // Calculate baby age at the record date
  const birthDate = new Date(baby.birthDate);
  const recDate = new Date(recordDate);
  const diffMonths = Math.max(
    0,
    Math.round((recDate.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24 * 30.4375))
  );

  const numWeight = parseFloat(weightKg) || 0;
  const evaluation = numWeight > 0 ? evaluateWeightForAge(diffMonths, numWeight, baby.gender) : null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!numWeight) return;

    const record: GrowthRecord = {
      id: existingRecord ? existingRecord.id : `g-${Date.now()}`,
      babyId: baby.id,
      recordDate,
      ageMonths: diffMonths,
      weightKg: numWeight,
      heightCm: parseFloat(heightCm) || 50,
      headCircumferenceCm: headCircumferenceCm ? parseFloat(headCircumferenceCm) : undefined,
      notes: notes.trim(),
    };

    onSave(record);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-md bg-white rounded-3xl p-5 sm:p-6 shadow-2xl border border-slate-100 max-h-[90vh] flex flex-col my-auto">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-800">
              {existingRecord ? 'O‘lchovni tahrirlash' : 'Yangi o‘sish o‘lchovini kiritish'}
            </h3>
            <p className="text-xs text-slate-500">
              Vazn, bo‘y va bosh aylanasini qayd etish ({diffMonths} oylik)
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="py-4 space-y-4 overflow-y-auto flex-1">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              O‘lchov o‘tkazilgan sana *
            </label>
            <div className="relative">
              <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="date"
                required
                value={recordDate}
                onChange={(e) => setRecordDate(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Vazn (kg) *
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.05"
                  required
                  value={weightKg}
                  onChange={(e) => setWeightKg(e.target.value)}
                  className="w-full px-2 py-2 rounded-xl border border-slate-200 text-sm font-bold text-center focus:border-sky-500 focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Bo‘yi (sm) *
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.5"
                  required
                  value={heightCm}
                  onChange={(e) => setHeightCm(e.target.value)}
                  className="w-full px-2 py-2 rounded-xl border border-slate-200 text-sm font-bold text-center focus:border-sky-500 focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Bosh aylanasi (sm)
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.5"
                  value={headCircumferenceCm}
                  onChange={(e) => setHeadCircumferenceCm(e.target.value)}
                  className="w-full px-2 py-2 rounded-xl border border-slate-200 text-sm font-bold text-center focus:border-sky-500 focus:outline-hidden"
                />
              </div>
            </div>
          </div>

          {/* WHO dynamic feedback */}
          {evaluation && (
            <div className="p-3 rounded-2xl bg-sky-50/80 border border-sky-200/70 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-sky-900">
                <CheckCircle className="w-4 h-4 text-sky-600" />
                <span>JSST me'yori bilan taqqoslash ({diffMonths} oylik {baby.gender === 'ogil' ? 'o\'g\'il' : 'qiz'} bola)</span>
              </div>
              <p className="text-xs text-sky-800 font-medium">
                {evaluation.labelUz}
              </p>
              <div className="text-[11px] text-slate-600 flex items-center gap-2 pt-0.5">
                <span>Persentil: <strong>{evaluation.percentileApprox}</strong></span>
                <span aria-hidden="true">·</span>
                <span>O'rtacha me'yordan farq: <strong>{evaluation.diffFromMedianKg > 0 ? `+${evaluation.diffFromMedianKg}` : evaluation.diffFromMedianKg} kg</strong></span>
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Izoh yoki shifokor ko‘rsatmasi
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Rejali oylik o‘lchov..."
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-hidden"
            />
          </div>

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
