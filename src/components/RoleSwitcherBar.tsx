import React from 'react';
import { UserRole } from '../types/user.ts';
import { User, Stethoscope, ArrowLeftRight, Check } from 'lucide-react';

interface RoleSwitcherBarProps {
  currentRole: UserRole;
  onSwitchRole: (role: UserRole) => void;
  doctorName: string;
  parentName: string;
}

export const RoleSwitcherBar: React.FC<RoleSwitcherBarProps> = ({
  currentRole,
  onSwitchRole,
  doctorName,
  parentName,
}) => {
  return (
    <div className="bg-slate-900 text-white text-xs py-1.5 px-4 shadow-inner">
      <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">
            Tizim rejimi:
          </span>
          <div className="inline-flex rounded-xl bg-slate-800 p-0.5 border border-slate-700">
            <button
              onClick={() => onSwitchRole('parent')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                currentRole === 'parent'
                  ? 'bg-sky-500 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Ota-ona (Parent)</span>
            </button>

            <button
              onClick={() => onSwitchRole('doctor')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                currentRole === 'doctor'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Stethoscope className="w-3.5 h-3.5" />
              <span>Shifokor (Doctor UI)</span>
            </button>
          </div>
        </div>

        <div className="text-[11px] text-slate-400 flex items-center gap-1.5 ml-auto">
          {currentRole === 'parent' ? (
            <span>Faol ota-ona: <strong className="text-sky-300">{parentName}</strong></span>
          ) : (
            <span className="flex items-center gap-1 text-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Litsenziyali shifokor: <strong>{doctorName}</strong></span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
