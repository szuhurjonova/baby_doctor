import React, { useState } from 'react';
import { BabyProfile } from '../types/baby.ts';
import { GrowthRecord } from '../types/growth.ts';
import { calculateAge, formatDateUz } from '../utils/dateUtils.ts';
import { evaluateWeightForAge } from '../services/growthStandards.ts';
import {
  Baby,
  Calendar,
  Scale,
  Ruler,
  Activity,
  Phone,
  Building,
  Edit,
  Plus,
  Trash2,
  FileText,
  Printer,
  Heart,
  TrendingUp,
  CheckCircle,
  Clock
} from 'lucide-react';

interface BabyProfilePageProps {
  baby: BabyProfile;
  growthRecords: GrowthRecord[];
  onOpenEditBaby: () => void;
  onOpenAddGrowth: () => void;
  onOpenHealthPassport: () => void;
  onDeleteGrowthRecord: (id: string) => void;
}

export const BabyProfilePage: React.FC<BabyProfilePageProps> = ({
  baby,
  growthRecords,
  onOpenEditBaby,
  onOpenAddGrowth,
  onOpenHealthPassport,
  onDeleteGrowthRecord,
}) => {
  const age = calculateAge(baby.birthDate);
  const [selectedMilestoneTab, setSelectedMilestoneTab] = useState<'growth' | 'milestones'>('growth');

  // Milestone stages based on pediatric standards
  const developmentalMilestones = [
    { month: 1, title: 'Ko‘z bilan nigohni ushlash, onaning ovoziga quloq solish', done: age.months >= 1 },
    { month: 2, title: 'Qorin bilan yotganda boshini bir muddat ko‘tarib ushlash, ijtimoiy tabassum', done: age.months >= 2 },
    { month: 3, title: 'Boshini mustahkam tik tutish, qo‘llarini ochib-yopish, g‘uldirash', done: age.months >= 3 },
    { month: 4, title: 'Yon tomonga va qoringa ag‘darilish, o‘yinchoqlarga intilish', done: age.months >= 4 },
    { month: 5, title: 'O‘yinchoqni bir qo‘ldan ikkinchisiga o‘tkazish, tayanch bilan o‘tirish', done: age.months >= 5 },
    { month: 6, title: 'Mustaqil o‘tirish, qoshiqdan ovqat yeyish (birinchi prikorm)', done: age.months >= 6 },
    { month: 8, title: 'Emaklash, narsalarni ushlab o‘rnidan turishga urinish', done: age.months >= 8 },
    { month: 10, title: 'Qo‘llarini qarsak chalish, "Ota", "Ona" deb bo‘g‘inlarni aytish', done: age.months >= 10 },
    { month: 12, title: 'Birinchi mustaqil qadamlar, buyruqlarni tushunish', done: age.months >= 12 },
  ];

  return (
    <div className="space-y-5 pb-12">
      {/* Profile Overview Card */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/80 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div
              className={`w-16 h-16 rounded-3xl flex items-center justify-center text-2xl font-bold text-white shadow-md ${
                baby.gender === 'ogil'
                  ? 'bg-gradient-to-tr from-sky-500 to-sky-300'
                  : 'bg-gradient-to-tr from-pink-500 to-pink-300'
              }`}
            >
              {baby.fullName.charAt(0)}
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-slate-800">{baby.fullName}</h2>
              </div>

              {/* Clean unboxed metadata with typographic separators */}
              <div className="flex items-center gap-2 text-xs text-slate-500 flex-wrap">
                <span>{age.formattedUz}</span>
                <span aria-hidden="true">·</span>
                <span>{baby.gender === 'ogil' ? 'O‘g‘il' : 'Qiz'}</span>
                <span aria-hidden="true">·</span>
                <span>{baby.bloodType}</span>
                {baby.medicalInsuranceOrId && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono text-[11px]">{baby.medicalInsuranceOrId}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 self-stretch sm:self-auto">
            <button
              onClick={onOpenEditBaby}
              className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Edit className="w-3.5 h-3.5" />
              <span>Tahrirlash</span>
            </button>
            <button
              onClick={onOpenHealthPassport}
              className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Pasport</span>
            </button>
          </div>
        </div>

        {/* Pediatrician & Clinic Box */}
        <div className="p-3.5 rounded-2xl bg-[#FDFBF7] border border-amber-200/60 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] text-slate-400 block font-medium">Shaxsiy pediatr</span>
              <strong className="text-slate-800 text-xs">{baby.pediatricianName}</strong>
              <div className="text-[11px] text-slate-500">{baby.clinicName}</div>
            </div>
            {baby.pediatricianPhone && (
              <a
                href={`tel:${baby.pediatricianPhone}`}
                className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border border-emerald-200 flex items-center justify-center transition-colors"
                title="Qo‘ng‘iroq qilish"
              >
                <Phone className="w-4 h-4" />
              </a>
            )}
          </div>

          <div>
            <span className="text-[10px] text-slate-400 block font-medium">Tug‘ilgan sana va joy</span>
            <strong className="text-slate-800 text-xs">{formatDateUz(baby.birthDate)}</strong>
            <div className="text-[11px] text-slate-500">Tug‘uruq holati: {baby.notes || "Asoratsiz tug'ruq"}</div>
          </div>
        </div>

        {/* Birth vs Current metrics comparison */}
        <div className="grid grid-cols-3 gap-2.5 pt-1">
          <div className="p-3 rounded-2xl bg-sky-50/50 border border-sky-100 text-center">
            <span className="text-[10px] text-slate-500 block">Vazn o‘sishi</span>
            <div className="text-base font-bold text-sky-900 font-display">
              {baby.currentWeightKg} kg
            </div>
            <span className="text-[10px] text-emerald-700 font-semibold">
              +{Math.round((baby.currentWeightKg - baby.birthWeightKg) * 10) / 10} kg (tug‘ilganda: {baby.birthWeightKg} kg)
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-amber-50/50 border border-amber-100 text-center">
            <span className="text-[10px] text-slate-500 block">Bo‘y o‘sishi</span>
            <div className="text-base font-bold text-amber-900 font-display">
              {baby.currentHeightCm} sm
            </div>
            <span className="text-[10px] text-emerald-700 font-semibold">
              +{Math.round((baby.currentHeightCm - baby.birthHeightCm) * 10) / 10} sm (tug‘ilganda: {baby.birthHeightCm} sm)
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-rose-50/50 border border-rose-100 text-center">
            <span className="text-[10px] text-slate-500 block">Bosh aylanasi</span>
            <div className="text-base font-bold text-rose-900 font-display">
              {baby.currentHeadCircumferenceCm} sm
            </div>
            <span className="text-[10px] text-emerald-700 font-semibold">
              +{Math.round((baby.currentHeadCircumferenceCm - baby.birthHeadCircumferenceCm) * 10) / 10} sm
            </span>
          </div>
        </div>
      </div>

      {/* Segmented control for Growth vs Milestones */}
      <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-2xl">
        <button
          onClick={() => setSelectedMilestoneTab('growth')}
          className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
            selectedMilestoneTab === 'growth'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Oylik o‘sish dinamikasi (JSST)
        </button>
        <button
          onClick={() => setSelectedMilestoneTab('milestones')}
          className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
            selectedMilestoneTab === 'milestones'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Rivojlanish bosqichlari
        </button>
      </div>

      {/* Tab 1: Growth Log */}
      {selectedMilestoneTab === 'growth' ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-sky-600" />
              <span>O‘sish ko‘rsatkichlari jurnali ({growthRecords.length})</span>
            </h3>
            <button
              onClick={onOpenAddGrowth}
              className="px-3 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold flex items-center gap-1 shadow-xs transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>O‘lchov kiritish</span>
            </button>
          </div>

          <div className="space-y-2">
            {growthRecords.map((rec) => {
              const evalRes = evaluateWeightForAge(rec.ageMonths, rec.weightKg, baby.gender);
              return (
                <div
                  key={rec.id}
                  className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-sky-50 text-sky-700 font-bold text-xs flex items-center justify-center">
                        {rec.ageMonths}m
                      </span>
                      <strong className="text-xs text-slate-800">
                        {rec.ageMonths === 0 ? 'Tug‘ilganda' : `${rec.ageMonths} oylik o‘lchov`}
                      </strong>
                      <span className="text-[11px] text-slate-400">({formatDateUz(rec.recordDate)})</span>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-slate-700">
                      <span>Vazn: <strong>{rec.weightKg} kg</strong></span>
                      <span aria-hidden="true">·</span>
                      <span>Bo‘y: <strong>{rec.heightCm} sm</strong></span>
                      {rec.headCircumferenceCm && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span>Bosh: <strong>{rec.headCircumferenceCm} sm</strong></span>
                        </>
                      )}
                    </div>

                    {rec.notes && (
                      <p className="text-[11px] text-slate-500 italic">{rec.notes}</p>
                    )}
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${
                        evalRes.status === 'meyorda'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-amber-50 text-amber-800 border border-amber-200'
                      }`}
                    >
                      {evalRes.percentileApprox}
                    </span>

                    {growthRecords.length > 1 && (
                      <button
                        onClick={() => onDeleteGrowthRecord(rec.id)}
                        className="p-1.5 text-slate-300 hover:text-rose-600 rounded-lg hover:bg-slate-50"
                        title="O‘chirish"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Tab 2: Milestones */
        <div className="space-y-3">
          <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-2xs space-y-3">
            <h3 className="text-sm font-bold text-slate-800">
              Chaqaloqning asosiy refleks va psixomotor ko‘nikmalari
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              O‘zbekiston pediatriya amaliyotida qabul qilingan oylik me'yoriy bosqichlar:
            </p>

            <div className="space-y-2.5 pt-1">
              {developmentalMilestones.map((ms) => (
                <div
                  key={ms.month}
                  className={`p-3 rounded-2xl border transition-colors flex items-start gap-3 ${
                    ms.done
                      ? 'bg-emerald-50/50 border-emerald-200/70 text-emerald-950'
                      : 'bg-slate-50/50 border-slate-200/60 text-slate-600'
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                      ms.done
                        ? 'bg-emerald-500 text-white'
                        : 'bg-slate-200 text-slate-500'
                    }`}
                  >
                    {ms.done ? <CheckCircle className="w-4 h-4" /> : <Clock className="w-3.5 h-3.5" />}
                  </div>

                  <div className="text-xs space-y-0.5">
                    <div className="font-bold flex items-center gap-2">
                      <span>{ms.month} oylik bosqich</span>
                      {ms.done && (
                        <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-100/60 px-1.5 py-0.2 rounded-md">
                          Erishildi
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] leading-relaxed text-slate-600">
                      {ms.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
