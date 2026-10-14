import React from 'react';
import { VaccineRecord } from '../types/vaccine.ts';
import { UserRole } from '../types/user.ts';
import { getVaccineStatusInfo, formatDateUz } from '../utils/dateUtils.ts';
import { Syringe, CheckCircle2, Clock, AlertTriangle, ChevronRight, ShieldCheck, Check } from 'lucide-react';

interface VaccineCardProps {
  vaccine: VaccineRecord;
  onClick: () => void;
  userRole?: UserRole;
  onDoctorVerifyClick?: (e: React.MouseEvent) => void;
}

export const VaccineCard: React.FC<VaccineCardProps> = ({
  vaccine,
  onClick,
  userRole = 'parent',
  onDoctorVerifyClick,
}) => {
  const statusInfo = getVaccineStatusInfo(vaccine.status);
  const isDoctorVerified = vaccine.status === 'shifokor_tasdiqlagan';

  return (
    <div
      onClick={onClick}
      className={`group relative p-4 rounded-3xl bg-white border transition-all cursor-pointer flex flex-col justify-between gap-3 ${
        isDoctorVerified
          ? 'border-emerald-200/90 shadow-2xs hover:border-emerald-400 hover:shadow-sm'
          : 'border-slate-200/70 shadow-2xs hover:border-sky-300 hover:shadow-sm'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div
            className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
              isDoctorVerified
                ? 'bg-emerald-100 text-emerald-700 ring-2 ring-emerald-300'
                : vaccine.status === 'olingan'
                ? 'bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200/60'
                : vaccine.status === 'muddati_otgan'
                ? 'bg-rose-50 text-rose-600 ring-1 ring-rose-200/60'
                : 'bg-sky-50 text-sky-600 ring-1 ring-sky-200/60'
            }`}
          >
            {isDoctorVerified ? (
              <ShieldCheck className="w-5 h-5 text-emerald-700" />
            ) : vaccine.status === 'olingan' ? (
              <CheckCircle2 className="w-5 h-5" />
            ) : vaccine.status === 'muddati_otgan' ? (
              <AlertTriangle className="w-5 h-5" />
            ) : (
              <Syringe className="w-5 h-5" />
            )}
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="text-sm font-bold text-slate-800 group-hover:text-sky-700 transition-colors">
                {vaccine.nameUz}
              </h4>
            </div>

            {/* Clean unboxed metadata with typographic separators */}
            <div className="flex items-center gap-1.5 text-xs text-slate-500 flex-wrap">
              <span>{vaccine.targetAgeLabel}</span>
              <span aria-hidden="true">·</span>
              <span>Doza {vaccine.doseNumber}/{vaccine.totalDoses || 1}</span>
              {vaccine.batchNumber && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono text-[11px]">{vaccine.batchNumber}</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Status indicator badge */}
        <div className="shrink-0 text-right">
          <span
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-semibold ${statusInfo.badgeBg} ${statusInfo.textColor} border ${statusInfo.borderColor}`}
          >
            {isDoctorVerified && <ShieldCheck className="w-3.5 h-3.5" />}
            <span>{statusInfo.label}</span>
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
        {vaccine.descriptionUz}
      </p>

      {/* Doctor verification snippet if verified */}
      {isDoctorVerified && vaccine.doctorVerification && (
        <div className="p-2 rounded-xl bg-emerald-50/60 border border-emerald-100 text-[11px] text-emerald-900 flex items-center justify-between">
          <div className="flex items-center gap-1.5 truncate">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span className="truncate">
              Tasdiqladi: <strong>{vaccine.doctorVerification.doctorName}</strong>
            </span>
          </div>
          <span className="font-mono text-[10px] text-emerald-700 font-bold shrink-0 ml-2">
            {vaccine.doctorVerification.stampCode}
          </span>
        </div>
      )}

      {/* Card footer */}
      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <div>
          {vaccine.administeredDate ? (
            <span className="text-emerald-700 font-medium">
              Emlangan: {formatDateUz(vaccine.administeredDate)}
            </span>
          ) : (
            <span>
              Rejalashtirilgan: <strong className="text-slate-700">{formatDateUz(vaccine.dueDate)}</strong>
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Doctor Mode: can verify if not verified */}
          {userRole === 'doctor' && !isDoctorVerified && onDoctorVerifyClick && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDoctorVerifyClick(e);
              }}
              className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
              title="Vaksinani tasdiqlash"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Tasdiqlash</span>
            </button>
          )}

          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-sky-600 transition-colors" />
        </div>
      </div>
    </div>
  );
};
