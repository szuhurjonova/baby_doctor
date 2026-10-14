import React, { useState } from 'react';
import { ShieldAlert, Info, ChevronDown, ChevronUp } from 'lucide-react';

interface MedicalDisclaimerBannerProps {
  compact?: boolean;
}

export const MedicalDisclaimerBanner: React.FC<MedicalDisclaimerBannerProps> = ({ compact = false }) => {
  const [isExpanded, setIsExpanded] = useState(!compact);

  if (compact && !isExpanded) {
    return (
      <button
        onClick={() => setIsExpanded(true)}
        className="w-full text-left p-2.5 rounded-2xl bg-amber-50/70 border border-amber-200/60 text-amber-900 text-xs flex items-center justify-between transition-colors hover:bg-amber-100/60"
      >
        <span className="flex items-center gap-2 font-medium">
          <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
          <span>Muhim eslatma: Ilova diagnostika yoki davolash tizimi emas</span>
        </span>
        <ChevronDown className="w-3.5 h-3.5 text-amber-600 shrink-0" />
      </button>
    );
  }

  return (
    <div className="rounded-2xl bg-amber-50/80 border border-amber-200/80 p-3.5 text-xs text-amber-950 transition-all shadow-xs">
      <div className="flex items-start justify-between gap-2.5">
        <div className="flex items-start gap-2.5">
          <div className="w-7 h-7 rounded-xl bg-amber-200/70 flex items-center justify-center shrink-0 text-amber-800 mt-0.5">
            <Info className="w-4 h-4" />
          </div>
          <div className="space-y-1">
            <h4 className="font-semibold text-amber-900 text-xs">
              Tibbiy ma'lumotlarni saqlash tizimi (MedTech)
            </h4>
            <p className="text-amber-800/90 leading-relaxed text-[11px]">
              <strong>“Baby Doctor”</strong> ilovasi diagnostika tizimi emas va tibbiy tashxis, davolash bo‘yicha ko‘rsatma yoki dorilar dozasini bermaydi. Ilovaning asosiy vazifasi — bolaning salomatlik kartasi, vaksina taqvimi, allergiyalari va tibbiy tarixini ota-onalar uchun xavfsiz tartibga solish va saqlashdir. Har qanday kasallik va davolashda shaxsiy pediatrga murojaat qiling.
            </p>
          </div>
        </div>

        {compact && (
          <button
            onClick={() => setIsExpanded(false)}
            className="p-1 rounded-lg text-amber-700 hover:bg-amber-200/50"
            title="Yopish"
          >
            <ChevronUp className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
