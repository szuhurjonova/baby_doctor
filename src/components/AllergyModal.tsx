import React, { useState } from 'react';
import { AllergyRecord, AllergyCategory, AllergySeverity } from '../types/allergy.ts';
import { X, AlertTriangle, ShieldAlert, HeartHandshake, User } from 'lucide-react';

interface AllergyModalProps {
  isOpen: boolean;
  onClose: () => void;
  allergy: AllergyRecord | null;
  onSave: (allergy: AllergyRecord) => void;
  babyId: string;
}

export const AllergyModal: React.FC<AllergyModalProps> = ({
  isOpen,
  onClose,
  allergy,
  onSave,
  babyId,
}) => {
  if (!isOpen) return null;

  const [allergen, setAllergen] = useState(allergy?.allergen || '');
  const [category, setCategory] = useState<AllergyCategory>(allergy?.category || 'oziq_ovqat');
  const [severity, setSeverity] = useState<AllergySeverity>(allergy?.severity || 'ortacha');
  const [symptomsInput, setSymptomsInput] = useState(allergy?.symptoms.join(', ') || '');
  const [emergencyAction, setEmergencyAction] = useState(
    allergy?.emergencyAction ||
      "Allergen manbasini darhol olib tashlang. Shifokor tayinlagan antiallergik vosita bering va zarurat bo‘lsa tez yordamga qo‘ng‘iroq qiling."
  );
  const [avoidanceNotes, setAvoidanceNotes] = useState(allergy?.avoidanceNotes || '');
  const [diagnosedByDoctor, setDiagnosedByDoctor] = useState(allergy?.diagnosedByDoctor || 'Dr. Sayyora Karimova');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!allergen.trim()) return;

    const symptomsList = symptomsInput
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    const savedAllergy: AllergyRecord = {
      id: allergy ? allergy.id : `alg-${Date.now()}`,
      babyId,
      allergen: allergen.trim(),
      category,
      severity,
      symptoms: symptomsList.length > 0 ? symptomsList : ['Allergik reaksiya'],
      emergencyAction: emergencyAction.trim(),
      avoidanceNotes: avoidanceNotes.trim(),
      diagnosedByDoctor: diagnosedByDoctor.trim() || undefined,
      createdAt: allergy ? allergy.createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    onSave(savedAllergy);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-lg bg-white rounded-3xl p-5 sm:p-6 shadow-2xl border border-slate-100 max-h-[90vh] flex flex-col my-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-800">
              {allergy ? 'Allergiya qaydini tahrirlash' : 'Yangi allergiya qaydini qo‘shish'}
            </h3>
            <p className="text-xs text-slate-500">
              Allergiya va reaksiyalar haqidagi ma'lumotlarni saqlang
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
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Allergen nomi (Qaysi modda yoki mahsulotga?) *
            </label>
            <input
              type="text"
              required
              value={allergen}
              onChange={(e) => setAllergen(e.target.value)}
              placeholder="Masalan: Sigir suti oqsili, Tuxum oqi, Amoksitsillin"
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-sky-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Kategoriya *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as AllergyCategory)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white"
              >
                <option value="oziq_ovqat">Oziq-ovqat mahsuloti</option>
                <option value="dori">Dori vositasi</option>
                <option value="chang_mavsumiy">Chang / Mavsumiy o‘simliklar</option>
                <option value="hasharot">Hasharot chaqishi</option>
                <option value="boshqa">Boshqa omil</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Og‘irlik darajasi *
              </label>
              <div className="grid grid-cols-3 gap-1 p-1 bg-slate-100 rounded-xl text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setSeverity('yengil')}
                  className={`py-1.5 rounded-lg transition-colors ${
                    severity === 'yengil'
                      ? 'bg-amber-400 text-amber-950 shadow-xs'
                      : 'text-slate-600'
                  }`}
                >
                  Yengil
                </button>
                <button
                  type="button"
                  onClick={() => setSeverity('ortacha')}
                  className={`py-1.5 rounded-lg transition-colors ${
                    severity === 'ortacha'
                      ? 'bg-orange-500 text-white shadow-xs'
                      : 'text-slate-600'
                  }`}
                >
                  O‘rtacha
                </button>
                <button
                  type="button"
                  onClick={() => setSeverity('ogir')}
                  className={`py-1.5 rounded-lg transition-colors ${
                    severity === 'ogir'
                      ? 'bg-rose-600 text-white shadow-xs'
                      : 'text-slate-600'
                  }`}
                >
                  Og‘ir
                </button>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Kuzatilgan belgilar (vergul bilan ajrating)
            </label>
            <input
              type="text"
              value={symptomsInput}
              onChange={(e) => setSymptomsInput(e.target.value)}
              placeholder="Masalan: Terida toshma, qichishish, yuz qizarishi, qorin og‘rig‘i"
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
            />
          </div>

          {/* Emergency Plan */}
          <div className="p-3 bg-rose-50/70 border border-rose-200/80 rounded-2xl space-y-1.5">
            <label className="block text-xs font-bold text-rose-900 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-rose-600" />
              <span>Shoshilinch holatda harakat rejasi *</span>
            </label>
            <textarea
              rows={2}
              required
              value={emergencyAction}
              onChange={(e) => setEmergencyAction(e.target.value)}
              placeholder="Reaksiya paydo bo‘lganda qilinishi kerak bo‘lgan birinchi yordam..."
              className="w-full px-3 py-2 rounded-xl border border-rose-200 text-xs bg-white text-rose-950 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Oldini olish va parhez bo‘yicha eslatmalar
            </label>
            <textarea
              rows={2}
              value={avoidanceNotes}
              onChange={(e) => setAvoidanceNotes(e.target.value)}
              placeholder="Masalan: Mahsulot tarkibida kazein yo‘qligiga e'tibor berish, bolalar bog‘chasi tarbiyachisini ogohlantirish"
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Tashxis qo‘ygan shifokor
            </label>
            <div className="relative">
              <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={diagnosedByDoctor}
                onChange={(e) => setDiagnosedByDoctor(e.target.value)}
                placeholder="Dr. Karimova"
                className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs"
              />
            </div>
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
              className="flex-1 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold shadow-sm"
            >
              {allergy ? 'Saqlash' : 'Allergiyani saqlash'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
