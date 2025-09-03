'use client';

import React, { useState } from 'react';
import { tv } from 'tailwind-variants';

/**
 * ProjectOverviewModal
 * - Next.js/React + TypeScript + Tailwind Variants
 * - Tabs: 요약 / 일정 / 팀 / 작업
 * - Cards: 이번주 주요일정, 완료된 주요작업, 프로젝트 진행률
 */

const overlay = tv({
    base: 'fixed inset-0 bg-black/30 backdrop-blur-[1px] flex items-center justify-center p-4',
});

const modal = tv({
    base: 'w-full max-w-[980px] rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 overflow-hidden',
});

const header = tv({
    base: 'flex items-center justify-between px-6 py-4 bg-emerald-600 text-white',
});

const titleWrap = tv({ base: 'flex items-center gap-3' });

const statusBadge = tv({
    base: 'inline-flex items-center gap-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-medium px-3 py-1',
});
const percentBadge = tv({
    base: 'inline-flex items-center gap-1 rounded-full bg-orange-100 text-orange-700 text-xs font-medium px-3 py-1',
});

const tabs = tv({ base: 'flex items-center gap-2 px-6 pt-3' });

const tabButton = tv({
    base: 'rounded-full px-4 h-9 text-sm font-medium',
    variants: {
        active: {
            true: 'bg-emerald-600 text-white',
            false: 'text-gray-600 hover:bg-gray-100',
        },
    },
});

const body = tv({ base: 'p-6' });

const card = tv({ base: 'rounded-2xl border border-gray-200 bg-white p-5 shadow-sm' });

const cardHeader = tv({ base: 'flex items-center justify-between pb-3' });
const cardTitle = tv({ base: 'text-[15px] font-semibold text-gray-800 flex items-center gap-2' });

const bullet = tv({ base: 'list-disc pl-5 text-sm text-gray-700 leading-7' });

const progressTrack = tv({ base: 'h-2 w-full rounded-full bg-gray-200' });
const progressBar = tv({ base: 'h-2 rounded-full bg-emerald-600' });

const sectionStack = tv({ base: 'space-y-5' });

export default function ProjectOverviewModalDemo() {
    const [active, setActive] = useState<'summary' | 'schedule' | 'team' | 'tasks'>('summary');

    return (
        <div className="min-h-dvh bg-gray-50">
            <div className={overlay()}>
                <div className={modal()} role="dialog" aria-modal="true">
                    {/* Header */}
                    <div className={header()}>
                        <div className={titleWrap()}>
                            <h2 className="text-lg font-semibold">상의 프로젝트 이름</h2>
                            <span className={statusBadge()}>진행중</span>
                            <span className={percentBadge()}>50%</span>
                        </div>
                        <button
                            className="text-white/80 hover:text-white text-xl"
                            aria-label="닫기"
                            onClick={() => alert('닫기')}
                        >
                            ×
                        </button>
                    </div>

                    {/* Tabs */}
                    <div className={tabs()}>
                        {(
                            [
                                { id: 'summary', label: '요약' },
                                { id: 'schedule', label: '일정' },
                                { id: 'team', label: '팀' },
                                { id: 'tasks', label: '작업' },
                            ] as const
                        ).map(t => (
                            <button
                                key={t.id}
                                className={tabButton({ active: active === t.id })}
                                onClick={() => setActive(t.id)}
                                type="button"
                            >
                                {t.label}
                            </button>
                        ))}
                    </div>

                    {/* Body */}
                    <div className={body()}>
                        {active === 'summary' && (
                            <div className={sectionStack()}>
                                {/* 이번주 주요일정 */}
                                <div className={card()}>
                                    <div className={cardHeader()}>
                                        <div className={cardTitle()}>
                                            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-emerald-300 text-emerald-600">
                                                i
                                            </span>
                                            이번주 주요일정
                                        </div>
                                        <button className="text-gray-400 hover:text-gray-600" aria-label="설정">
                                            ≡
                                        </button>
                                    </div>
                                    <ul className={bullet()}>
                                        <li>06/17 : 오늘의 주요일정은 신규 로고 시안 피드백 받기 입니다.</li>
                                        <li>06/17 : 오늘의 주요일정은 신규 로고 시안 피드백 받기 입니다.</li>
                                    </ul>
                                </div>

                                {/* 완료된 주요작업 */}
                                <div className={card()}>
                                    <div className={cardHeader()}>
                                        <div className={cardTitle()}>
                                            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-emerald-300 text-emerald-600">
                                                ✓
                                            </span>
                                            완료된 주요작업
                                        </div>
                                    </div>
                                    <ul className={bullet()}>
                                        <li>06/17 : 와이어프레임 1차 완료 – 박대리</li>
                                        <li>06/17 : 사용자 인터뷰 3건 진행완료 – 김과장</li>
                                    </ul>
                                </div>

                                {/* 프로젝트 진행률 */}
                                <div className={card()}>
                                    <div className={cardHeader()}>
                                        <div className={cardTitle()}>
                                            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-emerald-300 text-emerald-600">
                                                ◴
                                            </span>
                                            프로젝트 진행률
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <div className="mb-2 flex items-center justify-between text-sm text-gray-600">
                                                <span>김대리</span>
                                                <span>80%</span>
                                            </div>
                                            <div className={progressTrack()}>
                                                <div className={progressBar()} style={{ width: '80%' }} />
                                            </div>
                                        </div>

                                        <div>
                                            <div className="mb-2 flex items-center justify-between text-sm text-gray-600">
                                                <span>박사원</span>
                                                <span>60%</span>
                                            </div>
                                            <div className={progressTrack()}>
                                                <div className={progressBar()} style={{ width: '60%' }} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {active !== 'summary' && (
                            <div className="rounded-2xl border border-dashed border-gray-300 p-10 text-center text-sm text-gray-500">
                                <p>
                                    <strong className="text-gray-700">
                                        {({ schedule: '일정', team: '팀', tasks: '작업' } as const)[active]}
                                    </strong>{' '}
                                    탭은 아직 데모 상태입니다. 필요한 섹션/표/리스트를 알려주시면 구성해 드릴게요.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
