'use client';

import React, { useId, useRef, useState } from 'react';
import { tv } from 'tailwind-variants';

export type CreateWorkspacePayload = {
    name: string;
    description: string;
    avatar: string | null; // base64
};

export default function WorkspaceCreateModal({
    open,
    onClose,
    onCreate,
    defaultValues = {},
}: {
    open: boolean;
    onClose: () => void;
    onCreate?: (payload: CreateWorkspacePayload) => void;
    defaultValues?: Partial<CreateWorkspacePayload>;
}) {
    // ===== state =====
    const [workspaceName, setWorkspaceName] = useState(defaultValues?.name ?? '');
    const [description, setDescription] = useState(defaultValues?.description ?? '');
    const [avatarUrl, setAvatarUrl] = useState<string | null>(defaultValues?.avatar ?? null);
    const nameId = useId();
    const descId = useId();
    const fileInputRef = useRef<HTMLInputElement>(null);

    if (!open) return null;

    // ===== styles (모달 전용) =====
    const overlay = tv({
        base: 'fixed inset-0 bg-black/30 backdrop-blur-[1px] flex items-center justify-center p-4 z-50',
    });
    const modal = tv({
        base: 'w-full max-w-[840px] rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 overflow-hidden',
    });
    const header = tv({
        base: 'relative flex items-center justify-center h-14 bg-emerald-600 text-white text-[15px] font-semibold',
    });
    const closeButton = tv({
        base: 'absolute right-3 top-1/2 -translate-y-1/2 inline-flex h-8 w-8 items-center justify-center rounded-full text-white/90 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70',
    });
    const section = tv({ base: 'px-8 py-6' });
    const formGrid = tv({ base: 'grid grid-cols-[140px_1fr] gap-x-6 gap-y-6' });
    const labelStyle = tv({ base: 'col-span-1 pt-2 text-[13px] text-gray-700 flex items-start gap-1' });
    const requiredMark = tv({ base: 'text-rose-500' });
    const fieldCol = tv({ base: 'col-span-1' });
    const inputVariants = tv({
        base: 'block w-full h-11 rounded-xl border text-[13px] px-4 outline-none bg-white placeholder:text-gray-400 border-gray-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20',
    });
    const textArea = tv({
        base: 'block w-full min-h-[112px] rounded-xl border text-[13px] p-4 bg-emerald-50/30 placeholder:text-gray-400 border-emerald-100 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20',
    });
    const helperRow = tv({ base: 'mt-2 flex items-center text-[12px] text-gray-400' });
    const button = tv({
        slots: {
            base: 'inline-flex select-none items-center justify-center rounded-2xl px-6 h-11 text-[13px] font-semibold transition outline-none focus-visible:ring-2',
        },
        variants: {
            intent: {
                solid: 'bg-gray-900 text-white hover:bg-black focus-visible:ring-gray-300',
                outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 focus-visible:ring-gray-300',
            },
            block: { true: 'w-full' },
        },
        defaultVariants: { intent: 'solid' },
    });
    const { base: buttonBase } = button();
    const avatarWrap = tv({ base: 'relative inline-flex h-16 w-16 items-center justify-center' });
    const avatarCircle = tv({
        base: 'h-16 w-16 overflow-hidden rounded-full bg-gray-100 text-[15px] font-semibold text-gray-700 ring-1 ring-gray-200 flex items-center justify-center select-none',
    });
    const plusBadge = tv({
        base: 'absolute -right-1 -bottom-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-white text-[12px] shadow-md ring-2 ring-white',
    });
    const divider = tv({ base: 'h-px bg-gray-100' });
    const footer = tv({ base: 'flex items-center justify-end gap-3 px-8 py-5' });

    const clampLen = (s: string, max: number) => (s.length > max ? s.slice(0, max) : s);
    const onPickFile = () => fileInputRef.current?.click();
    const onFileChange: React.ChangeEventHandler<HTMLInputElement> = e => {
        const f = e.target.files?.[0];
        if (!f) return;
        const reader = new FileReader();
        reader.onload = () => setAvatarUrl(String(reader.result));
        reader.readAsDataURL(f);
    };

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = e => {
        e.preventDefault();
        const payload: CreateWorkspacePayload = {
            name: workspaceName.trim(),
            description: description.trim(),
            avatar: avatarUrl,
        };
        onCreate?.(payload);
    };

    return (
        <div className={overlay()} role="dialog" aria-modal="true" aria-labelledby="ws-modal-title">
            <div className={modal()}>
                <div className={header()}>
                    <h2 id="ws-modal-title">워크스페이스 생성하기</h2>
                    <button className={closeButton()} aria-label="닫기" onClick={onClose}>
                        ×
                    </button>
                </div>

                <form onSubmit={handleSubmit} noValidate>
                    <div className={section()}>
                        <div className={formGrid()}>
                            {/* 이름 */}
                            <label htmlFor={nameId} className={labelStyle()}>
                                <span>워크스페이스 명</span>
                                <span className={requiredMark()}>*</span>
                            </label>
                            <div className={fieldCol()}>
                                <input
                                    id={nameId}
                                    className={inputVariants()}
                                    value={workspaceName}
                                    onChange={e => setWorkspaceName(e.target.value)}
                                    placeholder="워크스페이스 명을 입력해주세요."
                                    maxLength={40}
                                    required
                                />
                            </div>

                            {/* 이미지 등록 */}
                            <span className={labelStyle()}>
                                <span>이미지 등록</span>
                                <span className={requiredMark()}>*</span>
                            </span>
                            <div className="flex items-center gap-4">
                                <div className={avatarWrap()}>
                                    <div className={avatarCircle()}>
                                        {avatarUrl ? (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img
                                                src={avatarUrl}
                                                alt="미리보기"
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <span>프</span>
                                        )}
                                    </div>
                                    <button
                                        type="button"
                                        onClick={onPickFile}
                                        className={plusBadge()}
                                        aria-label="사진 추가"
                                        title="사진 추가"
                                    >
                                        +
                                    </button>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={onFileChange}
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={onPickFile}
                                    className={buttonBase({ intent: 'outline' })}
                                >
                                    사진 추가
                                </button>
                            </div>

                            {/* 설명 */}
                            <label htmlFor={descId} className={labelStyle()}>
                                설명
                            </label>
                            <div className={fieldCol()}>
                                <textarea
                                    id={descId}
                                    className={textArea()}
                                    placeholder="설명을 입력해주세요."
                                    value={description}
                                    onChange={e => setDescription(clampLen(e.target.value, 200))}
                                />
                                <div className={helperRow()}>
                                    <span>{description.length}/200</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={divider()} />
                    <div className={footer()}>
                        <button type="button" className={buttonBase({ intent: 'outline' })} onClick={onClose}>
                            취소하기
                        </button>
                        <button type="submit" className={buttonBase({ intent: 'solid' })}>
                            생성하기
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
