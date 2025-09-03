'use client';

import React, { useId, useState } from 'react';
import { tv } from 'tailwind-variants';

/**
 * WorkspaceInviteModal
 * - Next.js/React + TypeScript + Tailwind Variants
 * - Styled similar to the screenshot (invite by email)
 */

const overlay = tv({
    base: 'fixed inset-0 bg-black/30 backdrop-blur-[1px] flex items-center justify-center p-4',
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

export default function WorkspaceInviteModalDemo() {
    const [email, setEmail] = useState('');
    const emailId = useId();

    const onSubmit: React.FormEventHandler<HTMLFormElement> = e => {
        e.preventDefault();
        alert('Invited!\n' + JSON.stringify({ email }, null, 2));
    };

    return (
        <div className="min-h-dvh bg-gray-50">
            {/* Modal Overlay */}
            <div className={overlay()}>
                <div className={modal()} role="dialog" aria-modal="true" aria-labelledby="invite-modal-title">
                    <div className={header()}>
                        <h2 id="invite-modal-title">워크스페이스 초대하기</h2>
                        <button className={closeButton()} aria-label="닫기" onClick={() => alert('닫기 버튼 클릭')}>
                            ×
                        </button>
                    </div>

                    <form onSubmit={onSubmit} noValidate>
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
                                    onClick={() => alert('+ 버튼 클릭')}
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        <div className={divider()} />
                        <div className={footer()}>
                            <button
                                type="button"
                                className={buttonBase({ intent: 'outline' })}
                                onClick={() => alert('취소')}
                            >
                                취소하기
                            </button>
                            <button type="submit" className={buttonBase({ intent: 'solid' })}>
                                초대하기
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
