import React from 'react';
import { UserRole } from '../types/user.ts';
import {
  Home,
  Syringe,
  FileText,
  AlertTriangle,
  User,
  Users,
  LayoutDashboard,
  ShieldCheck,
  Stethoscope
} from 'lucide-react';

export type ParentNavTab = 'dashboard' | 'vaccines' | 'medical' | 'allergies' | 'profile';
export type DoctorNavTab = 'dashboard' | 'patients' | 'vaccines' | 'medical' | 'profile';
export type AnyNavTab = ParentNavTab | DoctorNavTab;

interface NavigationProps {
  currentTab: string;
  onChangeTab: (tab: any) => void;
  userRole: UserRole;
  vaccineAlertCount?: number;
  allergyCount?: number;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentTab,
  onChangeTab,
  userRole,
  vaccineAlertCount = 0,
  allergyCount = 0,
}) => {
  // Navigation for PARENT:
  // Bosh sahifa, Vaksinalar, Tibbiy tarix, Allergiyalar, Profil
  const parentItems = [
    {
      id: 'dashboard',
      label: 'Bosh sahifa',
      icon: Home,
    },
    {
      id: 'vaccines',
      label: 'Vaksinalar',
      icon: Syringe,
      badge: vaccineAlertCount > 0 ? vaccineAlertCount : undefined,
      badgeColor: 'bg-rose-500',
    },
    {
      id: 'medical',
      label: 'Tibbiy tarix',
      icon: FileText,
    },
    {
      id: 'allergies',
      label: 'Allergiyalar',
      icon: AlertTriangle,
      badge: allergyCount > 0 ? allergyCount : undefined,
      badgeColor: 'bg-amber-500',
    },
    {
      id: 'profile',
      label: 'Profil',
      icon: User,
    },
  ];

  // Navigation for DOCTOR:
  // Dashboard, Bemorlar, Vaksinalar, Tibbiy tarix, Profil
  const doctorItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
    },
    {
      id: 'patients',
      label: 'Bemorlar',
      icon: Users,
    },
    {
      id: 'vaccines',
      label: 'Vaksinalar',
      icon: Syringe,
      badge: vaccineAlertCount > 0 ? vaccineAlertCount : undefined,
      badgeColor: 'bg-amber-500',
    },
    {
      id: 'medical',
      label: 'Tibbiy tarix',
      icon: FileText,
    },
    {
      id: 'profile',
      label: 'Profil',
      icon: Stethoscope,
    },
  ];

  const items = userRole === 'doctor' ? doctorItems : parentItems;

  return (
    <>
      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200/80 px-2 py-1.5 shadow-lg pb-safe">
        <div className="grid grid-cols-5 gap-0.5 max-w-lg mx-auto">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onChangeTab(item.id)}
                className={`relative flex flex-col items-center justify-center py-1 px-1 rounded-2xl transition-all duration-150 ${
                  isActive
                    ? userRole === 'doctor'
                      ? 'text-emerald-700 font-semibold'
                      : 'text-sky-600 font-semibold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <div className="relative">
                  <div
                    className={`w-9 h-8 flex items-center justify-center rounded-xl transition-all ${
                      isActive
                        ? userRole === 'doctor'
                          ? 'bg-emerald-100/80 text-emerald-700 scale-105'
                          : 'bg-sky-100/80 text-sky-600 scale-105'
                        : ''
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  {item.badge !== undefined && (
                    <span
                      className={`absolute -top-1 -right-1.5 w-4 h-4 rounded-full text-[10px] text-white flex items-center justify-center font-bold ring-2 ring-white ${item.badgeColor}`}
                    >
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className="text-[10px] leading-tight mt-0.5 truncate max-w-full">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Desktop / Tablet Sub-Header Bar */}
      <div className="hidden md:block bg-white border-b border-slate-200/80 shadow-2xs">
        <div className="max-w-4xl mx-auto px-6 flex items-center gap-2 py-2">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onChangeTab(item.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? userRole === 'doctor'
                      ? 'bg-emerald-50 text-emerald-800 shadow-2xs ring-1 ring-emerald-300'
                      : 'bg-sky-50 text-sky-700 shadow-2xs ring-1 ring-sky-200'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Icon
                  className={`w-4 h-4 ${
                    isActive
                      ? userRole === 'doctor'
                        ? 'text-emerald-700'
                        : 'text-sky-600'
                      : 'text-slate-400'
                  }`}
                />
                <span>{item.label}</span>
                {item.badge !== undefined && (
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] text-white font-bold leading-none ${item.badgeColor}`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};
