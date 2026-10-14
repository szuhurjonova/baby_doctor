import React, { useState } from 'react';
import { DoctorProfile } from '../../types/user.ts';
import { BabyDoctorLogo } from '../../components/BabyDoctorLogo.tsx';
import {
  Stethoscope,
  ShieldCheck,
  Building,
  Phone,
  Mail,
  User,
  Save,
  Check,
  Award,
  Calendar
} from 'lucide-react';

interface DoctorProfilePageProps {
  doctor: DoctorProfile;
  onUpdateDoctor: (update: Partial<DoctorProfile>) => void;
}

export const DoctorProfilePage: React.FC<DoctorProfilePageProps> = ({
  doctor,
  onUpdateDoctor,
}) => {
  const [fullName, setFullName] = useState(doctor.fullName);
  const [age, setAge] = useState(String(doctor.age));
  const [specialty, setSpecialty] = useState(doctor.specialty);
  const [clinic, setClinic] = useState(doctor.clinic);
  const [phone, setPhone] = useState(doctor.phone);
  const [email, setEmail] = useState(doctor.email);
  const [doctorId, setDoctorId] = useState(doctor.doctorId);
  const [licenseNumber, setLicenseNumber] = useState(doctor.licenseNumber);
  const [bio, setBio] = useState(doctor.bio || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateDoctor({
      fullName: fullName.trim(),
      age: parseInt(age) || 38,
      specialty: specialty.trim(),
      clinic: clinic.trim(),
      phone: phone.trim(),
      email: email.trim(),
      doctorId: doctorId.trim(),
      licenseNumber: licenseNumber.trim(),
      bio: bio.trim(),
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-5 pb-12">
      {/* Branding Header */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/80 shadow-2xs space-y-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <BabyDoctorLogo size="md" layout="col" />
          <div className="space-y-1 text-center sm:text-left">
            <h2 className="text-lg font-bold text-slate-800">Shifokor profili va litsenziyasi</h2>
            <p className="text-xs text-slate-500">
              Vakolatli pediatr mutaxassisining rasmiy hisobi
            </p>
          </div>
        </div>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Tasdiqlangan tibbiy vakolat</span>
        </div>
      </div>

      {/* Official Electronic Stamp Card */}
      <div className="p-5 rounded-3xl bg-emerald-50/70 border border-emerald-300 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-emerald-700" />
            <h3 className="text-xs font-bold text-emerald-950 uppercase tracking-wider">
              Shifokor elektron tibbiy muhri (Elektron imzo)
            </h3>
          </div>
          <span className="font-mono text-xs bg-emerald-200 text-emerald-900 px-2.5 py-1 rounded-lg font-bold">
            UZ-MED-STAMP-{doctor.doctorId}
          </span>
        </div>

        <div className="p-3.5 rounded-2xl bg-white border border-emerald-200 text-xs space-y-1 text-slate-700">
          <div className="flex justify-between">
            <span className="text-slate-500">Shifokor F.I.SH.:</span>
            <strong className="text-slate-900">{doctor.fullName}</strong>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Mutaxassislik:</span>
            <span>{doctor.specialty}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Muassasa:</span>
            <span>{doctor.clinic}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Litsenziya raqami:</span>
            <span className="font-mono">{doctor.licenseNumber}</span>
          </div>
          <div className="flex justify-between pt-1 border-t border-slate-100">
            <span className="text-slate-500">Tasdiqlangan vaksinalar soni:</span>
            <strong className="text-emerald-700">{doctor.verifiedBadgesCount} ta emlash</strong>
          </div>
        </div>
      </div>

      {/* Doctor Profile Form */}
      <form onSubmit={handleSave} className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/80 shadow-2xs space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <Stethoscope className="w-4 h-4 text-emerald-600" />
          <h3 className="text-sm font-bold text-slate-800">Shaxsiy va xizmat ma'lumotlari</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Shifokor F.I.SH. *
            </label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Yoshi *
            </label>
            <input
              type="number"
              required
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:border-emerald-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Mutaxassisligi *
            </label>
            <input
              type="text"
              required
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
              placeholder="Pediatr"
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Poliklinika / Tibbiyot muassasasi *
            </label>
            <input
              type="text"
              required
              value={clinic}
              onChange={(e) => setClinic(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:border-emerald-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Shifokor ID kodi *
            </label>
            <input
              type="text"
              required
              value={doctorId}
              onChange={(e) => setDoctorId(e.target.value)}
              placeholder="DOC-UZ-7892"
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Davlat tibbiy litsenziyasi *
            </label>
            <input
              type="text"
              required
              value={licenseNumber}
              onChange={(e) => setLicenseNumber(e.target.value)}
              placeholder="MED-LIC-2024-9123"
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Telefon raqami
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Elektron pochta
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-hidden"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Qisqa bio / Malaka va tajriba
          </label>
          <textarea
            rows={2}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-hidden"
          />
        </div>

        <div className="flex items-center justify-between pt-2">
          {savedSuccess && (
            <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
              <Check className="w-4 h-4" />
              <span>Shifokor profili yangilandi!</span>
            </span>
          )}
          <button
            type="submit"
            className="ml-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5"
          >
            <Save className="w-4 h-4" />
            <span>Profilni saqlash</span>
          </button>
        </div>
      </form>
    </div>
  );
};
