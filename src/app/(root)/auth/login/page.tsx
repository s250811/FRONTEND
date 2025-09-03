'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Login() {
    const [showPw, setShowPw] = useState(false);

    return (
        <main className="min-h-dvh flex items-center justify-center bg-white px-4">
            <section className="w-full max-w-sm">
                {/* Title */}
                <h1 className="text-2xl md:text-[28px] font-extrabold text-gray-900 text-center">돌아오셔서 기뻐요!</h1>
                <p className="mt-1 text-sm text-gray-500 text-center">Glad to have you back!</p>

                {/* Form */}
                <form
                    className="mt-8 space-y-3"
                    onSubmit={e => {
                        e.preventDefault();
                        // TODO: 로그인 요청 로직
                    }}
                >
                    {/* Email */}
                    <label className="block">
                        <div className="sr-only">이메일</div>
                        <div className="flex items-center rounded-full bg-[#EAF8F1] border border-[#D7F0E6] px-5 h-12">
                            <input
                                type="email"
                                inputMode="email"
                                placeholder="이메일을 입력해주세요."
                                className="w-full bg-transparent outline-none placeholder:text-gray-400 text-gray-900"
                                required
                            />
                        </div>
                    </label>
                    {/* Password */}
                    <label className="block">
                        <div className="sr-only">비밀번호</div>
                        <div className="flex items-center rounded-full bg-[#EAF8F1] border border-[#D7F0E6] px-5 h-12">
                            <input
                                type={showPw ? 'text' : 'password'}
                                placeholder="비밀번호를 입력해주세요."
                                className="w-full bg-transparent outline-none placeholder:text-gray-400 text-gray-900"
                                required
                            />
                            <button
                                type="button"
                                aria-label={showPw ? '비밀번호 숨기기' : '비밀번호 보기'}
                                onClick={() => setShowPw(v => !v)}
                                className="ml-2 inline-flex items-center justify-center w-6 h-6 rounded-full hover:bg-black/5"
                            >
                                {showPw ? <EyeOffIcon /> : <EyeIcon />}
                            </button>
                        </div>
                    </label>
                    {/* Submit */}
                    <Link
                        href="/workspace"
                        className="inline-flex w-full h-12 items-center justify-center rounded-full bg-black text-white font-semibold tracking-tight"
                    >
                        로그인
                    </Link>
                    {/* Options row */}
                    <div className="flex items-center justify-between text-sm text-gray-600">
                        <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                            <input type="checkbox" className="size-4 rounded border-gray-300 text-black" />
                            <span>아이디 기억하기</span>
                        </label>

                        <Link
                            href="/auth/passwordless-login"
                            className="text-gray-800 underline underline-offset-2 hover:opacity-80"
                        >
                            비밀번호 없이 로그인
                        </Link>
                    </div>
                    {/* Divider */}
                    <div className="flex items-center gap-3 text-xs text-gray-400 pt-1">
                        <div className="h-px bg-gray-200 flex-1" />
                        <span>or continue with</span>
                        <div className="h-px bg-gray-200 flex-1" />
                    </div>
                </form>

                {/* Signup */}
                <div className="mt-4">
                    <Link
                        href="/auth/signup"
                        className="w-full h-12 rounded-full border border-black text-black font-semibold grid place-items-center hover:bg-black/5"
                    >
                        회원가입
                    </Link>
                </div>
            </section>
        </main>
    );
}

/* --- Icons --- */
function EyeIcon() {
    return (
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12Z" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    );
}

function EyeOffIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M17.94 17.94A10.94 10.94 0 0 1 12 19C5 19 1 12 1 12a21.86 21.86 0 0 1 5.08-5.94" />
            <path d="M9.88 5.09A10.94 10.94 0 0 1 12 5c7 0 11 7 11 7a21.86 21.86 0 0 1-3.17 4.49" />
            <path d="M1 1l22 22" />
        </svg>
    );
}
