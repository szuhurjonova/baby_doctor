import React, { useState } from 'react';
import { MedicalRecord, PrescribedMedication } from '../types/medical.ts';
import { X, Calendar, Plus, Trash2, Stethoscope, Building, FileText, Pill, HeartPulse } from 'lucide-react';

interface MedicalRecordModalProps {
  isOpen: boolean;
  onClose: () => void;
  record: MedicalRecord | null;
  onSave: (record: MedicalRecord) => void;
  babyId: string;
}

export const MedicalRecordModal: React.FC<MedicalRecordModalProps> = ({
  isOpen,
  onClose,
  record,
  onSave,
  babyId,
}) => {
  if (!isOpen) return null;

  const [visitDate, setVisitDate] = useState(
    record?.visitDate || new Date().toISOString().split('T')[0]
  );
  const [title, setTitle] = useState(record?.title || '');
  const [doctorName, setDoctorName] = useState(record?.doctorName || 'Dr. Sayyora Karimova');
  const [specialty, setSpecialty] = useState(record?.specialty || 'Pediatr');
  const [clinic, setClinic] = useState(record?.clinic || '1-sonli Bolalar poliklinikasi');
  const [diagnosis, setDiagnosis] = useState(record?.diagnosis || '');
  const [symptomsInput, setSymptomsInput] = useState(record?.symptoms.join(', ') || '');
  const [doctorNotes, setDoctorNotes] = useState(record?.doctorNotes || '');
  const [nextAppointmentDate, setNextAppointmentDate] = useState(record?.nextAppointmentDate || '');
  const [temperature, setTemperature] = useState(record?.vitalSigns?.temperatureC ? String(record.vitalSigns.temperatureC) : '');
  const [weight, setWeight] = useState(record?.vitalSigns?.weightKg ? String(record.vitalSigns.weightKg) : '');
  const [height, setHeight] = useState(record?.vitalSigns?.heightCm ? String(record.vitalSigns.heightCm) : '');

  // Prescriptions list
  const [prescriptions, setPrescriptions] = useState<PrescribedMedication[]>(
    record?.prescriptions || []
  );

  const handleAddMedication = () => {
    setPrescriptions([
      ...prescriptions,
      {
        id: `rx-${Date.now()}`,
        name: '',
        dosage: '',
        frequency: '',
        durationDays: 5,
        instructions: '',
      },
    ]);
  };

  const handleUpdateMed = (index: number, field: keyof PrescribedMedication, val: any) => {
    const list = [...prescriptions];
    list[index] = { ...list[index], [field]: val };
    setPrescriptions(list);
  };

  const handleRemoveMed = (index: number) => {
    setPrescriptions(prescriptions.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const symptomsList = symptomsInput
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    const savedRecord: MedicalRecord = {
      id: record ? record.id : `med-${Date.now()}`,
      babyId,
      visitDate,
      title: title.trim(),
      doctorName: doctorName.trim(),
      specialty: specialty.trim(),
      clinic: clinic.trim(),
      reasonForVisit: title.trim(),
      diagnosis: diagnosis.trim() || 'Profilaktik ko\'rik natijasi',
      symptoms: symptomsList,
      vitalSigns: {
        temperatureC: temperature ? parseFloat(temperature) : undefined,
        weightKg: weight ? parseFloat(weight) : undefined,
        heightCm: height ? parseFloat(height) : undefined,
      },
      prescriptions: prescriptions.filter(p => p.name.trim()),
      doctorNotes: doctorNotes.trim(),
      nextAppointmentDate: nextAppointmentDate || undefined,
      createdAt: record ? record.createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    onSave(savedRecord);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-xl bg-white rounded-3xl p-5 sm:p-6 shadow-2xl border border-slate-100 max-h-[90vh] flex flex-col my-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-800">
              {record ? 'Tibbiy tashrifni tahrirlash' : 'Yangi shifokor ko‘rigini qo‘shish'}
            </h3>
            <p className="text-xs text-slate-500">
              Pediatr yoki mutaxassis shifokor qabuli xulosasini saqlang
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
              Tashrif mavzusi / Sababi *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Masalan: 6 oylik rejaviy profilaktik ko‘rik"
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-sky-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tashrif sanasi *
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="date"
                  required
                  value={visitDate}
                  onChange={(e) => setVisitDate(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Mutaxassislik
              </label>
              <select
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white"
              >
                <option value="Pediatr">Pediatr</option>
                <option value="Bolalar Nevrologi">Bolalar Nevrologi</option>
                <option value="Bolalar Ortopedi">Bolalar Ortopedi</option>
                <option value="Bolalar Oftalmologi (Ko'z)">Bolalar Oftalmologi</option>
                <option value="LOR (Quloq, tomoq, burun)">LOR</option>
                <option value="Allergolog">Allergolog</option>
                <option value="Bolalar Jarrohi">Bolalar Jarrohi</option>
                <option value="Boshqa mutaxassis">Boshqa</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Shifokor F.I.SH.
              </label>
              <div className="relative">
                <Stethoscope className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={doctorName}
                  onChange={(e) => setDoctorName(e.target.value)}
                  placeholder="Dr. Karimova"
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Klinika / Poliklinika
              </label>
              <div className="relative">
                <Building className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={clinic}
                  onChange={(e) => setClinic(e.target.value)}
                  placeholder="1-sonli Bolalar poliklinikasi"
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs"
                />
              </div>
            </div>
          </div>

          {/* Vitals */}
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
              <HeartPulse className="w-4 h-4 text-sky-600" />
              <span>Ko‘rik vaqtidagi asosiy parametrlar</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-[11px] text-slate-600 mb-1">Harorat (°C)</label>
                <input
                  type="number"
                  step="0.1"
                  value={temperature}
                  onChange={(e) => setTemperature(e.target.value)}
                  placeholder="36.6"
                  className="w-full px-2 py-1.5 rounded-xl border border-slate-200 text-xs bg-white text-center"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-600 mb-1">Vazn (kg)</label>
                <input
                  type="number"
                  step="0.05"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="7.8"
                  className="w-full px-2 py-1.5 rounded-xl border border-slate-200 text-xs bg-white text-center"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-600 mb-1">Bo‘yi (sm)</label>
                <input
                  type="number"
                  step="0.5"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="67"
                  className="w-full px-2 py-1.5 rounded-xl border border-slate-200 text-xs bg-white text-center"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Shifokor tashxisi / Xulosa
            </label>
            <input
              type="text"
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              placeholder="Masalan: Yoshiga mos somatik sog‘lom bola"
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Kuzatilgan belgilar (vergul bilan ajrating)
            </label>
            <input
              type="text"
              value={symptomsInput}
              onChange={(e) => setSymptomsInput(e.target.value)}
              placeholder="Masalan: Yo‘tal, ishtaha pasayishi, tish chiqishi"
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
            />
          </div>

          {/* Prescriptions */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Pill className="w-4 h-4 text-emerald-600" />
                <span>Shifokor yozgan tavsiyanoma / Dorilar</span>
              </label>
              <button
                type="button"
                onClick={handleAddMedication}
                className="text-xs font-semibold text-sky-600 hover:text-sky-700 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Dori qo‘shish</span>
              </button>
            </div>

            {prescriptions.length === 0 ? (
              <p className="text-xs text-slate-400 italic">Dori tayinlanmagan yoki profilaktik ko‘rik</p>
            ) : (
              <div className="space-y-2">
                {prescriptions.map((med, idx) => (
                  <div key={med.id || idx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-2">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 flex-1">
                      <input
                        type="text"
                        placeholder="Dori nomi (masalan: Akvadetrim)"
                        value={med.name}
                        onChange={(e) => handleUpdateMed(idx, 'name', e.target.value)}
                        className="px-2 py-1 rounded-lg border border-slate-200 text-xs bg-white"
                      />
                      <input
                        type="text"
                        placeholder="Dozasi (1 tomchi / 2.5 ml)"
                        value={med.dosage}
                        onChange={(e) => handleUpdateMed(idx, 'dosage', e.target.value)}
                        className="px-2 py-1 rounded-lg border border-slate-200 text-xs bg-white"
                      />
                      <input
                        type="text"
                        placeholder="Davomiyligi (kuniga 1 marta, 30 kun)"
                        value={med.frequency}
                        onChange={(e) => handleUpdateMed(idx, 'frequency', e.target.value)}
                        className="px-2 py-1 rounded-lg border border-slate-200 text-xs bg-white"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveMed(idx)}
                      className="p-1.5 text-slate-400 hover:text-rose-600"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Shifokor ko‘rsatmalari va ota-onaga tavsiyalar
            </label>
            <textarea
              rows={3}
              value={doctorNotes}
              onChange={(e) => setDoctorNotes(e.target.value)}
              placeholder="Emlash ruxsati, ovqatlanish tartibi, xonani shamollatish..."
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Keyingi rejaviy ko‘rik sanasi
            </label>
            <div className="relative">
              <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="date"
                value={nextAppointmentDate}
                onChange={(e) => setNextAppointmentDate(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs bg-white"
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
              {record ? 'Saqlash' : 'Qaydni qo‘shish'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
