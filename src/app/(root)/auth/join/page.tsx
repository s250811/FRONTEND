'use client';

import { useState } from 'react';
import TermsStep from './_components/terms';
import EmailStep from './_components/email';
import PasswordStep from './_components/password';
import EmailAuthStep from './_components/email-auth';
import { SignUpStep } from './_types';

export default function SignUpPage() {
    const [step, setStep] = useState<SignUpStep>('terms');

    return (
        <main className="flex-1 grid place-items-center px-4 animate-[fade-in_0.15s_ease-out]">
            <div key={step} className="w-full max-w-[520px] animate-[fade-in-up_0.2s_ease-out]">
                {step === 'terms' ? (
                    <TermsStep onNext={() => setStep('email')} />
                ) : step === 'email' ? (
                    <EmailStep onBack={() => setStep('terms')} onNext={() => setStep('password')} />
                ) : step === 'password' ? (
                    <PasswordStep onBack={() => setStep('email')} onNext={() => setStep('email-auth')} />
                ) : step === 'email-auth' ? (
                    <EmailAuthStep onBack={() => setStep('password')} />
                ) : null}
            </div>
        </main>
    );
}
