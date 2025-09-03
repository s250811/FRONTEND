'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function PasswordlessPage() {
    const [email, setEmail] = useState('');
    const [pending, setPending] = useState(false);

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setPending(true);
        try {
            // TODO: 매직 링크 요청 API 호출
            // await fetch("/api/auth/magic-link", { method: "POST", body: JSON.stringify({ email }) });
            alert('로그인 링크를 이메일로 보냈어요. (데모)');
        } catch (err) {
            console.error(err);
            alert('전송에 실패했습니다. 잠시 후 다시 시도해주세요.');
        } finally {
            setPending(false);
        }
    }

    return (
        <main className="min-h-dvh flex items-center justify-center bg-white px-4">
            <section className="w-full max-w-sm">
                {/* Title */}
                <h1 className="text-2xl md:text-[28px] font-extrabold text-gray-900 text-center">
                    이메일로 로그인 링크를 보내드릴게요.
                </h1>
                <p className="mt-1 text-sm text-gray-500 text-center">
                    We&apos;ll send a login Magic link to your email.
                </p>

                {/* Form */}
                <form onSubmit={onSubmit} className="mt-8 space-y-3">
                    <label className="block">
                        <span className="sr-only">이메일</span>
                        <div className="flex items-center rounded-full bg-[#EAF8F1] border border-[#D7F0E6] px-5 h-12">
                            <input
                                type="email"
                                inputMode="email"
                                placeholder="이메일을 입력해주세요."
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className="w-full bg-transparent outline-none placeholder:text-gray-400 text-gray-900"
                                required
                                aria-invalid={false}
                            />
                        </div>
                    </label>

                    <button
                        type="submit"
                        disabled={pending}
                        className="w-full h-12 rounded-full bg-black text-white font-semibold tracking-tight disabled:opacity-60"
                    >
                        {pending ? '전송 중...' : '로그인 링크 보내기'}
                    </button>
                </form>

                {/* Back */}
                <div className="mt-4 text-center">
                    <Link
                        href="/auth/login"
                        className="text-sm text-emerald-900 underline underline-offset-2 hover:opacity-80"
                    >
                        Back
                    </Link>
                </div>
            </section>
        </main>
    );
}
