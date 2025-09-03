'use client';

import { useMemo, useState } from 'react';

interface EmailStepProps {
    onBack: () => void;
    onNext: () => void;
}

export default function EmailStep({ onBack, onNext }: EmailStepProps) {
    const [email, setEmail] = useState('');
    const isValid = useMemo(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email), [email]);

    return (
        <section className="flex flex-col justify-center mt-[220px] mb-[216px]">
            <div className="text-center space-y-2">
                <h2 className="text-[28px] font-bold text-[#212121]">사용할 이메일을 입력해 주세요.</h2>
                <p className="text-[15px] text-[#212121] font-medium">Please enter your email address.</p>
            </div>

            <div className="space-y-2 mt-[54px]">
                <input
                    type="email"
                    inputMode="email"
                    placeholder="pickle@gmail.com"
                    className={`w-full rounded-full border px-4 py-3 outline-none
            ${email && !isValid ? 'border-red-400' : 'border-gray-300 focus:border-gray-500'}`}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    aria-invalid={!!email && !isValid}
                />
                {email && !isValid && <p className="text-sm text-red-500">올바른 이메일 주소를 입력해 주세요.</p>}
            </div>

            <div className="flex flex-col gap-3 mt-[46px]">
                <button
                    type="button"
                    disabled={!isValid}
                    onClick={onNext}
                    className={`h-12 rounded-full text-white transition
            ${isValid ? 'bg-black hover:opacity-90' : 'bg-gray-300 cursor-not-allowed'}`}
                >
                    다음
                </button>
                <button type="button" onClick={onBack} className="text-[15px] underline text-[#008547] mt-[25px]">
                    Back
                </button>
            </div>
        </section>
    );
}
