/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { storage } from './services/storageService.ts';
import { BabyProfile } from './types/baby.ts';
import { VaccineRecord } from './types/vaccine.ts';
import { MedicalRecord } from './types/medical.ts';
import { AllergyRecord } from './types/allergy.ts';
import { GrowthRecord, ReminderItem } from './types/growth.ts';
import { ParentUser, DoctorProfile, UserRole } from './types/user.ts';
import { AppNotification } from './types/notification.ts';

// UI Components
import { RoleSwitcherBar } from './components/RoleSwitcherBar.tsx';
import { Header } from './components/Header.tsx';
import { Navigation } from './components/Navigation.tsx';
import { PINLockModal } from './components/PINLockModal.tsx';
import { BabySwitcherModal } from './components/BabySwitcherModal.tsx';
import { DoctorVerificationModal } from './components/DoctorVerificationModal.tsx';
import { ParentVaccineModal } from './components/ParentVaccineModal.tsx';
import { NotificationsModal } from './components/NotificationsModal.tsx';
import { MedicalRecordModal } from './components/MedicalRecordModal.tsx';
import { AllergyModal } from './components/AllergyModal.tsx';
import { GrowthRecordModal } from './components/GrowthRecordModal.tsx';
import { HealthPassportModal } from './components/HealthPassportModal.tsx';

// Parent Pages
import { DashboardPage } from './pages/DashboardPage.tsx';
import { VaccinesPage } from './pages/VaccinesPage.tsx';
import { MedicalHistoryPage } from './pages/MedicalHistoryPage.tsx';
import { AllergiesPage } from './pages/AllergiesPage.tsx';
import { SettingsPage } from './pages/SettingsPage.tsx';

// Doctor Pages
import { DoctorDashboardPage } from './pages/doctor/DoctorDashboardPage.tsx';
import { DoctorPatientsPage } from './pages/doctor/DoctorPatientsPage.tsx';
import { DoctorVaccinesPage } from './pages/doctor/DoctorVaccinesPage.tsx';
import { DoctorMedicalHistoryPage } from './pages/doctor/DoctorMedicalHistoryPage.tsx';
import { DoctorProfilePage } from './pages/doctor/DoctorProfilePage.tsx';

export default function App() {
  // Role State (Parent UI or Doctor UI)
  const [currentRole, setCurrentRole] = useState<UserRole>(storage.getCurrentRole());

  // Navigation Tabs for active role
  const [parentTab, setParentTab] = useState<'dashboard' | 'vaccines' | 'medical' | 'allergies' | 'profile'>('dashboard');
  const [doctorTab, setDoctorTab] = useState<'dashboard' | 'patients' | 'vaccines' | 'medical' | 'profile'>('dashboard');

  // Core Data States
  const [user, setUser] = useState<ParentUser>(storage.getUser());
  const [doctor, setDoctor] = useState<DoctorProfile>(storage.getDoctorProfile());
  const [babies, setBabies] = useState<BabyProfile[]>(storage.getBabies());
  const [activeBaby, setActiveBaby] = useState<BabyProfile>(storage.getActiveBaby());
  const [vaccines, setVaccines] = useState<VaccineRecord[]>(storage.getVaccines(activeBaby.id));
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>(storage.getMedicalRecords(activeBaby.id));
  const [allergies, setAllergies] = useState<AllergyRecord[]>(storage.getAllergies(activeBaby.id));
  const [growthRecords, setGrowthRecords] = useState<GrowthRecord[]>(storage.getGrowthRecords(activeBaby.id));
  const [reminders, setReminders] = useState<ReminderItem[]>(storage.getReminders(activeBaby.id));
  const [notifications, setNotifications] = useState<AppNotification[]>(storage.getNotifications(activeBaby.id));

  // Security Lock
  const [isLocked, setIsLocked] = useState<boolean>(storage.isAppLocked());

  // Toast banner for workflow confirmation
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modals
  const [isBabySwitcherOpen, setIsBabySwitcherOpen] = useState(false);
  const [isHealthPassportOpen, setIsHealthPassportOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [selectedVaccineForVerify, setSelectedVaccineForVerify] = useState<VaccineRecord | null>(null);
  const [selectedVaccineForParent, setSelectedVaccineForParent] = useState<VaccineRecord | null>(null);
  const [isMedicalModalOpen, setIsMedicalModalOpen] = useState(false);
  const [selectedMedicalRecord, setSelectedMedicalRecord] = useState<MedicalRecord | null>(null);
  const [isAllergyModalOpen, setIsAllergyModalOpen] = useState(false);
  const [selectedAllergy, setSelectedAllergy] = useState<AllergyRecord | null>(null);
  const [isGrowthModalOpen, setIsGrowthModalOpen] = useState(false);

  // Refresh all entities for active baby
  const refreshBabyData = (babyId: string) => {
    setVaccines(storage.getVaccines(babyId));
    setMedicalRecords(storage.getMedicalRecords(babyId));
    setAllergies(storage.getAllergies(babyId));
    setGrowthRecords(storage.getGrowthRecords(babyId));
    setReminders(storage.getReminders(babyId));
    setNotifications(storage.getNotifications(babyId));
  };

  const handleSwitchRole = (role: UserRole) => {
    storage.setRole(role);
    setCurrentRole(role);
  };

  const handleSelectBaby = (id: string) => {
    storage.setActiveBabyId(id);
    const newActive = storage.getActiveBaby();
    setActiveBaby(newActive);
    refreshBabyData(newActive.id);
  };

  const handleSaveNewBaby = (newBaby: BabyProfile) => {
    storage.saveBaby(newBaby);
    setBabies(storage.getBabies());
    handleSelectBaby(newBaby.id);
  };

  const handleUpdateBaby = (updatedBaby: BabyProfile) => {
    storage.saveBaby(updatedBaby);
    setBabies(storage.getBabies());
    setActiveBaby(updatedBaby);
  };

  // --- CRITICAL WORKFLOW: Doctor verifies administered vaccine ---
  const handleConfirmDoctorVerification = (data: {
    administeredDate: string;
    batchNumber: string;
    clinicalNotes: string;
    clinic: string;
  }) => {
    if (!selectedVaccineForVerify) return;

    try {
      const res = storage.verifyVaccineByDoctor(activeBaby.id, selectedVaccineForVerify.id, data);
      setVaccines(storage.getVaccines(activeBaby.id));
      setNotifications(storage.getNotifications(activeBaby.id));
      setDoctor(storage.getDoctorProfile());

      // Trigger user toast feedback
      setToastMessage(`✓ "${res.vaccine.nameUz}" vaksinasi tasdiqlandi va ota-onaga xabarnoma yuborildi!`);
      setTimeout(() => setToastMessage(null), 4000);
    } catch (err: any) {
      console.error(err);
    }
  };

  const handleSaveParentNotes = (vaccineId: string, notes: string) => {
    const v = vaccines.find(item => item.id === vaccineId);
    if (v) {
      storage.saveVaccine({ ...v, notes });
      setVaccines(storage.getVaccines(activeBaby.id));
    }
  };

  const handleOpenAddCustomVaccine = () => {
    const customVac: VaccineRecord = {
      id: `vac-custom-${Date.now()}`,
      babyId: activeBaby.id,
      vaccineKey: `custom-${Date.now()}`,
      nameUz: 'Yangi rejaviy emlash',
      nameEn: 'Custom Vaccine',
      descriptionUz: 'Shifokor ko‘rsatmasiga binoan kiritilgan vaksina',
      doseNumber: 1,
      totalDoses: 1,
      targetAgeMonths: 6,
      targetAgeLabel: 'Shifokor tavsiyasiga ko‘ra',
      dueDate: new Date().toISOString().split('T')[0],
      status: 'kutilmoqda',
      isMandatoryNationalSchedule: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    storage.saveVaccine(customVac);
    setVaccines(storage.getVaccines(activeBaby.id));
    if (currentRole === 'doctor') {
      setSelectedVaccineForVerify(customVac);
    } else {
      setSelectedVaccineForParent(customVac);
    }
  };

  // Medical Record Handlers
  const handleSaveMedicalRecord = (record: MedicalRecord) => {
    storage.saveMedicalRecord(record);
    setMedicalRecords(storage.getMedicalRecords(activeBaby.id));
  };

  const handleDeleteMedicalRecord = (id: string) => {
    storage.deleteMedicalRecord(id, activeBaby.id);
    setMedicalRecords(storage.getMedicalRecords(activeBaby.id));
  };

  // Allergy Handlers
  const handleSaveAllergy = (allergy: AllergyRecord) => {
    storage.saveAllergy(allergy);
    setAllergies(storage.getAllergies(activeBaby.id));
  };

  const handleDeleteAllergy = (id: string) => {
    storage.deleteAllergy(id, activeBaby.id);
    setAllergies(storage.getAllergies(activeBaby.id));
  };

  // Growth Handlers
  const handleSaveGrowthRecord = (rec: GrowthRecord) => {
    storage.saveGrowthRecord(rec);
    setGrowthRecords(storage.getGrowthRecords(activeBaby.id));
    setActiveBaby(storage.getActiveBaby());
  };

  const handleDeleteGrowthRecord = (id: string) => {
    storage.deleteGrowthRecord(id, activeBaby.id);
    setGrowthRecords(storage.getGrowthRecords(activeBaby.id));
    setActiveBaby(storage.getActiveBaby());
  };

  // Reminders Handlers
  const handleToggleReminder = (id: string) => {
    storage.toggleReminderCompleted(id, activeBaby.id);
    setReminders(storage.getReminders(activeBaby.id));
  };

  // Settings & User Handlers
  const handleUpdateParent = (update: Partial<ParentUser>) => {
    storage.updateUser(update);
    setUser(storage.getUser());
  };

  const handleUpdateDoctor = (update: Partial<DoctorProfile>) => {
    storage.updateDoctorProfile(update);
    setDoctor(storage.getDoctorProfile());
  };

  const handleExportData = () => {
    const jsonStr = storage.exportDataJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `baby-doctor-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImportData = (jsonStr: string) => {
    const success = storage.importDataJSON(jsonStr);
    if (success) {
      setUser(storage.getUser());
      setDoctor(storage.getDoctorProfile());
      setBabies(storage.getBabies());
      const current = storage.getActiveBaby();
      setActiveBaby(current);
      refreshBabyData(current.id);
      return true;
    }
    return false;
  };

  const handleResetData = () => {
    if (window.confirm("Barcha ma'lumotlarni boshlang'ich namoyish holatiga qaytarishni xohlaysizmi?")) {
      storage.resetToDefaultDemo();
      setUser(storage.getUser());
      setDoctor(storage.getDoctorProfile());
      setBabies(storage.getBabies());
      const current = storage.getActiveBaby();
      setActiveBaby(current);
      refreshBabyData(current.id);
    }
  };

  // Security Lock Handlers
  const handleUnlockSuccess = () => {
    storage.setAppLocked(false);
    setIsLocked(false);
  };

  const handleLockNow = () => {
    storage.setAppLocked(true);
    setIsLocked(true);
  };

  const handleMarkAllNotificationsRead = () => {
    storage.markAllNotificationsAsRead(activeBaby.id);
    setNotifications(storage.getNotifications(activeBaby.id));
  };

  // Counters
  const unreadNotificationsCount = notifications.filter(n => !n.isRead).length;
  const overdueVaccinesCount = vaccines.filter(v => v.status === 'muddati_otgan').length;

  return (
    <div className="min-h-screen bg-[#F8F6F0] flex flex-col font-sans">
      {/* Security PIN Screen (if app locked in parent mode) */}
      {isLocked && currentRole === 'parent' && (
        <PINLockModal
          onUnlockSuccess={handleUnlockSuccess}
          correctPin={user.pinCode || '1234'}
          parentName={user.fullName}
        />
      )}

      {/* Role Switcher Bar at top */}
      <RoleSwitcherBar
        currentRole={currentRole}
        onSwitchRole={handleSwitchRole}
        doctorName={doctor.fullName}
        parentName={user.fullName}
      />

      {/* Toast banner for real-time verification feedback */}
      {toastMessage && (
        <div className="bg-emerald-600 text-white text-xs px-4 py-2 text-center font-bold shadow-md animate-fade-in flex items-center justify-center gap-2">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Top Header */}
      <Header
        activeBaby={activeBaby}
        babies={babies}
        userRole={currentRole}
        doctor={doctor}
        onOpenBabySwitcher={() => setIsBabySwitcherOpen(true)}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        onOpenHealthPassport={() => setIsHealthPassportOpen(true)}
        onLockApp={handleLockNow}
        isPinEnabled={user.isPinEnabled}
        unreadCount={unreadNotificationsCount}
      />

      {/* Navigation (Tabs for active role: Parent or Doctor) */}
      <Navigation
        currentTab={currentRole === 'doctor' ? doctorTab : parentTab}
        onChangeTab={(tab) => {
          if (currentRole === 'doctor') {
            setDoctorTab(tab);
          } else {
            setParentTab(tab);
          }
        }}
        userRole={currentRole}
        vaccineAlertCount={overdueVaccinesCount}
        allergyCount={allergies.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-4 sm:px-6">
        {/* ==================== 1. PARENT UI ==================== */}
        {currentRole === 'parent' && (
          <>
            {parentTab === 'dashboard' && (
              <DashboardPage
                baby={activeBaby}
                vaccines={vaccines}
                medicalRecords={medicalRecords}
                allergies={allergies}
                reminders={reminders}
                growthRecords={growthRecords}
                onNavigateTab={(tab) => {
                  if (tab === 'baby') setParentTab('profile');
                  else if (tab === 'vaccines') setParentTab('vaccines');
                  else if (tab === 'medical') setParentTab('medical');
                  else if (tab === 'allergies') setParentTab('allergies');
                  else if (tab === 'reminders') setIsNotificationsOpen(true);
                }}
                onOpenAddGrowth={() => setIsGrowthModalOpen(true)}
                onOpenAddMedical={() => {
                  setSelectedMedicalRecord(null);
                  setIsMedicalModalOpen(true);
                }}
                onOpenAddAllergy={() => {
                  setSelectedAllergy(null);
                  setIsAllergyModalOpen(true);
                }}
                onSelectVaccine={(v) => setSelectedVaccineForParent(v)}
                onToggleReminder={handleToggleReminder}
                onOpenAddReminder={() => setIsNotificationsOpen(true)}
              />
            )}

            {parentTab === 'vaccines' && (
              <VaccinesPage
                vaccines={vaccines}
                onSelectVaccine={(v) => setSelectedVaccineForParent(v)}
                onOpenAddVaccine={handleOpenAddCustomVaccine}
              />
            )}

            {parentTab === 'medical' && (
              <MedicalHistoryPage
                records={medicalRecords}
                onOpenAddRecord={() => {
                  setSelectedMedicalRecord(null);
                  setIsMedicalModalOpen(true);
                }}
                onEditRecord={(rec) => {
                  setSelectedMedicalRecord(rec);
                  setIsMedicalModalOpen(true);
                }}
                onDeleteRecord={handleDeleteMedicalRecord}
              />
            )}

            {parentTab === 'allergies' && (
              <AllergiesPage
                allergies={allergies}
                onOpenAddAllergy={() => {
                  setSelectedAllergy(null);
                  setIsAllergyModalOpen(true);
                }}
                onEditAllergy={(item) => {
                  setSelectedAllergy(item);
                  setIsAllergyModalOpen(true);
                }}
                onDeleteAllergy={handleDeleteAllergy}
              />
            )}

            {parentTab === 'profile' && (
              <SettingsPage
                user={user}
                onUpdateUser={handleUpdateParent}
                onExportData={handleExportData}
                onImportData={handleImportData}
                onResetData={handleResetData}
                onLockAppNow={handleLockNow}
              />
            )}
          </>
        )}

        {/* ==================== 2. DOCTOR UI ==================== */}
        {currentRole === 'doctor' && (
          <>
            {doctorTab === 'dashboard' && (
              <DoctorDashboardPage
                doctor={doctor}
                activeBaby={activeBaby}
                babies={babies}
                vaccines={vaccines}
                medicalRecords={medicalRecords}
                onSelectBaby={handleSelectBaby}
                onNavigateTab={(tab) => setDoctorTab(tab as any)}
                onOpenVerifyModal={(v) => setSelectedVaccineForVerify(v)}
                onOpenAddMedicalModal={() => {
                  setSelectedMedicalRecord(null);
                  setIsMedicalModalOpen(true);
                }}
              />
            )}

            {doctorTab === 'patients' && (
              <DoctorPatientsPage
                babies={babies}
                activeBabyId={activeBaby.id}
                onSelectBaby={handleSelectBaby}
                onOpenAddNewPatient={() => setIsBabySwitcherOpen(true)}
                onNavigateToVaccines={() => setDoctorTab('vaccines')}
                onNavigateToMedical={() => setDoctorTab('medical')}
              />
            )}

            {doctorTab === 'vaccines' && (
              <DoctorVaccinesPage
                vaccines={vaccines}
                baby={activeBaby}
                onOpenVerifyModal={(v) => setSelectedVaccineForVerify(v)}
                onSelectVaccineDetails={(v) => setSelectedVaccineForVerify(v)}
                onOpenAddCustomVaccine={handleOpenAddCustomVaccine}
              />
            )}

            {doctorTab === 'medical' && (
              <DoctorMedicalHistoryPage
                records={medicalRecords}
                baby={activeBaby}
                onOpenAddRecord={() => {
                  setSelectedMedicalRecord(null);
                  setIsMedicalModalOpen(true);
                }}
                onEditRecord={(rec) => {
                  setSelectedMedicalRecord(rec);
                  setIsMedicalModalOpen(true);
                }}
                onDeleteRecord={handleDeleteMedicalRecord}
              />
            )}

            {doctorTab === 'profile' && (
              <DoctorProfilePage
                doctor={doctor}
                onUpdateDoctor={handleUpdateDoctor}
              />
            )}
          </>
        )}
      </main>

      {/* ==================== Modals ==================== */}
      {/* Patient / Baby Switcher Modal */}
      <BabySwitcherModal
        isOpen={isBabySwitcherOpen}
        onClose={() => setIsBabySwitcherOpen(false)}
        babies={babies}
        activeBabyId={activeBaby.id}
        onSelectBaby={handleSelectBaby}
        onSaveNewBaby={handleSaveNewBaby}
        onUpdateBaby={handleUpdateBaby}
      />

      {/* Doctor Verification Modal (For Doctor UI) */}
      <DoctorVerificationModal
        isOpen={!!selectedVaccineForVerify}
        onClose={() => setSelectedVaccineForVerify(null)}
        vaccine={selectedVaccineForVerify}
        baby={activeBaby}
        doctor={doctor}
        onConfirmVerification={handleConfirmDoctorVerification}
      />

      {/* Parent Vaccine Modal (For Parent UI - Can NOT verify, only view status & doctor stamp) */}
      <ParentVaccineModal
        isOpen={!!selectedVaccineForParent}
        onClose={() => setSelectedVaccineForParent(null)}
        vaccine={selectedVaccineForParent}
        onSaveParentNotes={handleSaveParentNotes}
      />

      {/* Notifications Modal (Shows "Vaksina shifokor tomonidan tasdiqlandi ✓") */}
      <NotificationsModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        notifications={notifications}
        onMarkAllAsRead={handleMarkAllNotificationsRead}
      />

      {/* Medical Record Modal */}
      <MedicalRecordModal
        isOpen={isMedicalModalOpen}
        onClose={() => setIsMedicalModalOpen(false)}
        record={selectedMedicalRecord}
        onSave={handleSaveMedicalRecord}
        babyId={activeBaby.id}
      />

      {/* Allergy Modal */}
      <AllergyModal
        isOpen={isAllergyModalOpen}
        onClose={() => setIsAllergyModalOpen(false)}
        allergy={selectedAllergy}
        onSave={handleSaveAllergy}
        babyId={activeBaby.id}
      />

      {/* Growth Record Modal */}
      <GrowthRecordModal
        isOpen={isGrowthModalOpen}
        onClose={() => setIsGrowthModalOpen(false)}
        baby={activeBaby}
        onSave={handleSaveGrowthRecord}
      />

      {/* Printable Child Health Passport Modal */}
      <HealthPassportModal
        isOpen={isHealthPassportOpen}
        onClose={() => setIsHealthPassportOpen(false)}
        baby={activeBaby}
        vaccines={vaccines}
        medicalRecords={medicalRecords}
        allergies={allergies}
      />
    </div>
  );
}
