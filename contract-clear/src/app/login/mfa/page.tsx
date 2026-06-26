"use client";

import { MfaVerifyForm } from "@/components/MfaVerifyForm";

export default function LoginMfaPage() {
  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-2xl p-8">
        <h1 className="text-xl font-bold mb-6 text-white">Two-factor authentication</h1>
        <MfaVerifyForm />
      </div>
    </main>
  );
}
