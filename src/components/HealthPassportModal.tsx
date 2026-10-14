import React from 'react';
import { BabyProfile } from '../types/baby.ts';
import { VaccineRecord } from '../types/vaccine.ts';
import { MedicalRecord } from '../types/medical.ts';
import { AllergyRecord } from '../types/allergy.ts';
import { calculateAge, formatDateUz } from '../utils/dateUtils.ts';
import { BabyDoctorLogo } from './BabyDoctorLogo.tsx';
import { X, Printer, ShieldCheck, AlertTriangle } from 'lucide-react';

interface HealthPassportModalProps {
  isOpen: boolean;
  onClose: () => void;
  baby: BabyProfile;
  vaccines: VaccineRecord[];
  medicalRecords: MedicalRecord[];
  allergies: AllergyRecord[];
}

export const HealthPassportModal: React.FC<HealthPassportModalProps> = ({
  isOpen,
  onClose,
  baby,
  vaccines,
  medicalRecords,
  allergies,
}) => {
  if (!isOpen) return null;

  const age = calculateAge(baby.birthDate);
  const receivedVaccines = vaccines.filter(v => v.status === 'olingan');
  const pendingVaccines = vaccines.filter(v => v.status === 'kutilmoqda' || v.status === 'muddati_otgan');

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="w-full max-w-3xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[92vh] flex flex-col my-auto overflow-hidden">
        {/* Controls (hidden when printing) */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 print:hidden">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-sky-800 bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
              Kichkintoy Salomatlik Pasporti
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold shadow-xs transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Chop etish (PDF)</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Passport Content */}
        <div className="py-4 overflow-y-auto space-y-6 flex-1 pr-1 print:p-0 print:m-0">
          {/* Header Brand */}
          <div className="flex items-center justify-between border-b pb-4 border-slate-200">
            <BabyDoctorLogo size="md" layout="row" tagline="Bolalar salomatligi va emlash pasporti" />
            <div className="text-right text-xs text-slate-500">
              <div>Hujjat turi: <strong>Salomatlik vasiqasi</strong></div>
              <div>Chiqarilgan sana: {formatDateUz(new Date().toISOString().split('T')[0])}</div>
            </div>
          </div>

          {/* Baby Core Identity */}
          <div className="p-4 rounded-2xl bg-[#FDFBF7] border border-amber-200/60 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div>
              <span className="text-slate-500 block text-[10px]">Bolaning F.I.SH.</span>
              <strong className="text-slate-900 text-sm">{baby.fullName}</strong>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">Tug‘ilgan sana / Yoshi</span>
              <strong className="text-slate-800">{formatDateUz(baby.birthDate)}</strong>
              <div className="text-[11px] text-sky-700">{age.formattedUz}</div>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">Jinsi va Qon guruhi</span>
              <strong className="text-slate-800">
                {baby.gender === 'ogil' ? 'O‘g‘il' : 'Qiz'} · {baby.bloodType}
              </strong>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">Tibbiy muassasa / Pediatr</span>
              <strong className="text-slate-800">{baby.pediatricianName}</strong>
              <div className="text-[11px] text-slate-500">{baby.clinicName}</div>
            </div>
          </div>

          {/* Physical parameters */}
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] text-slate-500 block">Joriy vazn</span>
              <strong className="text-base text-slate-800">{baby.currentWeightKg} kg</strong>
              <span className="text-[10px] text-slate-400 block">Tug‘ilganda: {baby.birthWeightKg} kg</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] text-slate-500 block">Joriy bo‘y</span>
              <strong className="text-base text-slate-800">{baby.currentHeightCm} sm</strong>
              <span className="text-[10px] text-slate-400 block">Tug‘ilganda: {baby.birthHeightCm} sm</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] text-slate-500 block">Bosh aylanasi</span>
              <strong className="text-base text-slate-800">{baby.currentHeadCircumferenceCm} sm</strong>
              <span className="text-[10px] text-slate-400 block">Tug‘ilganda: {baby.birthHeadCircumferenceCm} sm</span>
            </div>
          </div>

          {/* Allergies Warning Section */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Allergiyalar va nojo‘ya reaksiyalar kartasi</span>
            </h4>
            {allergies.length === 0 ? (
              <p className="text-xs text-slate-500 italic p-3 bg-slate-50 rounded-xl">
                Ma'lum bo‘lgan allergik reaksiyalar qayd etilmagan
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {allergies.map(a => (
                  <div key={a.id} className="p-3 rounded-xl border border-rose-200 bg-rose-50/40 text-xs space-y-1">
                    <div className="flex items-center justify-between font-bold text-rose-950">
                      <span>{a.allergen}</span>
                      <span className="text-[10px] uppercase px-1.5 py-0.5 rounded-sm bg-rose-200 text-rose-900">
                        {a.severity}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-600">
                      Belgilar: {a.symptoms.join(', ')}
                    </div>
                    <div className="text-[11px] text-rose-900 font-medium">
                      Tez yordam rejasi: {a.emergencyAction}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Vaccinations Checklist */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Milliy vaksina taqvimi bo‘yicha emlash holati</span>
            </h4>
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold text-[11px]">
                  <tr>
                    <th className="p-2.5">Vaksina nomi</th>
                    <th className="p-2.5">Doza</th>
                    <th className="p-2.5">Reja yoshi</th>
                    <th className="p-2.5">Holati</th>
                    <th className="p-2.5">Emlangan sana</th>
                    <th className="p-2.5">Seriya #</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {vaccines.map(v => (
                    <tr key={v.id} className={v.status === 'olingan' ? 'bg-white' : 'bg-slate-50/40'}>
                      <td className="p-2.5 font-medium text-slate-800">{v.nameUz}</td>
                      <td className="p-2.5 text-slate-500">{v.doseNumber}/{v.totalDoses || 1}</td>
                      <td className="p-2.5 text-slate-500">{v.targetAgeLabel}</td>
                      <td className="p-2.5">
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                          v.status === 'olingan'
                            ? 'bg-emerald-100 text-emerald-800'
                            : v.status === 'muddati_otgan'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-sky-100 text-sky-800'
                        }`}>
                          {v.status === 'olingan' ? 'Olingan' : v.status === 'muddati_otgan' ? 'Muddati o\'tgan' : 'Kutilmoqda'}
                        </span>
                      </td>
                      <td className="p-2.5 text-slate-600">{v.administeredDate ? formatDateUz(v.administeredDate) : '—'}</td>
                      <td className="p-2.5 text-slate-500 font-mono text-[10px]">{v.batchNumber || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Medical Visits */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              So‘nggi shifokor ko‘riklari va tashxislari
            </h4>
            <div className="space-y-2">
              {medicalRecords.slice(0, 3).map(m => (
                <div key={m.id} className="p-3 rounded-xl border border-slate-200 bg-white text-xs space-y-1">
                  <div className="flex items-center justify-between font-bold text-slate-800">
                    <span>{m.title}</span>
                    <span className="text-slate-500 font-normal">{formatDateUz(m.visitDate)}</span>
                  </div>
                  <div className="text-slate-600">
                    Shifokor: {m.doctorName} ({m.specialty}) · {m.clinic}
                  </div>
                  <div className="text-sky-900 font-medium">
                    Tashxis: {m.diagnosis}
                  </div>
                  {m.prescriptions && m.prescriptions.length > 0 && (
                    <div className="text-[11px] text-slate-500">
                      Tayinlangan dorilar: {m.prescriptions.map(p => `${p.name} (${p.dosage})`).join(', ')}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Disclaimer Footer for Graduation MedTech Evaluation */}
          <div className="pt-4 border-t border-slate-200 text-[10px] text-slate-500 space-y-1">
            <p>
              * Ushbu pasport bolaning ota-onasi tomonidan <strong>“Baby Doctor”</strong> axborot tizimida yuritilgan shaxsiy ma'lumotlar asosida shakllantirildi.
            </p>
            <p className="text-slate-400">
              Baby Doctor — Bolalar salomatligi axborot boshqaruvi tizimi. Rasmiy tibbiy xulosa faqat litsenziyaga ega shifokor tomonidan beriladi.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
