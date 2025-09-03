'use client';

import { useMemo, useState, useRef, useEffect } from 'react';
import { tv } from 'tailwind-variants';
import TaskDetailModal from '../../task-detail-popup/view/task-detail-modal';
import dynamic from 'next/dynamic';
const GanttChart = dynamic(() => import('@/app/(main)/workspace/_container/page/project-dashboard-gantt'), {
    ssr: false,
});

// ===== Tailwind Variants =====
const badge = tv({
    base: 'inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium select-none',
    variants: {
        tone: {
            active: 'border-emerald-200 bg-emerald-50 text-emerald-700',
            gray: 'border-gray-200 bg-gray-50 text-gray-600',
            blue: 'border-sky-200 bg-sky-50 text-sky-700',
            green: 'border-emerald-200 bg-emerald-50 text-emerald-700',
        },
        size: { sm: 'px-2 py-0.5 text-[11px]' },
    },
    defaultVariants: { tone: 'gray' },
});

const iconButton = tv({
    base: 'inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors',
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
    base: 'px-4 py-3 border-b border-gray-100 align-middle',
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

const dropdownPanel = tv({
    base: 'absolute right-0 mt-2 w-40 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg ring-1 ring-black/5 z-50',
});

// ===== Mock Data =====
const members = [{ name: 'Alice' }, { name: 'Bob' }, { name: 'Charlie' }, { name: '+12' }];

const summary = [
    { id: 'B', name: '하위 프로젝트 B', points: 40, percent: 0, tone: 'green' as const },
    { id: 'A', name: '하위 프로젝트 A', points: 35, percent: 0, tone: 'gray' as const },
    { id: 'C', name: '하위 프로젝트 C', points: 30, percent: 0, tone: 'gray' as const },
];

type Row = { task: string; points: number; assignee: string; dates: string; progress: number };

const rowsASeed: Row[] = [
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

function ChevronDown() {
    return (
        <svg viewBox="0 0 24 24" className="h-4 w-4 text-gray-500">
            <path
                d="M6 9l6 6 6-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
function Dots() {
    return (
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-gray-500">
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

function useClickOutside<T extends HTMLElement>(open: boolean, onClose: () => void) {
    const ref = useRef<T | null>(null);
    useEffect(() => {
        if (!open) return;
        const handler = (e: MouseEvent) => {
            if (!ref.current) return;
            if (!ref.current.contains(e.target as Node)) onClose();
        };
        window.addEventListener('mousedown', handler);
        return () => window.removeEventListener('mousedown', handler);
    }, [open, onClose]);
    return ref;
}

function HeaderRight() {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useClickOutside<HTMLDivElement>(menuOpen, () => setMenuOpen(false));

    return (
        <div className="flex items-center gap-3">
            {/* 멤버 아바타 + 텍스트 */}
            <div className="hidden md:flex items-center">
                <div className="flex -space-x-2">
                    {members.map((m, i) => (
                        <span
                            key={i}
                            title={m.name}
                            className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-white bg-gray-100 text-[10px] font-medium text-gray-600"
                        >
                            {m.name[0]}
                        </span>
                    ))}
                </div>
                <span className="ml-3 text-sm text-gray-600">
                    Alice, Bob, Charlie <span className="text-gray-400">+12 others</span>
                </span>
            </div>

            {/* AI 분석: 그라데이션 초록 pill */}
            <button
                className="inline-flex items-center rounded-full px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm
                     bg-gradient-to-b from-emerald-400 to-emerald-500 hover:from-emerald-400/90 hover:to-emerald-500/90"
            >
                AI분석
            </button>

            {/* ... 버튼 + 드롭다운 (우측 정렬) */}
            <div className="relative" ref={menuRef}>
                <button
                    aria-label="header menu"
                    onClick={() => setMenuOpen(v => !v)}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                >
                    <Dots />
                </button>

                {menuOpen && (
                    <div className="absolute right-0 mt-2 w-44 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg ring-1 ring-black/5 z-50">
                        <ul className="py-1 text-sm text-gray-700">
                            <li>
                                <button className="flex w-full items-center gap-2 px-3 py-2 hover:bg-gray-50">
                                    <span className="inline-flex h-5 w-5 items-center justify-center rounded bg-emerald-100">
                                        +
                                    </span>
                                    폴더 추가하기
                                </button>
                            </li>
                            <li>
                                <button className="flex w-full items-center gap-2 px-3 py-2 hover:bg-gray-50">
                                    <span className="inline-flex h-5 w-5 items-center justify-center rounded border border-gray-200">
                                        ⎘
                                    </span>
                                    복제하기
                                </button>
                            </li>
                            <li>
                                <button className="flex w-full items-center gap-2 px-3 py-2 hover:bg-gray-50">
                                    <span className="inline-flex h-5 w-5 items-center justify-center rounded bg-rose-100">
                                        ▢
                                    </span>
                                    삭제하기
                                </button>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}

// ===== Page =====
export default function ProjectDashboardPage() {
    const totalPoints = useMemo(() => summary.reduce((acc, s) => acc + s.points, 0), []);
    const [rows, setRows] = useState<Row[]>(rowsASeed);
    const [selected, setSelected] = useState<Record<number, boolean>>({ 2: true }); // 3번째만 기본 선택
    const selectedCount = Object.values(selected).filter(Boolean).length;
    const allChecked = rows.length > 0 && rows.every((_, i) => selected[i]);
    const someChecked = selectedCount > 0 && !allChecked;
    const [subAView, setSubAView] = useState<'wbs' | 'gantt'>('wbs');
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState<{ task: string; assignee: string; progress: number } | null>(null);

    const [plusOpen, setPlusOpen] = useState(false);
    const [cardMenuOpen, setCardMenuOpen] = useState<Record<string, boolean>>({});
    const plusRef = useClickOutside<HTMLDivElement>(plusOpen, () => setPlusOpen(false));

    const toggleRow = (idx: number) => setSelected(prev => ({ ...prev, [idx]: !prev[idx] }));

    const toggleAll = () => {
        if (allChecked) setSelected({});
        else setSelected(Object.fromEntries(rows.map((_, i) => [i, true])));
    };

    const handleBulkDelete = () => {
        const remain = rows.filter((_, i) => !selected[i]);
        setRows(remain);
        setSelected({});
    };

    return (
        <>
            <div className="min-h-dvh bg-gray-50">
                {/* Top Bar */}
                <header className="sticky top-0 z-20 border-b border-gray-200 bg-white/70 backdrop-blur">
                    <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
                        {/* 왼쪽: Active 배지 + 프로젝트명 + 화살표 */}
                        <div className="flex items-center gap-2">
                            <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                                Active
                            </span>

                            <h1 className="flex items-center gap-1 text-xl font-semibold text-gray-900">
                                상위 프로젝트 이름
                                <ChevronDown />
                            </h1>
                        </div>

                        {/* 오른쪽: 멤버 + AI버튼 + ... 메뉴 */}
                        <HeaderRight />
                    </div>
                </header>

                {/* Content */}
                <main className="mx-auto max-w-6xl px-4 py-6 md:py-8">
                    {/* Summary */}
                    <section className="space-y-3">
                        <h2 className="text-sm font-semibold text-gray-900">
                            Total Story Points <span className="text-gray-400">({totalPoints})</span>
                        </h2>

                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                            {summary.map(s => {
                                const isGreen = s.tone === 'green';
                                const menuOpen = !!cardMenuOpen[s.id];
                                const ref = useClickOutside<HTMLDivElement>(menuOpen, () =>
                                    setCardMenuOpen(prev => ({ ...prev, [s.id]: false }))
                                );
                                return (
                                    <div key={s.id} className={statCard({ tone: isGreen ? 'green' : 'gray' })}>
                                        <div className="flex items-start justify-between">
                                            <div className="space-y-1.5">
                                                <p className="text-sm font-medium text-gray-600">{s.name}</p>
                                                <div className="flex items-end gap-2">
                                                    <div className={kpi()}>{s.points}</div>
                                                    <span className="text-xs text-gray-400">{s.percent}%</span>
                                                </div>
                                            </div>
                                            <div className="relative" ref={ref}>
                                                <button
                                                    className={iconButton()}
                                                    aria-label="card menu"
                                                    onClick={() =>
                                                        setCardMenuOpen(prev => ({ ...prev, [s.id]: !prev[s.id] }))
                                                    }
                                                >
                                                    <Dots />
                                                </button>
                                                {menuOpen && (
                                                    <div className={dropdownPanel()}>
                                                        <ul className="py-1 text-sm text-gray-700">
                                                            <li>
                                                                <button className="block w-full px-3 py-2 text-left hover:bg-gray-50">
                                                                    상세보기
                                                                </button>
                                                            </li>
                                                            <li>
                                                                <button className="block w-full px-3 py-2 text-left hover:bg-gray-50">
                                                                    편집
                                                                </button>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    {/* Table: 하위 프로젝트 A */}
                    <section className="mt-8 rounded-2xl border border-gray-200 bg-white">
                        <div className="flex items-center justify-between px-4 py-3">
                            <div className="flex items-center gap-2">
                                <h3 className="text-base font-semibold text-gray-900">하위 프로젝트 A</h3>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    className={badge({ tone: subAView === 'wbs' ? 'blue' : 'gray' })}
                                    onClick={() => setSubAView('wbs')}
                                    type="button"
                                >
                                    WBS
                                </button>
                                <button
                                    className={badge({ tone: subAView === 'gantt' ? 'blue' : 'gray' })}
                                    onClick={() => setSubAView('gantt')}
                                    type="button"
                                >
                                    간트
                                </button>
                            </div>
                        </div>

                        {subAView === 'wbs' ? (
                            <div className="relative overflow-x-auto">
                                <table className={table()}>
                                    <thead>
                                        <tr>
                                            <th className={th()} style={{ width: 56 }}>
                                                <input
                                                    type="checkbox"
                                                    aria-checked={someChecked ? 'mixed' : allChecked}
                                                    checked={allChecked}
                                                    onChange={toggleAll}
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
                                        {rows.map((r, idx) => {
                                            const isSelected = !!selected[idx];
                                            return (
                                                <tr
                                                    key={r.task}
                                                    className={isSelected ? 'bg-emerald-50/40' : 'hover:bg-gray-50/60'}
                                                >
                                                    <td className={td()}>
                                                        <input
                                                            type="checkbox"
                                                            checked={isSelected}
                                                            onChange={() => toggleRow(idx)}
                                                            className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                                                        />
                                                    </td>
                                                    <td className={td()}>
                                                        <button
                                                            onClick={() => {
                                                                setSelectedTask({
                                                                    task: r.task,
                                                                    assignee: r.assignee,
                                                                    progress: r.progress,
                                                                });
                                                                setModalOpen(true);
                                                            }}
                                                            className="group inline-flex items-center gap-2 text-left hover:text-teal-700"
                                                        >
                                                            <span className="inline-flex h-5 w-5 items-center justify-center rounded border border-gray-300 bg-white group-hover:border-teal-300">
                                                                <Check />
                                                            </span>
                                                            {r.task}
                                                        </button>
                                                    </td>
                                                    <td className={td()}>{r.points}</td>
                                                    <td className={td()}>{r.assignee}</td>
                                                    <td className={td()}>{r.dates}</td>
                                                    <td className={td()}>
                                                        <span
                                                            className={progressChip({ tone: progressTone(r.progress) })}
                                                        >
                                                            <span className="h-1.5 w-1.5 rounded-full bg-current" />
                                                            {r.progress}%
                                                        </span>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>

                                {/* 선택 시 하단 왼쪽 고정 바 */}
                                {selectedCount > 0 && (
                                    <div className="pointer-events-none absolute left-3 bottom-3">
                                        <button
                                            onClick={handleBulkDelete}
                                            className="pointer-events-auto inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm hover:bg-gray-50"
                                        >
                                            <span className="inline-block h-4 w-4 rounded bg-rose-100" />
                                            삭제하기
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="p-4">
                                <GanttChart />
                            </div>
                        )}
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
            <TaskDetailModal open={modalOpen} onClose={() => setModalOpen(false)} task={selectedTask} />
        </>
    );
}
