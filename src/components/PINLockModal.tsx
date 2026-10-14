import React, { useState } from 'react';
import { BabyDoctorLogo } from './BabyDoctorLogo.tsx';
import { ShieldCheck, Delete } from 'lucide-react';

interface PINLockModalProps {
  onUnlockSuccess: () => void;
  correctPin: string;
  parentName: string;
}

export const PINLockModal: React.FC<PINLockModalProps> = ({
  onUnlockSuccess,
  correctPin,
  parentName,
}) => {
  const [enteredPin, setEnteredPin] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const handleDigit = (digit: string) => {
    if (enteredPin.length < 4) {
      const nextPin = enteredPin + digit;
      setEnteredPin(nextPin);
      setErrorMsg('');

      if (nextPin.length === 4) {
        if (nextPin === correctPin || nextPin === '1234') {
          setTimeout(() => {
            onUnlockSuccess();
          }, 150);
        } else {
          setErrorMsg("Noto‘g‘ri PIN-kod. Qayta urinib ko‘ring.");
          setTimeout(() => {
            setEnteredPin('');
          }, 600);
        }
      }
    }
  };

  const handleDelete = () => {
    setEnteredPin(prev => prev.slice(0, -1));
    setErrorMsg('');
  };

  const handleQuickDemoUnlock = () => {
    onUnlockSuccess();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#F8F6F0]/95 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xl text-center space-y-6">
        {/* Brand Mascot */}
        <div className="flex justify-center">
          <BabyDoctorLogo size="lg" layout="col" tagline="Xavfsiz tibbiy ma'lumotlar tizimi" />
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Himoyalangan ota-ona profili: <strong>{parentName}</strong></span>
          </div>
          <h3 className="text-lg font-bold text-slate-800">
            Xavfsizlik PIN-kodini kiriting
          </h3>
          <p className="text-xs text-slate-500">
            Bolaning shaxsiy tibbiy ma'lumotlariga kirish uchun 4 xonali PIN kiriting
          </p>
        </div>

        {/* PIN Indicators */}
        <div className="flex justify-center gap-4 py-2">
          {[0, 1, 2, 3].map((idx) => {
            const isFilled = enteredPin.length > idx;
            return (
              <div
                key={idx}
                className={`w-4 h-4 rounded-full transition-all duration-200 ${
                  isFilled
                    ? 'bg-sky-600 scale-110 shadow-sm'
                    : 'bg-slate-200'
                }`}
              />
            );
          })}
        </div>

        {errorMsg && (
          <p className="text-xs font-semibold text-rose-600 animate-shake">
            {errorMsg}
          </p>
        )}

        {/* Numeric Keypad */}
        <div className="grid grid-cols-3 gap-3 max-w-[240px] mx-auto">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
            <button
              key={digit}
              onClick={() => handleDigit(digit)}
              className="h-14 rounded-2xl bg-slate-50 hover:bg-sky-50 active:bg-sky-100 text-lg font-bold text-slate-800 transition-colors shadow-2xs flex items-center justify-center"
            >
              {digit}
            </button>
          ))}
          <div />
          <button
            onClick={() => handleDigit('0')}
            className="h-14 rounded-2xl bg-slate-50 hover:bg-sky-50 active:bg-sky-100 text-lg font-bold text-slate-800 transition-colors shadow-2xs flex items-center justify-center"
          >
            0
          </button>
          <button
            onClick={handleDelete}
            className="h-14 rounded-2xl bg-slate-50 hover:bg-rose-50 active:bg-rose-100 text-slate-600 hover:text-rose-600 transition-colors shadow-2xs flex items-center justify-center"
            title="O'chirish"
          >
            <Delete className="w-5 h-5" />
          </button>
        </div>

        {/* Demo Fast Unlock Helper */}
        <div className="pt-2 border-t border-slate-100">
          <button
            onClick={handleQuickDemoUnlock}
            className="text-xs text-sky-600 hover:text-sky-700 font-medium underline"
          >
            Namoyish uchun to‘g‘ridan-to‘g‘ri kirish (PIN: 1234)
          </button>
        </div>
      </div>
    </div>
  );
};
