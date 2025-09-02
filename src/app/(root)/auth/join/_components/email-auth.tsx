// app/auth/verify/page.tsx
"use client";

import { FormEvent, useState } from "react";

export default function EmailAuthStep({ onBack }: { onBack: () => void; }) {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;
    setLoading(true);
    try {
      // TODO: 서버 검증 로직 연결
      await new Promise((r) => setTimeout(r, 600));
      alert(`인증코드: ${code}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex items-center justify-center p-6 mt-[70px] mb-[70px]">
      <div className="mx-auto max-w-[420px] px-6 py-16 grid place-items-center min-h-screen">
        <section className="w-full text-center space-y-6">
          {/* 제목/부제목 */}
          <header className="space-y-2">
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900">
              이메일 본인인증을 해주세요!
            </h1>
            <p className="text-sm text-gray-500">Please enter your email address.</p>
          </header>

          {/* 폼 */}
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label htmlFor="code" className="sr-only">
                인증번호
              </label>
              <input
                id="code"
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                placeholder="이메일로 발송된 인증번호를 입력해 주세요."
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-11 rounded-full bg-emerald-50 ring-1 ring-emerald-100 px-4 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </div>

            <button
              type="submit"
              disabled={!code.trim() || loading}
              className="mt-[30px] w-full h-11 rounded-full bg-black text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {loading ? "확인 중..." : "가입완료"}
            </button>
          </form>

          {/* 뒤로가기 */}
          <div>
            <a href="/auth" className="text-sm text-[#008547] underline mt-[25px]">
              Back
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}