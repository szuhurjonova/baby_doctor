import React from 'react';
import { BabyDoctorLogo } from './BabyDoctorLogo.tsx';
import { BabyProfile } from '../types/baby.ts';
import { UserRole, DoctorProfile } from '../types/user.ts';
import { calculateAge } from '../utils/dateUtils.ts';
import { Bell, Lock, ChevronDown, Printer, Stethoscope, Users } from 'lucide-react';

interface HeaderProps {
  activeBaby: BabyProfile;
  babies: BabyProfile[];
  userRole: UserRole;
  doctor: DoctorProfile;
  onOpenBabySwitcher: () => void;
  onOpenNotifications: () => void;
  onOpenHealthPassport: () => void;
  onLockApp: () => void;
  isPinEnabled: boolean;
  unreadCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeBaby,
  userRole,
  doctor,
  onOpenBabySwitcher,
  onOpenNotifications,
  onOpenHealthPassport,
  onLockApp,
  isPinEnabled,
  unreadCount,
}) => {
  const age = calculateAge(activeBaby.birthDate);

  return (
    <header className="sticky top-0 z-30 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-amber-100/60 px-4 py-2 sm:px-6">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
        {/* Left: Brand Logo */}
        <div className="flex items-center gap-2">
          <BabyDoctorLogo size="sm" showTagline={false} />
          {userRole === 'doctor' && (
            <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold border border-emerald-300">
              <Stethoscope className="w-3 h-3" />
              <span>Doctor Portal</span>
            </span>
          )}
        </div>

        {/* Right side: Role specific actions */}
        <div className="flex items-center gap-2">
          {/* Patient Selector button (works in both roles) */}
          <button
            onClick={onOpenBabySwitcher}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-white border shadow-xs transition-all text-left ${
              userRole === 'doctor'
                ? 'border-emerald-300 hover:bg-emerald-50/50'
                : 'border-slate-200/80 hover:border-sky-300 hover:bg-sky-50/30'
            }`}
            title="Bemor bolani almashtirish"
          >
            <div
              className={`w-7 h-7 rounded-full text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-2xs ${
                activeBaby.gender === 'ogil' ? 'bg-sky-500' : 'bg-pink-500'
              }`}
            >
              {activeBaby.fullName.charAt(0)}
            </div>
            <div className="hidden min-[380px]:block leading-tight">
              <div className="text-xs font-bold text-slate-800 flex items-center gap-1">
                <span className="truncate max-w-[100px] sm:max-w-[140px]">{activeBaby.fullName}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </div>
              <div className="text-[10px] text-slate-500 font-medium">
                {age.formattedUz}
              </div>
            </div>
          </button>

          {/* Health Passport Export Button */}
          <button
            onClick={onOpenHealthPassport}
            className="w-9 h-9 rounded-2xl bg-white border border-slate-200/80 text-slate-600 hover:text-sky-600 hover:bg-sky-50/50 flex items-center justify-center transition-colors shadow-xs"
            title="Salomatlik pasporti (Chop etish)"
          >
            <Printer className="w-4 h-4" />
          </button>

          {/* Notifications Bell (Shows unread count for parent, especially vaccine verification) */}
          <button
            onClick={onOpenNotifications}
            className="relative w-9 h-9 rounded-2xl bg-white border border-slate-200/80 text-slate-600 hover:text-sky-600 hover:bg-sky-50/50 flex items-center justify-center transition-colors shadow-xs"
            title="Bildirishnomalar"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>

          {/* PIN Lock action */}
          {userRole === 'parent' && isPinEnabled && (
            <button
              onClick={onLockApp}
              className="w-9 h-9 rounded-2xl bg-white border border-slate-200/80 text-slate-600 hover:text-rose-600 hover:bg-rose-50/50 flex items-center justify-center transition-colors shadow-xs"
              title="Ilovani qulflash"
            >
              <Lock className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
