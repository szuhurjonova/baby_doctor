import React, { useState } from 'react';
import { BabyProfile, Gender, BloodType } from '../types/baby.ts';
import { calculateAge, formatDateUz } from '../utils/dateUtils.ts';
import { X, Plus, Check, Baby, Calendar, User, Phone, Building2 } from 'lucide-react';

interface BabySwitcherModalProps {
  isOpen: boolean;
  onClose: () => void;
  babies: BabyProfile[];
  activeBabyId: string;
  onSelectBaby: (id: string) => void;
  onSaveNewBaby: (baby: BabyProfile) => void;
  onUpdateBaby: (baby: BabyProfile) => void;
}

export const BabySwitcherModal: React.FC<BabySwitcherModalProps> = ({
  isOpen,
  onClose,
  babies,
  activeBabyId,
  onSelectBaby,
  onSaveNewBaby,
  onUpdateBaby,
}) => {
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingBaby, setEditingBaby] = useState<BabyProfile | null>(null);

  // Form states
  const [fullName, setFullName] = useState('');
  const [gender, setGender] = useState<Gender>('ogil');
  const [birthDate, setBirthDate] = useState('2026-06-01');
  const [bloodType, setBloodType] = useState<BloodType>('O(I) Rh+');
  const [birthWeight, setBirthWeight] = useState('3.3');
  const [birthHeight, setBirthHeight] = useState('50.0');
  const [birthHeadCircumference, setBirthHeadCircumference] = useState('35.0');
  const [pediatricianName, setPediatricianName] = useState('');
  const [pediatricianPhone, setPediatricianPhone] = useState('');
  const [clinicName, setClinicName] = useState('');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleStartAdd = () => {
    setIsAddingNew(true);
    setEditingBaby(null);
    setFullName('');
    setGender('ogil');
    setBirthDate('2026-06-01');
    setBloodType('O(I) Rh+');
    setBirthWeight('3.3');
    setBirthHeight('50.0');
    setBirthHeadCircumference('35.0');
    setPediatricianName('Dr. Sayyora Karimova');
    setPediatricianPhone('+998 (90) 123-45-67');
    setClinicName('1-sonli Bolalar poliklinikasi');
    setNotes('');
  };

  const handleStartEdit = (b: BabyProfile) => {
    setEditingBaby(b);
    setIsAddingNew(false);
    setFullName(b.fullName);
    setGender(b.gender);
    setBirthDate(b.birthDate);
    setBloodType(b.bloodType);
    setBirthWeight(String(b.birthWeightKg));
    setBirthHeight(String(b.birthHeightCm));
    setBirthHeadCircumference(String(b.birthHeadCircumferenceCm));
    setPediatricianName(b.pediatricianName);
    setPediatricianPhone(b.pediatricianPhone);
    setClinicName(b.clinicName);
    setNotes(b.notes || '');
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) return;

    if (editingBaby) {
      const updated: BabyProfile = {
        ...editingBaby,
        fullName: fullName.trim(),
        gender,
        birthDate,
        bloodType,
        birthWeightKg: parseFloat(birthWeight) || 3.3,
        birthHeightCm: parseFloat(birthHeight) || 50,
        birthHeadCircumferenceCm: parseFloat(birthHeadCircumference) || 35,
        pediatricianName: pediatricianName.trim(),
        pediatricianPhone: pediatricianPhone.trim(),
        clinicName: clinicName.trim(),
        notes: notes.trim(),
        updatedAt: new Date().toISOString(),
      };
      onUpdateBaby(updated);
      setEditingBaby(null);
    } else {
      const newBaby: BabyProfile = {
        id: `baby-${Date.now()}`,
        userId: 'user-parent-1',
        fullName: fullName.trim(),
        gender,
        birthDate,
        bloodType,
        birthWeightKg: parseFloat(birthWeight) || 3.3,
        birthHeightCm: parseFloat(birthHeight) || 50,
        birthHeadCircumferenceCm: parseFloat(birthHeadCircumference) || 35,
        currentWeightKg: parseFloat(birthWeight) || 3.3,
        currentHeightCm: parseFloat(birthHeight) || 50,
        currentHeadCircumferenceCm: parseFloat(birthHeadCircumference) || 35,
        pediatricianName: pediatricianName.trim() || 'Dr. Malika Rasulova',
        pediatricianPhone: pediatricianPhone.trim() || '+998 (90) 000-00-00',
        clinicName: clinicName.trim() || 'Oilaviy Poliklinika',
        notes: notes.trim(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      onSaveNewBaby(newBaby);
      setIsAddingNew(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-md bg-white rounded-3xl p-5 sm:p-6 shadow-2xl border border-slate-100 max-h-[90vh] flex flex-col my-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-800">
              {isAddingNew
                ? 'Yangi bola profilini qo‘shish'
                : editingBaby
                ? 'Bola ma\'lumotlarini tahrirlash'
                : 'Bolani tanlash'}
            </h3>
            <p className="text-xs text-slate-500">
              {isAddingNew || editingBaby
                ? 'Tibbiy ma\'lumotlarni aniq kiriting'
                : 'Ro‘yxatdan kerakli bolani tanlang'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form or List */}
        <div className="py-4 overflow-y-auto flex-1">
          {isAddingNew || editingBaby ? (
            <form onSubmit={handleSaveForm} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Bolaning to‘liq ismi va familiyasi *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Masalan: Jasurbek Aliyev"
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Jinsi *
                  </label>
                  <div className="grid grid-cols-2 gap-1 p-1 bg-slate-100 rounded-xl">
                    <button
                      type="button"
                      onClick={() => setGender('ogil')}
                      className={`py-1.5 text-xs font-medium rounded-lg transition-colors ${
                        gender === 'ogil'
                          ? 'bg-sky-500 text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      O‘g‘il
                    </button>
                    <button
                      type="button"
                      onClick={() => setGender('qiz')}
                      className={`py-1.5 text-xs font-medium rounded-lg transition-colors ${
                        gender === 'qiz'
                          ? 'bg-pink-500 text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Qiz
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Qon guruhi
                  </label>
                  <select
                    value={bloodType}
                    onChange={(e) => setBloodType(e.target.value as BloodType)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:border-sky-500 bg-white"
                  >
                    <option value="O(I) Rh+">O(I) Rh+</option>
                    <option value="O(I) Rh-">O(I) Rh-</option>
                    <option value="A(I) Rh+">A(II) Rh+</option>
                    <option value="A(I) Rh-">A(II) Rh-</option>
                    <option value="B(III) Rh+">B(III) Rh+</option>
                    <option value="B(III) Rh-">B(III) Rh-</option>
                    <option value="AB(IV) Rh+">AB(IV) Rh+</option>
                    <option value="AB(IV) Rh-">AB(IV) Rh-</option>
                    <option value="Noma'lum">Noma'lum</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tug‘ilgan sanasi *
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="date"
                    required
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-sky-500 bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Vazn (kg)
                  </label>
                  <input
                    type="number"
                    step="0.05"
                    value={birthWeight}
                    onChange={(e) => setBirthWeight(e.target.value)}
                    className="w-full px-2 py-1.5 rounded-xl border border-slate-200 text-xs text-center"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Bo‘yi (sm)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={birthHeight}
                    onChange={(e) => setBirthHeight(e.target.value)}
                    className="w-full px-2 py-1.5 rounded-xl border border-slate-200 text-xs text-center"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Bosh aylanasi (sm)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={birthHeadCircumference}
                    onChange={(e) => setBirthHeadCircumference(e.target.value)}
                    className="w-full px-2 py-1.5 rounded-xl border border-slate-200 text-xs text-center"
                  />
                </div>
              </div>

              <div className="space-y-3 pt-2 border-t border-slate-100">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Pediatr shifokor F.I.SH.
                  </label>
                  <input
                    type="text"
                    value={pediatricianName}
                    onChange={(e) => setPediatricianName(e.target.value)}
                    placeholder="Masalan: Dr. Karimova Sayyora"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-hidden"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Pediatr telefoni
                    </label>
                    <div className="relative">
                      <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                      <input
                        type="text"
                        value={pediatricianPhone}
                        onChange={(e) => setPediatricianPhone(e.target.value)}
                        placeholder="+998"
                        className="w-full pl-7 pr-2 py-1.5 rounded-xl border border-slate-200 text-xs"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Poliklinika / Muassasa
                    </label>
                    <div className="relative">
                      <Building2 className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                      <input
                        type="text"
                        value={clinicName}
                        onChange={(e) => setClinicName(e.target.value)}
                        placeholder="1-poliklinika"
                        className="w-full pl-7 pr-2 py-1.5 rounded-xl border border-slate-200 text-xs"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Qo‘shimcha eslatmalar
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Tug'ruq tafsilotlari, umumiy holat..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddingNew(false);
                    setEditingBaby(null);
                  }}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold shadow-sm"
                >
                  {editingBaby ? 'Saqlash' : 'Profilni yaratish'}
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-3">
              {babies.map((b) => {
                const isSelected = b.id === activeBabyId;
                const age = calculateAge(b.birthDate);
                return (
                  <div
                    key={b.id}
                    className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'border-sky-500 bg-sky-50/50 shadow-xs ring-1 ring-sky-200'
                        : 'border-slate-200/80 hover:border-slate-300 hover:bg-slate-50/60'
                    }`}
                  >
                    <div
                      onClick={() => {
                        onSelectBaby(b.id);
                        onClose();
                      }}
                      className="flex items-center gap-3 flex-1 cursor-pointer"
                    >
                      <div
                        className={`w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-base text-white shadow-2xs ${
                          b.gender === 'ogil'
                            ? 'bg-gradient-to-tr from-sky-500 to-sky-300'
                            : 'bg-gradient-to-tr from-pink-500 to-pink-300'
                        }`}
                      >
                        {b.fullName.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-slate-800 text-sm">{b.fullName}</h4>
                          {isSelected && (
                            <span className="w-5 h-5 rounded-full bg-sky-600 text-white flex items-center justify-center text-xs">
                              <Check className="w-3 h-3" />
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                          <span>{age.formattedUz}</span>
                          <span aria-hidden="true">·</span>
                          <span>{b.bloodType}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleStartEdit(b)}
                      className="px-2.5 py-1.5 rounded-xl text-xs font-medium text-slate-600 hover:text-sky-700 hover:bg-white border border-slate-200/80"
                    >
                      Tahrirlash
                    </button>
                  </div>
                );
              })}

              <button
                onClick={handleStartAdd}
                className="w-full py-3 px-4 rounded-2xl border-2 border-dashed border-sky-300/80 hover:border-sky-500 text-sky-700 hover:bg-sky-50/40 text-xs font-bold flex items-center justify-center gap-2 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Yangi bola qo‘shish</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
