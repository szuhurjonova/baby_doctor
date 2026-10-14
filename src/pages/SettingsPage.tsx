import React, { useState } from 'react';
import { ParentUser } from '../types/user.ts';
import { BabyDoctorLogo } from '../components/BabyDoctorLogo.tsx';
import { MedicalDisclaimerBanner } from '../components/MedicalDisclaimerBanner.tsx';
import {
  Settings,
  Shield,
  Lock,
  Download,
  Upload,
  RefreshCw,
  User,
  GraduationCap,
  CheckCircle,
  FileCode,
  Save,
  Check
} from 'lucide-react';

interface SettingsPageProps {
  user: ParentUser;
  onUpdateUser: (update: Partial<ParentUser>) => void;
  onExportData: () => void;
  onImportData: (jsonStr: string) => boolean;
  onResetData: () => void;
  onLockAppNow: () => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({
  user,
  onUpdateUser,
  onExportData,
  onImportData,
  onResetData,
  onLockAppNow,
}) => {
  const [fullName, setFullName] = useState(user.fullName);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [isPinEnabled, setIsPinEnabled] = useState(user.isPinEnabled);
  const [pinCode, setPinCode] = useState(user.pinCode || '1234');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [importJsonText, setImportJsonText] = useState('');
  const [showImportBox, setShowImportBox] = useState(false);
  const [importStatus, setImportStatus] = useState<string | null>(null);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      isPinEnabled,
      pinCode: pinCode.trim(),
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handlePerformImport = () => {
    if (!importJsonText.trim()) return;
    const ok = onImportData(importJsonText);
    if (ok) {
      setImportStatus("Ma'lumotlar muvaffaqiyatli tiklandi!");
      setShowImportBox(false);
      setImportJsonText('');
    } else {
      setImportStatus("Xatolik: JSON formati noto‘g‘ri yoki buzilgan.");
    }
  };

  return (
    <div className="space-y-5 pb-12">
      {/* Branding Card */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/80 shadow-2xs space-y-4 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <BabyDoctorLogo size="md" layout="col" />
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-slate-800">Tizim sozlamalari va xavfsizlik</h2>
            <p className="text-xs text-slate-500">
              Ota-ona hisobi, PIN-kod himoyasi va ma'lumotlar zaxirasi
            </p>
          </div>
        </div>

        {isPinEnabled && (
          <button
            onClick={onLockAppNow}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Hozir qulflash</span>
          </button>
        )}
      </div>

      {/* Parent Profile Form */}
      <form onSubmit={handleSaveProfile} className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/80 shadow-2xs space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <User className="w-4 h-4 text-sky-600" />
          <h3 className="text-sm font-bold text-slate-800">Ota-ona (Vasiy) profili</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              F.I.SH.
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:border-sky-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Telefon raqami
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:border-sky-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Elektron pochta
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:border-sky-500"
          />
        </div>

        {/* Security & PIN */}
        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-sky-600" />
              <div>
                <strong className="text-xs text-slate-800">4 xonali PIN-kod himoyasi</strong>
                <p className="text-[11px] text-slate-500">Ilovaga kirishda bolaning tibbiy ma'lumotlarini himoyalash</p>
              </div>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isPinEnabled}
                onChange={(e) => setIsPinEnabled(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sky-600"></div>
            </label>
          </div>

          {isPinEnabled && (
            <div className="pt-2 border-t border-slate-200/60 flex items-center gap-3">
              <label className="text-xs text-slate-600 font-medium">Joriy PIN-kod:</label>
              <input
                type="text"
                maxLength={4}
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
                className="w-24 px-3 py-1.5 rounded-xl border border-slate-300 text-sm font-bold text-center tracking-widest bg-white"
              />
              <span className="text-[11px] text-slate-400">Standart: 1234</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-1">
          {savedSuccess && (
            <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
              <Check className="w-4 h-4" />
              <span>Muvaffaqiyatli saqlandi!</span>
            </span>
          )}
          <button
            type="submit"
            className="ml-auto px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5"
          >
            <Save className="w-4 h-4" />
            <span>Sozlamalarni saqlash</span>
          </button>
        </div>
      </form>

      {/* Data Management: Backup & Export */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/80 shadow-2xs space-y-3">
        <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
          <FileCode className="w-4 h-4 text-sky-600" />
          <span>Ma'lumotlar xavfsizligi va zaxirasi</span>
        </h3>
        <p className="text-xs text-slate-500 leading-relaxed">
          Barcha tibbiy ma'lumotlar maxfiy saqlanadi. Ma'lumotlaringizni zaxira qilib yuklab olishingiz yoki boshqa qurilmaga o‘tkazishingiz mumkin.
        </p>

        <div className="flex flex-wrap gap-2.5 pt-1">
          <button
            onClick={onExportData}
            className="px-3.5 py-2 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Zaxirani yuklab olish (JSON)</span>
          </button>

          <button
            onClick={() => setShowImportBox(!showImportBox)}
            className="px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <Upload className="w-4 h-4" />
            <span>Zaxiradan tiklash (Import)</span>
          </button>

          <button
            onClick={onResetData}
            className="px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Demo holatiga qaytarish</span>
          </button>
        </div>

        {showImportBox && (
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 mt-2">
            <label className="block text-xs font-semibold text-slate-700">
              Eksport qilingan JSON matnini shu yerga joylang:
            </label>
            <textarea
              rows={3}
              value={importJsonText}
              onChange={(e) => setImportJsonText(e.target.value)}
              placeholder='{"user": {...}, "babies": [...]}'
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono bg-white"
            />
            <button
              onClick={handlePerformImport}
              className="px-4 py-1.5 rounded-xl bg-sky-600 text-white text-xs font-bold hover:bg-sky-700"
            >
              Tiklashni tasdiqlash
            </button>
            {importStatus && (
              <p className="text-xs text-sky-700 font-medium">{importStatus}</p>
            )}
          </div>
        )}
      </div>

      {/* Graduation Project MedTech Evaluation Card */}
      <div className="p-5 sm:p-6 rounded-3xl bg-[#FDFBF7] border border-amber-200/80 space-y-3">
        <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
          <GraduationCap className="w-5 h-5 text-amber-700" />
          <span>Universitet diplom loyihasi (Graduation Project)</span>
        </div>

        <div className="space-y-1 text-xs text-amber-950">
          <p>
            Loyiha nomi: <strong>“Baby Doctor”</strong> — Kichkintoylar salomatligini kuzatish va boshqarish axborot tizimi.
          </p>
          <p className="text-amber-900/90 leading-relaxed text-[11px]">
            Yo‘nalish: <strong>Tibbiy axborot texnologiyalari (MedTech)</strong>. Dastur ota-onalar uchun chaqaloq parvarishidagi ma'lumotlarni markazlashtirilgan tartibda saqlash, JSST tavsiyalari bo‘yicha o‘sish ko‘rsatkichlarini hisoblash va O‘zbekiston Milliy Emlash Taqvimi bo‘yicha emlash jadvalini xavfsiz boshqarish maqsadida yaratilgan.
          </p>
        </div>
      </div>

      {/* Standard medical disclaimer */}
      <MedicalDisclaimerBanner compact={false} />
    </div>
  );
};
