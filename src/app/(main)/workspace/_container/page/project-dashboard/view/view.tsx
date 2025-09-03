'use client';

import { useMemo } from 'react';
import { tv } from 'tailwind-variants';

// ===== Tailwind Variants =====
const badge = tv({
    base: 'inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium',
    variants: {
        tone: {
            active: 'border-emerald-200 bg-emerald-50 text-emerald-700',
            gray: 'border-gray-200 bg-gray-50 text-gray-600',
            blue: 'border-sky-200 bg-sky-50 text-sky-700',
        },
    },
    defaultVariants: { tone: 'gray' },
});

const iconButton = tv({
    base: 'inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-700',
});

const statCard = tv({
    base: 'relative rounded-2xl border p-4 md:p-6 transition-colors bg-white',
    variants: {
        tone: {
            green: 'border-emerald-100 bg-emerald-50/50',
            gray: 'border-gray-200',
        },
    },
    defaultVariants: { tone: 'gray' },
});

const kpi = tv({
    base: 'text-3xl font-semibold tracking-tight text-gray-900',
});

const table = tv({
    base: 'w-full text-sm text-gray-700 border-separate border-spacing-0 rounded-xl overflow-hidden',
});

const th = tv({
    base: 'sticky top-0 z-10 bg-white/70 backdrop-blur border-b border-gray-200 px-4 py-3 text-left font-medium text-gray-500',
});

const td = tv({
    base: 'px-4 py-3 border-b border-gray-100',
});

const progressChip = tv({
    base: 'inline-flex items-center gap-1 rounded-full border px-2 py-1 text-[11px] font-medium',
    variants: {
        tone: {
            green: 'border-emerald-200 text-emerald-700',
            yellow: 'border-amber-200 text-amber-700',
            red: 'border-rose-200 text-rose-700',
            gray: 'border-gray-200 text-gray-600',
        },
    },
    defaultVariants: { tone: 'gray' },
});

// ===== Mock Data =====
const members = [{ name: 'Alice' }, { name: 'Bob' }, { name: 'Charlie' }, { name: '+12' }];

const summary = [
    { id: 'B', name: '하위 프로젝트 B', points: 40, percent: 0, tone: 'green' as const },
    { id: 'A', name: '하위 프로젝트 A', points: 35, percent: 0, tone: 'gray' as const },
    { id: 'C', name: '하위 프로젝트 C', points: 30, percent: 0, tone: 'gray' as const },
];

const rowsA = [
    { task: 'Task 1', points: 5, assignee: 'Alexis Tran', dates: '01/01 - 01/10', progress: 100 },
    { task: 'Task 2', points: 8, assignee: 'Derek Yu', dates: '01/11 - 01/20', progress: 50 },
    { task: 'Task 3', points: 3, assignee: 'Nina Patel', dates: '01/21 - 01/30', progress: 20 },
];

// ===== Helpers =====
function progressTone(v: number) {
    if (v >= 90) return 'green' as const;
    if (v >= 40) return 'yellow' as const;
    if (v > 0) return 'red' as const;
    return 'gray' as const;
}

function Dots() {
    return (
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-gray-400">
            <circle cx="5" cy="12" r="1.8" />
            <circle cx="12" cy="12" r="1.8" />
            <circle cx="19" cy="12" r="1.8" />
        </svg>
    );
}

function Check() {
    return (
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5">
            <path
                d="M5 13l4 4L19 7"
                stroke="currentColor"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

// ===== Page =====
export default function ProjectDashboardPage() {
    const totalPoints = useMemo(() => summary.reduce((acc, s) => acc + s.points, 0), []);

    return (
        <div className="min-h-dvh bg-gray-50">
            {/* Top Bar */}
            <header className="sticky top-0 z-20 border-b border-gray-200 bg-white/70 backdrop-blur">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
                    <div className="flex items-center gap-2">
                        <span className={badge({ tone: 'active' })}>
                            <span className="h-2 w-2 rounded-full bg-emerald-500" /> Active
                        </span>
                        <h1 className="text-xl font-semibold text-gray-900">상의 프로젝트 이름</h1>
                        <button className={iconButton()} aria-label="more options">
                            <Dots />
                        </button>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="hidden items-center gap-1 md:flex">
                            {members.map((m, i) => (
                                <span
                                    key={i}
                                    title={m.name}
                                    className="-ml-2 inline-flex h-7 w-7 items-center justify-center rounded-full border border-white bg-gray-100 text-[10px] font-medium text-gray-600 first:ml-0"
                                >
                                    {m.name[0]}
                                </span>
                            ))}
                        </div>

                        <div className="relative">
                            <button className={badge({ tone: 'blue' })}>AI 분석</button>
                        </div>
                        <button className={iconButton()} aria-label="add menu">
                            +
                        </button>
                    </div>
                </div>
            </header>

            {/* Content */}
            <main className="mx-auto max-w-6xl px-4 py-6 md:py-8">
                {/* Summary */}
                <section className="space-y-3">
                    <h2 className="text-sm font-semibold text-gray-900">
                        Total Story Points <span className="text-gray-400">({totalPoints})</span>
                    </h2>
                    {summary.map(s => (
                        <div key={s.id} className={statCard({ tone: s.tone === 'green' ? 'green' : 'gray' })}>
                            <div className="flex items-start justify-between">
                                <div className="space-y-1.5">
                                    <p className="text-sm font-medium text-gray-600">{s.name}</p>
                                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                        <div className="flex items-end gap-2">
                                            <div className={kpi()}>{s.points}</div>
                                            <span className="text-xs text-gray-400">{s.percent}%</span>
                                        </div>
                                    </div>
                                    <button className={iconButton()} aria-label="card menu">
                                        <Dots />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </section>

                {/* Table: 하위 프로젝트 A */}
                <section className="mt-8 rounded-2xl border border-gray-200 bg-white">
                    <div className="flex items-center justify-between px-4 py-3">
                        <div className="flex items-center gap-2">
                            <h3 className="text-base font-semibold text-gray-900">하위 프로젝트 A</h3>
                        </div>
                        <div className="flex items-center gap-2">
                            <button className={badge({ tone: 'blue' })}>WBS</button>
                            <button className={badge({ tone: 'gray' })}>간트</button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className={table()}>
                            <thead>
                                <tr>
                                    <th className={th()} style={{ width: 48 }}>
                                        <input
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                                        />
                                    </th>
                                    <th className={th()}>Tasks</th>
                                    <th className={th()}>Story Points</th>
                                    <th className={th()}>Assignees</th>
                                    <th className={th()}>Dates</th>
                                    <th className={th()}>Progress</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {rowsA.map((r, idx) => (
                                    <tr key={r.task} className="hover:bg-gray-50/60">
                                        <td className={td()}>
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    defaultChecked={idx === 2}
                                                    className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                                                />
                                                {idx === 2 && (
                                                    <button className={badge({ tone: 'gray' }) + ' !px-1.5 !py-0.5'}>
                                                        삭제하기
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                        <td className={td()}>
                                            <div className="flex items-center gap-2">
                                                <span className="inline-flex h-5 w-5 items-center justify-center rounded border border-gray-300 bg-white">
                                                    <Check />
                                                </span>
                                                {r.task}
                                            </div>
                                        </td>
                                        <td className={td()}>{r.points}</td>
                                        <td className={td()}>{r.assignee}</td>
                                        <td className={td()}>{r.dates}</td>
                                        <td className={td()}>
                                            <span className={progressChip({ tone: progressTone(r.progress) })}>
                                                <span className="h-1.5 w-1.5 rounded-full bg-current"></span>
                                                {r.progress}%
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Table: 하위 프로젝트 B (빈 상태 예시) */}
                <section className="mt-8 rounded-2xl border border-gray-200 bg-white">
                    <div className="flex items-center justify-between px-4 py-3">
                        <h3 className="text-base font-semibold text-gray-900">하위 프로젝트 B</h3>
                        <div className="flex items-center gap-2">
                            <button className={badge({ tone: 'blue' })}>WBS</button>
                            <button className={badge({ tone: 'gray' })}>간트</button>
                        </div>
                    </div>
                    <div className="px-4 pb-6 text-sm text-gray-500">항목이 없습니다. 작업을 추가해보세요.</div>
                </section>
            </main>
        </div>
    );
}
