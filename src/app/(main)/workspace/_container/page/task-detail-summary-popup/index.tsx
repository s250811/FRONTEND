// app/(main)/workspace/_container/page/project-analysis-modal.tsx
'use client';

import React, { useEffect } from 'react';
import { tv } from 'tailwind-variants';

const overlay = tv({
    base: 'fixed inset-0 z-[100] bg-black/40 backdrop-blur-[1px] flex items-center justify-center p-4',
});

const modal = tv({
    base: 'w-full max-w-3xl rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 overflow-hidden',
});

const headerBar = tv({
    base: 'bg-emerald-600 text-white px-5 py-4 flex items-center gap-2',
});

const badge = tv({
    base: 'inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold',
    variants: {
        tone: {
            green: 'border-emerald-200/60 bg-emerald-500/50',
            yellow: 'border-amber-200/70 bg-amber-400/60 text-white',
            soft: 'border-white/60 bg-white/20 text-white',
        },
    },
    defaultVariants: { tone: 'soft' },
});

const tab = tv({
    base: 'px-3 py-1.5 rounded-full text-sm font-medium transition-colors',
    variants: {
        active: {
            true: 'bg-emerald-50 text-emerald-700',
            false: 'text-gray-500 hover:bg-gray-50',
        },
    },
});

const card = tv({
    base: 'rounded-2xl border border-gray-200 bg-white p-4',
});

type Props = {
    open: boolean;
    onClose: () => void;
};

export default function ProjectAnalysisModal({ open, onClose }: Props) {
    // ESC 닫기
    useEffect(() => {
        if (!open) return;
        const h = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
        window.addEventListener('keydown', h);
        return () => window.removeEventListener('keydown', h);
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div className={overlay()} role="dialog" aria-modal="true">
            <div className={modal()}>
                {/* 상단 헤더 */}
                <div className={headerBar()}>
                    <h3 className="mr-auto text-base font-semibold tracking-tight">상위 프로젝트 이름</h3>
                    <span className={badge({ tone: 'soft' })}>진행중</span>
                    <span className={badge({ tone: 'yellow' })}>50%</span>
                    <button
                        aria-label="닫기"
                        onClick={onClose}
                        className="ml-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/15 hover:bg-white/25"
                    >
                        <svg viewBox="0 0 24 24" className="h-5 w-5">
                            <path
                                d="M6 6l12 12M18 6L6 18"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                        </svg>
                    </button>
                </div>

                {/* 탭 */}
                <div className="px-5 pt-3">
                    <div className="flex items-center gap-2">
                        <button className={tab({ active: true })}>요약</button>
                        <button className={tab({ active: false })}>일정</button>
                        <button className={tab({ active: false })}>팀</button>
                        <button className={tab({ active: false })}>작업</button>

                        <div className="ml-auto">
                            <button className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50">
                                {/* 정렬/옵션 아이콘 */}
                                <svg viewBox="0 0 24 24" className="h-5 w-5">
                                    <path
                                        d="M4 6h16M7 12h10M10 18h4"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* 본문 */}
                <div className="px-5 pb-5 pt-3 space-y-4">
                    {/* 이번주 주요일정 */}
                    <section className={card()}>
                        <header className="mb-2 flex items-center justify-between">
                            <h4 className="text-sm font-semibold text-gray-900">이번주 주요일정</h4>
                            <button className="inline-flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-50">
                                <svg viewBox="0 0 24 24" className="h-5 w-5 text-gray-500">
                                    <circle cx="5" cy="12" r="1.8" />
                                    <circle cx="12" cy="12" r="1.8" />
                                    <circle cx="19" cy="12" r="1.8" />
                                </svg>
                            </button>
                        </header>
                        <ul className="text-sm text-gray-700 space-y-1">
                            <li>• 06/17 : 오늘의 주요일정은 신규 로그인 사안 피드백 받기 입니다.</li>
                            <li>• 06/17 : 오늘의 주요일정은 신규 로그인 사안 피드백 받기 입니다.</li>
                        </ul>
                    </section>

                    {/* 완료된 주요작업 */}
                    <section className={card()}>
                        <header className="mb-2 flex items-center justify-between">
                            <h4 className="text-sm font-semibold text-gray-900">완료된 주요작업</h4>
                            <button className="inline-flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-50">
                                <svg viewBox="0 0 24 24" className="h-5 w-5 text-gray-500">
                                    <circle cx="5" cy="12" r="1.8" />
                                    <circle cx="12" cy="12" r="1.8" />
                                    <circle cx="19" cy="12" r="1.8" />
                                </svg>
                            </button>
                        </header>
                        <ul className="text-sm text-gray-700 space-y-1">
                            <li>• 06/17 : 와이어프레임 1차 완료 – 박대리</li>
                            <li>• 06/17 : 사용자 인터뷰 3건 진행완료 – 김과장</li>
                        </ul>
                    </section>

                    {/* 프로젝트 진행률 */}
                    <section className={card()}>
                        <header className="mb-3 flex items-center justify-between">
                            <h4 className="text-sm font-semibold text-gray-900">프로젝트 진행률</h4>
                        </header>

                        <div className="space-y-3">
                            {[
                                { name: '김대리', rate: 80 },
                                { name: '박사원', rate: 60 },
                            ].map(r => (
                                <div key={r.name}>
                                    <div className="mb-1 flex items-center justify-between text-sm text-gray-700">
                                        <span>{r.name}</span>
                                        <span className="text-gray-500">{r.rate}%</span>
                                    </div>
                                    <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                                        <div
                                            className="h-full rounded-full bg-emerald-500"
                                            style={{ width: `${r.rate}%` }}
                                            aria-hidden
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
