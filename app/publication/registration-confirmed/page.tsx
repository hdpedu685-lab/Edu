"use client";

import { useLanguage } from "@/lib/language-context";

export default function RegistrationConfirmedPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg text-center">
        <h1 className="text-2xl font-semibold mb-4">{t("registrationSuccess")}</h1>
        <p className="text-lg">{t("registrationSuccessMsg")}</p>
      </div>
    </div>
  );
}
