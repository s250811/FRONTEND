'use client';

import { useMemo, useState } from 'react';
import { style } from './style';

// ===== Tailwind Variants =====

// ===== Mock Data =====
const members = [{ name: 'Alice' }, { name: 'Bob' }, { name: 'Charlie' }, { name: '+12' }];

const summary = [
    { id: 'B', name: '하위 프로젝트 B', points: 40, percent: 0, tone: 'green' as const },
    { id: 'A', name: '하위 프로젝트 A', points: 35, percent: 0, tone: 'gray' as const },
    { id: 'C', name: '하위 프로젝트 C', points: 30, percent: 0, tone: 'gray' as const },
];

const rowsA = [
    { task: 'Task 1', points: 5, assignee: 'Alexis Tran', dates: '01/01 - 01/10', progress: 100, status: '완료' },
    { task: 'Task 2', points: 8, assignee: 'Derek Yu', dates: '01/11 - 01/20', progress: 50, status: '진행중' },
    { task: 'Task 3', points: 3, assignee: 'Nina Patel', dates: '01/21 - 01/30', progress: 20, status: '진행중' },
];

// ===== Helpers =====
const getBadgeTone = (progress: number) => {
    if (progress >= 75) return 'teal';
    if (progress >= 50) return 'blue';
    if (progress >= 25) return 'active';
    return 'gray';
};

const getProgressChipTone = (progress: number) => {
    if (progress >= 75) return 'green';
    if (progress >= 50) return 'yellow';
    if (progress >= 25) return 'red';
    return 'gray';
};

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

// ===== Modal =====
function TaskDetailModal({
    open,
    onClose,
    task,
}: {
    open: boolean;
    onClose: () => void;
    task: { task: string; assignee: string; progress: number } | null;
}) {
    const styles = style;

    if (!open || !task) return null;

    return (
        <div className="fixed inset-0 z-50">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/40" onClick={onClose} />

            {/* Sheet-like Modal */}
            <div className="absolute left-1/2 top-10 w-[min(920px,calc(100vw-24px))] -translate-x-1/2">
                <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl">
                    {/* Colored Header */}
                    <div className="relative bg-teal-500 px-4 py-3 text-white">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="text-base font-semibold">{task.task}</span>
                                <span className={styles.badge({ tone: 'teal' })}>진행중</span>
                                <span className={styles.badge({ tone: getBadgeTone(task.progress) })}>
                                    {task.progress}%
                                </span>
                            </div>
                            <button
                                onClick={onClose}
                                className="rounded-full p-1.5 hover:bg-white/20"
                                aria-label="close"
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
                    </div>

                    {/* Body */}
                    <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-[1fr_280px] md:p-6">
                        {/* Left: Description & Activity */}
                        <div className="space-y-4">
                            <section className="rounded-xl border border-gray-200 p-4">
                                <h4 className="mb-2 text-sm font-semibold text-gray-900">Description</h4>
                                <ul className="list-disc space-y-1 pl-5 text-sm text-gray-700">
                                    <li>
                                        현재 홈 화면의 콘텐츠 배치 및 초기 진입 속도 이슈로 인해 사용자 이탈률이
                                        높아지고 있음.
                                    </li>
                                    <li>개선안: 배너 런칭 최적화, 실시간 인기 콘텐츠 섹션 UI 정리, 홈 타이틀 통일.</li>
                                    <li>피크 시즌 대응을 위한 우선 적용.</li>
                                    <li>서버/연동 API 스펙은 백엔드 측과 별도 정리 필요.</li>
                                </ul>

                                {/* Editor actions mock */}
                                <div className="mt-3 flex items-center justify-end gap-2">
                                    <button className={styles.iconButton()} title="edit">
                                        <svg viewBox="0 0 24 24" className="h-4 w-4">
                                            <path
                                                d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z"
                                                fill="currentColor"
                                            />
                                        </svg>
                                    </button>
                                    <button className={styles.iconButton()} title="attach">
                                        <svg viewBox="0 0 24 24" className="h-4 w-4">
                                            <path
                                                d="M16.5 6.5l-7.8 7.8a3 3 0 104.24 4.24l7.56-7.56"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                fill="none"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </section>

                            {/* Comment box */}
                            <div className="flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2">
                                <input
                                    className="flex-1 bg-transparent text-sm outline-none placeholder:text-gray-400"
                                    placeholder="코멘트를 입력해주세요"
                                />
                                <button className={styles.iconButton()} title="emoji">
                                    <svg viewBox="0 0 24 24" className="h-4 w-4">
                                        <circle cx="8" cy="9" r="1" />
                                        <circle cx="16" cy="9" r="1" />
                                        <path
                                            d="M7 14s2 2 5 2 5-2 5-2"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            fill="none"
                                        />
                                    </svg>
                                </button>
                                <button className={styles.iconButton()} title="send">
                                    <svg viewBox="0 0 24 24" className="h-4 w-4">
                                        <path d="M3 12l18-9-7 9 7 9-18-9z" fill="currentColor" />
                                    </svg>
                                </button>
                            </div>

                            {/* Activity */}
                            <section className="space-y-3">
                                <h4 className="text-sm font-semibold text-gray-900">활동</h4>

                                {[
                                    {
                                        who: 'Alexis Tran',
                                        when: '3시간 전',
                                        text: '당신을 댓글에 언급했습니다.',
                                    },
                                    {
                                        who: 'Derek Yu',
                                        when: '2025/06/23 17:58',
                                        text: '태스크 명의 마감일을 5월 7일로 변경했습니다.',
                                    },
                                    {
                                        who: 'Alexis Tran',
                                        when: '2025/06/22 14:03',
                                        text: '당신을 댓글에 언급했습니다.',
                                    },
                                ].map((a, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <span className="mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-xs font-medium text-gray-700">
                                            {a.who[0]}
                                        </span>
                                        <div className="flex-1">
                                            <div className="text-sm text-gray-800">
                                                <span className="font-medium">{a.who}</span>이(가) {a.text}
                                            </div>
                                            <div className="text-xs text-gray-400">{a.when}</div>
                                        </div>
                                    </div>
                                ))}
                            </section>
                        </div>

                        {/* Right Sidebar */}
                        <aside className="space-y-4">
                            <section className="rounded-xl border border-gray-200 p-4">
                                <div className="mb-2 flex items-center justify-between">
                                    <h4 className="text-sm font-semibold text-gray-900">담당자</h4>
                                    <button className={styles.iconButton()} aria-label="assignee add">
                                        +
                                    </button>
                                </div>
                                <div className="flex -space-x-2">
                                    {['Alice', 'Bob', '+6'].map(n => (
                                        <span
                                            key={n}
                                            className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-white bg-gray-100 text-[10px] font-medium text-gray-600"
                                        >
                                            {n[0]}
                                        </span>
                                    ))}
                                </div>
                            </section>

                            <section className="rounded-xl border border-gray-200 p-4">
                                <div className="mb-2 flex items-center justify-between">
                                    <h4 className="text-sm font-semibold text-gray-900">날짜</h4>
                                </div>
                                <div className="space-y-2 text-sm text-gray-700">
                                    <div className="flex items-center gap-2">
                                        <span className="inline-flex h-5 w-5 items-center justify-center rounded border border-gray-300">
                                            S
                                        </span>{' '}
                                        시작일 <span className="ml-auto text-gray-500">2025년 6월 12일</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="inline-flex h-5 w-5 items-center justify-center rounded border border-gray-300">
                                            E
                                        </span>{' '}
                                        종료일 <span className="ml-auto text-gray-500">2025년 6월 23일</span>
                                    </div>
                                </div>
                            </section>

                            <section className="rounded-xl border border-gray-200 p-4">
                                <div className="mb-2 flex items-center justify-between">
                                    <h4 className="text-sm font-semibold text-gray-900">첨부파일</h4>
                                    <button className={styles.iconButton()} aria-label="add file">
                                        +
                                    </button>
                                </div>
                                <div className="text-sm text-gray-500">첨부된 파일이 없습니다.</div>
                            </section>
                        </aside>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ===== Page =====
export default function VTaskDetailModal() {
    const styles = style;
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<{ task: string; assignee: string; progress: number } | null>(null);

    const totalPoints = useMemo(() => summary.reduce((acc, s) => acc + s.points, 0), []);

    return (
        <div className="min-h-dvh bg-gray-50">
            {/* Top Bar */}
            <header className="sticky top-0 z-20 border-b border-gray-200 bg-white/70 backdrop-blur">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
                    <div className="flex items-center gap-2">
                        <span className={styles.badge({ tone: 'active' })}>
                            <span className="h-2 w-2 rounded-full bg-emerald-500" /> Active
                        </span>
                        <h1 className="text-xl font-semibold text-gray-900">상의 프로젝트 이름</h1>
                        <button className={styles.iconButton()} aria-label="more options">
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
                            <button className={styles.badge({ tone: 'blue' })}>AI 분석</button>
                        </div>
                        <button className={styles.iconButton()} aria-label="add menu">
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
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {summary.map(s => (
                            <div
                                key={s.id}
                                className={styles.statCard({ tone: s.tone === 'green' ? 'green' : 'gray' })}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="space-y-1.5">
                                        <p className="text-sm font-medium text-gray-600">{s.name}</p>
                                        <div className="flex items-end gap-2">
                                            <div className={styles.kpi()}>{s.points}</div>
                                            <span className="text-xs text-gray-400">{s.percent}%</span>
                                        </div>
                                    </div>
                                    <button className={styles.iconButton()} aria-label="card menu">
                                        <Dots />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Table: 하위 프로젝트 A */}
                <section className="mt-8 rounded-2xl border border-gray-200 bg-white">
                    <div className="flex items-center justify-between px-4 py-3">
                        <div className="flex items-center gap-2">
                            <h3 className="text-base font-semibold text-gray-900">하위 프로젝트 A</h3>
                        </div>
                        <div className="flex items-center gap-2">
                            <button className={styles.badge({ tone: 'blue' })}>WBS</button>
                            <button className={styles.badge({ tone: 'gray' })}>간트</button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className={styles.table()}>
                            <thead>
                                <tr>
                                    <th className={styles.th()} style={{ width: 48 }}>
                                        <input
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                                        />
                                    </th>
                                    <th className={styles.th()}>Tasks</th>
                                    <th className={styles.th()}>Story Points</th>
                                    <th className={styles.th()}>Assignees</th>
                                    <th className={styles.th()}>Dates</th>
                                    <th className={styles.th()}>Progress</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {rowsA.map((r, idx) => (
                                    <tr key={r.task} className="hover:bg-gray-50/60">
                                        <td className={styles.td()}>
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    defaultChecked={idx === 2}
                                                    className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                                                />
                                                {idx === 2 && (
                                                    <button
                                                        className={styles.badge({ tone: 'gray' }) + ' !px-1.5 !py-0.5'}
                                                    >
                                                        삭제하기
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                        <td className={styles.td()}>
                                            <button
                                                onClick={() => {
                                                    setSelected({
                                                        task: r.task,
                                                        assignee: r.assignee,
                                                        progress: r.progress,
                                                    });
                                                    setOpen(true);
                                                }}
                                                className="group inline-flex items-center gap-2 text-left hover:text-teal-700"
                                            >
                                                <span className="inline-flex h-5 w-5 items-center justify-center rounded border border-gray-300 bg-white group-hover:border-teal-300">
                                                    <Check />
                                                </span>
                                                {r.task}
                                            </button>
                                        </td>
                                        <td className={styles.td()}>{r.points}</td>
                                        <td className={styles.td()}>{r.assignee}</td>
                                        <td className={styles.td()}>{r.dates}</td>
                                        <td className={styles.td()}>
                                            <span
                                                className={styles.progressChip({
                                                    tone: getProgressChipTone(r.progress),
                                                })}
                                            >
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
                            <button className={styles.badge({ tone: 'blue' })}>WBS</button>
                            <button className={styles.badge({ tone: 'gray' })}>간트</button>
                        </div>
                    </div>
                    <div className="px-4 pb-6 text-sm text-gray-500">항목이 없습니다. 작업을 추가해보세요.</div>
                </section>
            </main>

            <TaskDetailModal open={open} onClose={() => setOpen(false)} task={selected} />
        </div>
    );
}
