'use client';

import React, { useEffect, useId, useState } from 'react';
import { tv } from 'tailwind-variants';

export type InvitePayload = { email: string };

export default function WorkspaceInviteModal({
    open,
    onClose,
    onInvite,
}: {
    open: boolean;
    onClose: () => void;
    onInvite?: (payload: InvitePayload) => void;
}) {
    // State and hooks must be called unconditionally at the top level
    const [email, setEmail] = useState('');
    const emailId = useId();

    // Effect for handling ESC key
    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [onClose, open]);

    if (!open) return null;

    // ----- styles (모달 전용) -----
    const overlay = tv({
        base: 'fixed inset-0 bg-black/30 backdrop-blur-[1px] flex items-center justify-center p-4 z-50',
    });
    const modal = tv({
        base: 'w-full max-w-[600px] rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 overflow-hidden',
    });
    const header = tv({
        base: 'relative flex items-center justify-center h-14 bg-emerald-600 text-white text-[15px] font-semibold',
    });
    const closeButton = tv({
        base: 'absolute right-3 top-1/2 -translate-y-1/2 inline-flex h-8 w-8 items-center justify-center rounded-full text-white/90 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70',
    });
    const section = tv({ base: 'px-8 py-6' });
    const formGrid = tv({ base: 'grid grid-cols-[100px_1fr_auto] gap-x-3 gap-y-6 items-center' });
    const labelStyle = tv({ base: 'text-[13px] text-gray-700 flex items-center gap-1' });
    const requiredMark = tv({ base: 'text-rose-500' });
    const inputVariants = tv({
        base: [
            'block w-full h-11 rounded-xl border text-[13px] px-4 outline-none',
            'bg-white placeholder:text-gray-400',
            'border-gray-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20',
        ].join(' '),
    });
    const button = tv({
        slots: {
            base: 'inline-flex select-none items-center justify-center rounded-2xl px-6 h-11 text-[13px] font-semibold transition outline-none focus-visible:ring-2',
        },
        variants: {
            intent: {
                solid: 'bg-gray-900 text-white hover:bg-black focus-visible:ring-gray-300',
                outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 focus-visible:ring-gray-300',
                icon: 'bg-emerald-600 text-white hover:bg-emerald-700 focus-visible:ring-emerald-300 rounded-full h-8 w-8 p-0',
            },
        },
        defaultVariants: { intent: 'solid' },
    });
    const { base: buttonBase } = button();
    const divider = tv({ base: 'h-px bg-gray-100' });
    const footer = tv({ base: 'flex items-center justify-end gap-3 px-8 py-5' });

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = e => {
        e.preventDefault();
        if (!email) return;
        onInvite?.({ email });
    };

    return (
        <div className={overlay()} role="dialog" aria-modal="true" aria-labelledby="invite-modal-title">
            {/* backdrop 클릭 시 닫기 */}
            <button className="absolute inset-0" aria-hidden onClick={onClose} />
            <div className={modal()}>
                <div className={header()}>
                    <h2 id="invite-modal-title">워크스페이스 초대하기</h2>
                    <button className={closeButton()} aria-label="닫기" onClick={onClose}>
                        ×
                    </button>
                </div>

                <form onSubmit={handleSubmit} noValidate>
                    <div className={section()}>
                        <div className={formGrid()}>
                            <label htmlFor={emailId} className={labelStyle()}>
                                이메일 <span className={requiredMark()}>*</span>
                            </label>
                            <input
                                id={emailId}
                                type="email"
                                required
                                className={inputVariants()}
                                placeholder="이메일을 입력해주세요."
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                            <button
                                type="button"
                                className={buttonBase({ intent: 'icon' })}
                                onClick={() => email && onInvite?.({ email })}
                                aria-label="이메일 추가"
                                title="이메일 추가"
                            >
                                +
                            </button>
                        </div>
                    </div>

                    <div className={divider()} />
                    <div className={footer()}>
                        <button type="button" className={buttonBase({ intent: 'outline' })} onClick={onClose}>
                            취소하기
                        </button>
                        <button type="submit" className={buttonBase({ intent: 'solid' })}>
                            초대하기
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
