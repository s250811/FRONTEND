// app/auth/password/page.tsx
'use client';

import { useMemo, useState } from 'react';

export default function PasswordPage({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // 규칙: 6~20자, 대소문자/숫자/특수문자 포함
  const rules = useMemo(() => {
    const lenOk = password.length >= 6 && password.length <= 20;
    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasNum = /\d/.test(password);
    const hasSpec = /[^A-Za-z0-9]/.test(password);
    const comboOk = hasLower && hasUpper && hasNum && hasSpec;
    const matchOk = password.length > 0 && password === confirm;
    return { lenOk, comboOk, matchOk };
  }, [password, confirm]);

  const canSubmit = rules.lenOk && rules.comboOk && rules.matchOk;

  return (
    <main className="flex items-center justify-center p-6 mt-[135px] mb-[135px]">
      <div className="w-full max-w-[420px]">
        {/* 헤더 */}
        <div className="text-center mb-10 gap-y-2">
          <h1 className="text-[28px] font-extrabold tracking-tight text-gray-900">
            사용할 비밀번호를 입력해주세요.
          </h1>
          <p className="text-[15px]">Please enter your password.</p>
        </div>

        {/* 비밀번호 */}
        <label className="block text-[16px] text-[#212121] mb-2">비밀번호</label>
        <div className={`relative mb-2`}>
          <input
            type={showPw ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="6자 이상의 비밀번호"
            aria-invalid={!(password === '' || (rules.lenOk && rules.comboOk))}
            className={`w-full rounded-full bg-[#00E0B0]/4 border-[#212121]/20 outline-none px-4 pr-12 h-12 text-[15px] placeholder:text-gray-400 border
            ${password
                ? rules.lenOk && rules.comboOk
                  ? 'border-emerald-200 focus:ring-2 ring-emerald-200'
                  : 'border-rose-200 focus:ring-2 ring-rose-200'
                : 'border-emerald-100'}
          `}
          />
          {/* 보기/가리기 */}
          <button
            type="button"
            onClick={() => setShowPw((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full"
            aria-label={showPw ? '비밀번호 가리기' : '비밀번호 보기'}
          >
            {showPw ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </div>

        {/* 규칙 표시 */}
        <ul className="space-y-1 mb-6 text-sm">
          <li className="flex items-center gap-2">
            <CheckIcon ok={rules.lenOk} />
            <span className={rules.lenOk ? 'text-emerald-600' : 'text-gray-400'}>
              6-20자 이내
            </span>
          </li>
          <li className="flex items-center gap-2">
            <CheckIcon ok={rules.comboOk} />
            <span className={rules.comboOk ? 'text-emerald-600' : 'text-gray-400'}>
              대소문자, 숫자, 특수문자 포함
            </span>
          </li>
        </ul>

        {/* 비밀번호 확인 */}
        <label className="block text-[16px] text-[#212121] mb-2">비밀번호 확인</label>
        <div className="relative mb-2">
          <input
            type={showConfirm ? 'text' : 'password'}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="6자 이상의 비밀번호"
            aria-invalid={!(confirm === '' || rules.matchOk)}
            className={`w-full rounded-full bg-[#00E0B0]/4 border-[#212121]/20 outline-none px-4 pr-12 h-12 text-[15px] placeholder:text-gray-400 border
            ${confirm
                ? rules.matchOk
                  ? 'border-emerald-200 focus:ring-2 ring-emerald-200'
                  : 'border-rose-200 focus:ring-2 ring-rose-200'
                : 'border-emerald-100'}
          `}
          />
          <button
            type="button"
            onClick={() => setShowConfirm((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full"
            aria-label={showConfirm ? '비밀번호 가리기' : '비밀번호 보기'}
          >
            {showConfirm ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </div>

        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm">
            <CheckIcon ok={rules.matchOk} />
            <span className={rules.matchOk ? 'text-emerald-600' : 'text-gray-400'}>비밀번호 일치</span>
          </div>
        </div>

        {/* 버튼 */}
        <button
          type="button"
          disabled={!canSubmit}
          onClick={onNext}
          className={`w-full h-12 rounded-full font-semibold transition
            ${canSubmit ? 'bg-black text-white' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}
          `}
        >
          다음
        </button>

        {/* Back */}
        <div className="text-center mt-[25px]">
          <button
            type="button"
            onClick={() => history.back()}
            className="text-sm text-[#008547] underline underline-offset-2 hover:opacity-80"
          >
            Back
          </button>
        </div>
      </div>
    </main>
  );
}

/* ------- Icons (inline SVG) ------- */

function CheckIcon({ ok }: { ok: boolean }) {
  return (
    <span
      className={`inline-flex items-center justify-center w-5 h-5 rounded-full border
        ${ok ? 'bg-emerald-500 border-emerald-500' : 'bg-white border-gray-300'}
      `}
      aria-hidden="true"
    >
      {ok ? (
        <svg viewBox="0 0 24 24" className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 13l4 4L19 7" />
        </svg>
      ) : (
        <span className="w-2.5 h-2.5 rounded-full bg-transparent" />
      )}
    </span>
  );
}

function EyeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 3l18 18" />
      <path d="M10.58 10.58A3 3 0 0 0 12 15a3 3 0 0 0 2.42-4.42" />
      <path d="M9.88 5.09A10.94 10.94 0 0 1 12 5c7 0 11 7 11 7a16.91 16.91 0 0 1-3.04 3.95" />
      <path d="M6.61 6.61C3.87 8.06 2 12 2 12s4 7 11 7a10.87 10.87 0 0 0 4.39-.9" />
    </svg>
  );
}