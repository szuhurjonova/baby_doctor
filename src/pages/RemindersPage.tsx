import React, { useState } from 'react';
import { ReminderItem, ReminderType, ReminderPriority } from '../types/growth.ts';
import { formatDateUz } from '../utils/dateUtils.ts';
import {
  Bell,
  Plus,
  Check,
  Trash2,
  Calendar,
  Clock,
  AlertCircle,
  Syringe,
  Pill,
  Stethoscope,
  X
} from 'lucide-react';

interface RemindersPageProps {
  reminders: ReminderItem[];
  onToggleReminder: (id: string) => void;
  onAddReminder: (reminder: ReminderItem) => void;
  onDeleteReminder: (id: string) => void;
  babyId: string;
}

export const RemindersPage: React.FC<RemindersPageProps> = ({
  reminders,
  onToggleReminder,
  onAddReminder,
  onDeleteReminder,
  babyId,
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('active');

  // New form fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState(new Date().toISOString().split('T')[0]);
  const [type, setType] = useState<ReminderType>('umumiy');
  const [priority, setPriority] = useState<ReminderPriority>('muhim');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newReminder: ReminderItem = {
      id: `rem-${Date.now()}`,
      babyId,
      title: title.trim(),
      description: description.trim(),
      dueDate,
      type,
      priority,
      isCompleted: false,
      createdAt: new Date().toISOString(),
    };

    onAddReminder(newReminder);
    setIsAdding(false);
    setTitle('');
    setDescription('');
  };

  const filtered = reminders.filter((r) => {
    if (filter === 'active') return !r.isCompleted;
    if (filter === 'completed') return r.isCompleted;
    return true;
  });

  return (
    <div className="space-y-5 pb-12">
      {/* Header */}
      <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Bell className="w-4 h-4" />
              </div>
              <h2 className="text-lg font-bold text-slate-800">
                Eslatmalar va bildirishnomalar
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Rejalashtirilgan vaksinalar, shifokor ko‘riklari va dori qabullari
            </p>
          </div>

          <button
            onClick={() => setIsAdding(true)}
            className="px-3.5 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Yangi eslatma</span>
          </button>
        </div>

        {/* Filter controls */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl text-xs">
          <button
            onClick={() => setFilter('active')}
            className={`flex-1 py-1.5 font-semibold rounded-lg transition-colors ${
              filter === 'active' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
            }`}
          >
            Faol ({reminders.filter(r => !r.isCompleted).length})
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`flex-1 py-1.5 font-semibold rounded-lg transition-colors ${
              filter === 'completed' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
            }`}
          >
            Bajarilgan ({reminders.filter(r => r.isCompleted).length})
          </button>
          <button
            onClick={() => setFilter('all')}
            className={`flex-1 py-1.5 font-semibold rounded-lg transition-colors ${
              filter === 'all' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
            }`}
          >
            Barchasi ({reminders.length})
          </button>
        </div>
      </div>

      {/* Inline Form to add reminder */}
      {isAdding && (
        <form onSubmit={handleSave} className="p-5 rounded-3xl bg-white border border-sky-200 shadow-md space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-800">Yangi eslatma qo‘shish</h3>
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Eslatma sarlavhasi *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Masalan: D-vitamini ertalabki tomchisi"
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:border-sky-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Batafsil ma'lumot
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Qanday beriladi yoki qaysi poliklinikada..."
              className="w-full px-3 py-1.5 rounded-xl border border-slate-200 text-xs focus:outline-hidden"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Sana *</label>
              <input
                type="date"
                required
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-2 py-1.5 rounded-xl border border-slate-200 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Turi</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as ReminderType)}
                className="w-full px-2 py-1.5 rounded-xl border border-slate-200 text-xs bg-white"
              >
                <option value="dori">Dori vositasi</option>
                <option value="shifokor_korigi">Shifokor ko‘rigi</option>
                <option value="vaksina">Vaksina</option>
                <option value="olchov">Oylik o‘lchov</option>
                <option value="umumiy">Umumiy eslatma</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Muhimlik darajasi</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as ReminderPriority)}
                className="w-full px-2 py-1.5 rounded-xl border border-slate-200 text-xs bg-white"
              >
                <option value="oddiy">Oddiy</option>
                <option value="muhim">Muhim</option>
                <option value="shoshilinch">Shoshilinch</option>
              </select>
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="flex-1 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50"
            >
              Bekor qilish
            </button>
            <button
              type="submit"
              className="flex-1 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold"
            >
              Saqlash
            </button>
          </div>
        </form>
      )}

      {/* Reminders List */}
      <div className="space-y-2.5">
        {filtered.length === 0 ? (
          <div className="p-8 rounded-3xl bg-white border border-slate-200 text-center space-y-2">
            <p className="text-xs text-slate-500">Hech qanday eslatma yo‘q</p>
          </div>
        ) : (
          filtered.map((item) => (
            <div
              key={item.id}
              className={`p-3.5 sm:p-4 rounded-2xl border transition-all flex items-start justify-between gap-3 ${
                item.isCompleted
                  ? 'bg-slate-50/70 border-slate-200 text-slate-400'
                  : 'bg-white border-slate-200/80 shadow-2xs hover:border-sky-300'
              }`}
            >
              <div className="flex items-start gap-3">
                <button
                  onClick={() => onToggleReminder(item.id)}
                  className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-colors shrink-0 mt-0.5 ${
                    item.isCompleted
                      ? 'bg-emerald-500 border-emerald-500 text-white'
                      : 'border-slate-300 hover:border-sky-500 bg-white'
                  }`}
                  title={item.isCompleted ? 'Qayta faollashtirish' : 'Bajarildi deb belgilash'}
                >
                  {item.isCompleted && <Check className="w-4 h-4" />}
                </button>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3
                      className={`text-xs sm:text-sm font-bold ${
                        item.isCompleted ? 'line-through text-slate-400' : 'text-slate-800'
                      }`}
                    >
                      {item.title}
                    </h3>
                    {item.priority === 'muhim' && !item.isCompleted && (
                      <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded-sm bg-amber-100 text-amber-800">
                        Muhim
                      </span>
                    )}
                  </div>

                  {item.description && (
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {item.description}
                    </p>
                  )}

                  <div className="flex items-center gap-2 text-[11px] text-slate-400">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Muddati: {formatDateUz(item.dueDate)}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onDeleteReminder(item.id)}
                className="p-1.5 text-slate-300 hover:text-rose-600 rounded-lg"
                title="O‘chirish"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
