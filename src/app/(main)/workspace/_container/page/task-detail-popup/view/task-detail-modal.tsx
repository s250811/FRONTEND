'use client';

import { style } from './style';

type TaskBrief = { task: string; assignee: string; progress: number } | null;

export default function TaskDetailModal({
    open,
    onClose,
    task,
}: {
    open: boolean;
    onClose: () => void;
    task: TaskBrief;
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
                                <span className={styles.badge({ tone: progressBadgeTone(task.progress) })}>
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
                                    { who: 'Alexis Tran', when: '3시간 전', text: '당신을 댓글에 언급했습니다.' },
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
                                        </span>
                                        시작일 <span className="ml-auto text-gray-500">2025년 6월 12일</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="inline-flex h-5 w-5 items-center justify-center rounded border border-gray-300">
                                            E
                                        </span>
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

function progressBadgeTone(p: number) {
    if (p >= 75) return 'teal';
    if (p >= 50) return 'blue';
    if (p >= 25) return 'active';
    return 'gray';
}
