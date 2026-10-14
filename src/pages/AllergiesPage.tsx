import React, { useState } from 'react';
import { AllergyRecord, AllergyCategory } from '../types/allergy.ts';
import { formatDateUz } from '../utils/dateUtils.ts';
import {
  AlertTriangle,
  Plus,
  ShieldAlert,
  Search,
  Trash2,
  Edit,
  HeartHandshake,
  User,
  Info
} from 'lucide-react';

interface AllergiesPageProps {
  allergies: AllergyRecord[];
  onOpenAddAllergy: () => void;
  onEditAllergy: (allergy: AllergyRecord) => void;
  onDeleteAllergy: (id: string) => void;
}

export const AllergiesPage: React.FC<AllergiesPageProps> = ({
  allergies,
  onOpenAddAllergy,
  onEditAllergy,
  onDeleteAllergy,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'Barchasi' },
    { id: 'oziq_ovqat', label: 'Oziq-ovqat' },
    { id: 'dori', label: 'Dori vositasi' },
    { id: 'chang_mavsumiy', label: 'Chang / Mavsumiy' },
    { id: 'boshqa', label: 'Boshqa' },
  ];

  const filtered = allergies.filter((a) => {
    const matchesCat = selectedCategory === 'all' || a.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      a.allergen.toLowerCase().includes(q) ||
      a.symptoms.some(s => s.toLowerCase().includes(q)) ||
      a.emergencyAction.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-5 pb-12">
      {/* Emergency Header Warning */}
      <div className="p-4 rounded-3xl bg-rose-50 border border-rose-200 shadow-2xs space-y-2">
        <div className="flex items-center gap-2.5 text-rose-900 font-bold text-sm">
          <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0" />
          <span>Shoshilinch tibbiy eslatma</span>
        </div>
        <p className="text-xs text-rose-800 leading-relaxed">
          Agar bolada to‘satdan nafas olish qiyinlashuvi, lab yoki yuzda kuchli shish (Kvinke shishi) yoki hushdan ketish belgilari kuzatilsa, o‘zboshimchalik bilan davolamay, darhol <strong>103 tez tibbiy yordam</strong> xizmatini chaqiring!
        </p>
      </div>

      {/* Main Header & Actions */}
      <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <h2 className="text-lg font-bold text-slate-800">
                Allergiyalar va nojo‘ya reaksiyalar
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Bolada aniqlangan barcha nojo‘ya ta'sirlar va shoshilinch yordam choralari
            </p>
          </div>

          <button
            onClick={onOpenAddAllergy}
            className="px-3.5 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Allergiya qaydini qo‘shish</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Allergen yoki belgi bo‘yicha qidirish..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:border-sky-500 shadow-2xs"
          />
        </div>

        {/* Categories */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap transition-all ${
                selectedCategory === c.id
                  ? 'bg-amber-600 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Allergies List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="p-8 rounded-3xl bg-white border border-slate-200 text-center space-y-2">
            <p className="text-xs text-slate-500">Hech qanday allergiya qaydi topilmadi</p>
            <button
              onClick={onOpenAddAllergy}
              className="px-3.5 py-1.5 rounded-xl bg-sky-50 text-sky-700 text-xs font-bold hover:bg-sky-100"
            >
              Allergiya qo‘shish
            </button>
          </div>
        ) : (
          filtered.map((item) => (
            <div
              key={item.id}
              className="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200/80 shadow-2xs space-y-3 hover:border-amber-300 transition-all"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-base font-bold text-slate-800">{item.allergen}</h3>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                        item.severity === 'ogir'
                          ? 'bg-rose-100 text-rose-800 border border-rose-300'
                          : item.severity === 'ortacha'
                          ? 'bg-orange-100 text-orange-800 border border-orange-300'
                          : 'bg-amber-100 text-amber-800 border border-amber-300'
                      }`}
                    >
                      {item.severity === 'ogir' ? 'Og‘ir daraja' : item.severity === 'ortacha' ? 'O‘rtacha daraja' : 'Yengil daraja'}
                    </span>
                  </div>

                  <div className="text-xs text-slate-500">
                    Kategoriya: <strong>{item.category === 'oziq_ovqat' ? 'Oziq-ovqat mahsuloti' : item.category === 'dori' ? 'Dori vositasi' : 'Atrof-muhit / Boshqa'}</strong>
                    {item.reactionDate && (
                      <> · Reaksiya sanasi: {formatDateUz(item.reactionDate)}</>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onEditAllergy(item)}
                    className="p-1.5 text-slate-400 hover:text-sky-600 rounded-lg hover:bg-slate-100"
                    title="Tahrirlash"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDeleteAllergy(item.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-100"
                    title="O‘chirish"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Symptoms */}
              {item.symptoms && item.symptoms.length > 0 && (
                <div className="space-y-1">
                  <span className="text-[11px] font-semibold text-slate-500 block">Kuzatilgan belgilar:</span>
                  <div className="flex flex-wrap gap-1">
                    {item.symptoms.map((s, idx) => (
                      <span key={idx} className="text-xs px-2 py-0.5 rounded-lg bg-amber-50 text-amber-900 border border-amber-200">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Emergency action box */}
              <div className="p-3 rounded-2xl bg-rose-50/60 border border-rose-200/80 text-xs text-rose-950 space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-rose-900">
                  <ShieldAlert className="w-4 h-4 text-rose-600" />
                  <span>Shoshilinch harakat rejasi:</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  {item.emergencyAction}
                </p>
              </div>

              {/* Avoidance notes */}
              {item.avoidanceNotes && (
                <div className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-200/70">
                  <span className="font-semibold text-slate-700">Parhez va ehtiyot choralari: </span>
                  {item.avoidanceNotes}
                </div>
              )}

              {item.diagnosedByDoctor && (
                <div className="text-[11px] text-slate-400 flex items-center gap-1 pt-0.5">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span>Tashxis qo‘ygan shifokor: <strong>{item.diagnosedByDoctor}</strong></span>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
