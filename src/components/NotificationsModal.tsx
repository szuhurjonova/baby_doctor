import React from 'react';
import { AppNotification } from '../types/notification.ts';
import { formatDateTimeUz } from '../utils/dateUtils.ts';
import { X, CheckCircle2, ShieldCheck, Bell, Clock, Building } from 'lucide-react';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: AppNotification[];
  onMarkAllAsRead: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllAsRead,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-md bg-white rounded-3xl p-5 sm:p-6 shadow-2xl border border-slate-100 max-h-[85vh] flex flex-col my-auto">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800">Bildirishnomalar</h3>
              <p className="text-xs text-slate-500">Shifokor tasdiqlari va tizim xabarlari</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-3 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Jami: {notifications.length} ta xabar
          </span>
          {notifications.some(n => !n.isRead) && (
            <button
              onClick={onMarkAllAsRead}
              className="text-xs text-sky-600 hover:text-sky-700 font-semibold"
            >
              Barchasini o‘qilgan deb belgilash
            </button>
          )}
        </div>

        <div className="overflow-y-auto space-y-2.5 flex-1 pr-1">
          {notifications.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-400 italic">
              Yangi bildirishnomalar mavjud emas
            </div>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                className={`p-3.5 rounded-2xl border transition-all space-y-2 ${
                  n.type === 'vaccine_verified'
                    ? 'bg-emerald-50/60 border-emerald-200/80 text-emerald-950'
                    : n.isRead
                    ? 'bg-white border-slate-200/70 text-slate-700'
                    : 'bg-sky-50/50 border-sky-200 text-slate-800'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {n.type === 'vaccine_verified' ? (
                      <span className="w-6 h-6 rounded-lg bg-emerald-500 text-white flex items-center justify-center shrink-0">
                        <ShieldCheck className="w-4 h-4" />
                      </span>
                    ) : (
                      <span className="w-6 h-6 rounded-lg bg-sky-500 text-white flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-4 h-4" />
                      </span>
                    )}
                    <h4 className="text-xs font-bold">{n.title}</h4>
                  </div>
                  <span className="text-[10px] text-slate-400 whitespace-nowrap">
                    {formatDateTimeUz(n.timestamp)}
                  </span>
                </div>

                <p className="text-xs leading-relaxed text-slate-600">
                  {n.message}
                </p>

                {n.metadata && (
                  <div className="p-2.5 rounded-xl bg-white/80 border border-emerald-200/80 text-[11px] space-y-1 text-slate-700">
                    {n.metadata.doctorName && (
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500">Tasdiqlagan shifokor:</span>
                        <strong className="text-slate-900">{n.metadata.doctorName}</strong>
                      </div>
                    )}
                    {n.metadata.clinic && (
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500">Tibbiy muassasa:</span>
                        <span>{n.metadata.clinic}</span>
                      </div>
                    )}
                    {n.metadata.verifiedTime && (
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500">Tasdiqlangan vaqt:</span>
                        <span>{n.metadata.verifiedTime}</span>
                      </div>
                    )}
                    {n.metadata.stampCode && (
                      <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                        <span className="text-slate-500">Elektron muhr kodi:</span>
                        <span className="font-mono text-emerald-800 font-bold text-[10px]">
                          {n.metadata.stampCode}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
