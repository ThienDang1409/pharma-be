"use client";

import Link from "next/link";
import { useLanguage } from "@/app/context/LanguageContext";
import enTranslations from "@/locales/en.json";
import viTranslations from "@/locales/vi.json";

const translations = {
  en: enTranslations,
  vi: viTranslations,
};

interface ServicesDropdownProps {
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export default function ServicesDropdown({
  onMouseEnter,
  onMouseLeave,
}: ServicesDropdownProps) {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div
      className="fixed left-0 right-0 top-[56px] z-50"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="bg-white border-t-4 border-red-700 shadow-xl">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 p-8 max-w-md mx-auto">
            {/* Services List */}
            <div>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/services/financial"
                    className="text-base text-gray-700 hover:text-red-600 flex items-center gap-2"
                  >
                    <span className="text-red-600">›</span>
                    {t.dropdowns.financialServices}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/installation"
                    className="text-base text-gray-700 hover:text-red-600 flex items-center gap-2"
                  >
                    <span className="text-red-600">›</span>
                    {t.dropdowns.installation}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/qualification"
                    className="text-base text-gray-700 hover:text-red-600 flex items-center gap-2"
                  >
                    <span className="text-red-600">›</span>
                    {t.dropdowns.qualification}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/training"
                    className="text-base text-gray-700 hover:text-red-600 flex items-center gap-2"
                  >
                    <span className="text-red-600">›</span>
                    {t.dropdowns.training}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
