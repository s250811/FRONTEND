'use client';

import React, { useMemo, useState } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

/* -------------------------------- tv styles ------------------------------- */
const tabs = tv({
    base: 'flex items-center gap-6 text-sm',
    variants: {
        active: {
            true: 'text-teal-600 font-semibold after:block after:h-[2px] after:bg-teal-600 after:mt-1',
            false: 'text-gray-500 hover:text-gray-700',
        },
    },
});

const toolbar = tv({
    base: 'flex items-center justify-between border-b border-gray-200 pb-3',
});

const actionBtn = tv({
    base: 'inline-flex items-center gap-1 rounded-md border px-3 py-1.5 text-sm',
    variants: {
        tone: {
            ghost: 'border-gray-200 text-gray-700 hover:bg-gray-50',
            primary: 'border-teal-600 text-teal-700 hover:bg-teal-50',
            danger: 'border-red-500 text-red-600 hover:bg-red-50',
        },
    },
    defaultVariants: { tone: 'ghost' },
});

const sectionTitle = tv({
    base: 'text-sm text-gray-400 mt-5 mb-2',
});

const item = tv({
    base: ['w-full rounded-xl border border-transparent bg-white', 'transition-colors'].join(' '),
    variants: {
        selected: {
            true: 'bg-emerald-50/70 ring-1 ring-emerald-200',
            false: 'hover:bg-gray-50',
        },
    },
});

const titleRow = tv({
    base: 'flex items-start gap-2 sm:gap-3',
});

const dot = tv({
    base: 'ml-2 mt-1 h-2 w-2 rounded-full',
    variants: { unread: { true: 'bg-red-500', false: 'bg-transparent' } },
});

const bullet = tv({
    base: 'list-disc pl-5 text-gray-700 text-[15px] leading-6',
});

const badge = tv({
    base: 'inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium select-none',
    variants: {
        tone: {
            gray: 'border-gray-200 bg-gray-50 text-gray-600',
            blue: 'border-sky-200 bg-sky-50 text-sky-700',
            green: 'border-emerald-200 bg-emerald-50 text-emerald-700',
            indigo: 'border-indigo-200 bg-indigo-50 text-indigo-700',
        },
        size: { sm: 'px-2 text-[11px]' },
    },
    defaultVariants: { tone: 'gray' },
});

type BadgeProps = React.PropsWithChildren<VariantProps<typeof badge>>;

/* --------------------------------- types --------------------------------- */
type Task = {
    id: string;
    title: string;
    summary: string;
    time: string; // "14:21"
    unread: boolean;
    tags: Array<{ label: string; tone?: BadgeProps['tone'] }>;
    dayGroup: 'Today' | 'Yesterday';
};

/* ------------------------------- mock data ------------------------------- */
const MOCK: Task[] = [
    {
        id: 't1',
        title: 'Task 01',
        summary:
            '이번 개선에서는 메인 배너 로딩 최적화, 실시간 인기 콘텐츠 섹션의 UI 정리, 추천 알고리즘 호출 타이밍을 프론트에서 제어하는 방향으로 진행.',
        time: '14:21',
        unread: true,
        tags: [{ label: '나에게 할당', tone: 'green' }],
        dayGroup: 'Today',
    },
    {
        id: 't2',
        title: 'Task 02',
        summary:
            '이번 개선에서는 메인 배너 로딩 최적화, 실시간 인기 콘텐츠 섹션의 UI 정리, 추천 알고리즘 호출 타이밍을 프론트에서 제어하는 방향으로 진행.',
        time: '14:21',
        unread: true,
        tags: [
            { label: '멘션', tone: 'blue' },
            { label: '나에게 알림', tone: 'green' },
        ],
        dayGroup: 'Today',
    },
    {
        id: 't3',
        title: 'Task 03',
        summary:
            '이번 개선에서는 메인 배너 로딩 최적화, 실시간 인기 콘텐츠 섹션의 UI 정리, 추천 알고리즘 호출 타이밍을 프론트에서 제어하는 방향으로 진행.',
        time: '14:21',
        unread: false,
        tags: [{ label: '나에게 할당', tone: 'green' }],
        dayGroup: 'Today',
    },
    {
        id: 'y1',
        title: 'Task 01',
        summary:
            '이번 개선에서는 메인 배너 로딩 최적화, 실시간 인기 콘텐츠 섹션의 UI 정리, 추천 알고리즘 호출 타이밍을 프론트에서 제어하는 방향으로 진행.',
        time: '14:21',
        unread: false,
        tags: [{ label: '나에게 알당', tone: 'green' }],
        dayGroup: 'Yesterday',
    },
];

/* --------------------------------- page ---------------------------------- */
export default function NotifcationContainer() {
    const [activeTab, setActiveTab] = useState<'all' | 'assigned' | 'mentioned' | 'unread'>('all');
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const allVisible = useMemo(() => {
        switch (activeTab) {
            case 'assigned':
                return MOCK.filter(t => t.tags.some(tag => tag.label.includes('할당')));
            case 'mentioned':
                return MOCK.filter(t => t.tags.some(tag => tag.label.includes('멘션')));
            case 'unread':
                return MOCK.filter(t => t.unread);
            default:
                return MOCK;
        }
    }, [activeTab]);

    const groups = useMemo(() => {
        return {
            Today: allVisible.filter(t => t.dayGroup === 'Today'),
            Yesterday: allVisible.filter(t => t.dayGroup === 'Yesterday'),
        };
    }, [allVisible]);

    const isAllChecked = allVisible.length > 0 && selectedIds.length === allVisible.length;

    const toggleAll = () => {
        setSelectedIds(prev => (isAllChecked ? [] : allVisible.map(t => t.id)));
    };

    const toggleOne = (id: string) => {
        setSelectedIds(prev => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]));
    };

    const markRead = () => {
        // 실제 API 연동 대신 데모 동작만
        alert(`${selectedIds.length}개 항목을 읽음 처리합니다.`);
    };

    const removeItems = () => {
        alert(`${selectedIds.length}개 항목을 삭제합니다.`);
    };

    return (
        <main className="mx-auto w-full max-w-3xl px-4 py-6">
            {/* Top tabs + actions */}
            <div className={toolbar()}>
                <div className="flex items-end gap-8">
                    <nav className="flex gap-6">
                        <button className={tabs({ active: activeTab === 'all' })} onClick={() => setActiveTab('all')}>
                            전체
                        </button>
                        <button
                            className={tabs({ active: activeTab === 'assigned' })}
                            onClick={() => setActiveTab('assigned')}
                        >
                            나에게 할당됨
                        </button>
                        <button
                            className={tabs({ active: activeTab === 'mentioned' })}
                            onClick={() => setActiveTab('mentioned')}
                        >
                            멘션
                        </button>
                        <button
                            className={tabs({ active: activeTab === 'unread' })}
                            onClick={() => setActiveTab('unread')}
                        >
                            읽지 않음
                        </button>
                    </nav>

                    {/* 전체선택 */}
                    <label className="ml-2 inline-flex select-none items-center gap-2 text-sm text-gray-700">
                        <input
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                            checked={isAllChecked}
                            onChange={toggleAll}
                            aria-label="전체 선택"
                        />
                        전체선택
                    </label>
                </div>

                <div className="flex items-center gap-2">
                    <button className={actionBtn({ tone: 'primary' })} onClick={markRead}>
                        읽음
                    </button>
                    <button className={actionBtn({ tone: 'danger' })} onClick={removeItems}>
                        삭제
                    </button>
                </div>
            </div>

            {/* Today */}
            {groups.Today.length > 0 && (
                <>
                    <div className={sectionTitle()}>Today</div>
                    <ul className="space-y-3">
                        {groups.Today.map(t => (
                            <li key={t.id} className={item({ selected: selectedIds.includes(t.id) })}>
                                <div className="flex items-stretch gap-3 p-4">
                                    {/* checkbox */}
                                    <div className="pt-1">
                                        <input
                                            type="checkbox"
                                            className="h-4 w-4 rounded-full border-gray-300 text-teal-600 focus:ring-teal-500"
                                            checked={selectedIds.includes(t.id)}
                                            onChange={() => toggleOne(t.id)}
                                            aria-label={`${t.title} 선택`}
                                        />
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <div className={titleRow()}>
                                            <h3 className="truncate text-[15px] font-semibold text-gray-800">
                                                {t.title}
                                            </h3>
                                            <div className="flex flex-wrap items-center gap-2">
                                                {t.tags.map((tag, i) => (
                                                    <span key={i} className={badge({ tone: tag.tone, size: 'sm' })}>
                                                        {tag.label}
                                                    </span>
                                                ))}
                                            </div>
                                            <span className={dot({ unread: t.unread })} aria-hidden />
                                            <time className="ml-auto shrink-0 text-xs text-gray-400">{t.time}</time>
                                        </div>

                                        <ul className="mt-2">
                                            <li className={bullet()}>{t.summary}</li>
                                        </ul>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </>
            )}

            {/* Yesterday */}
            {groups.Yesterday.length > 0 && (
                <>
                    <div className={sectionTitle()}>Yesterday</div>
                    <ul className="space-y-3">
                        {groups.Yesterday.map(t => (
                            <li key={t.id} className={item({ selected: selectedIds.includes(t.id) })}>
                                <div className="flex items-stretch gap-3 p-4">
                                    <div className="pt-1">
                                        <input
                                            type="checkbox"
                                            className="h-4 w-4 rounded-full border-gray-300 text-teal-600 focus:ring-teal-500"
                                            checked={selectedIds.includes(t.id)}
                                            onChange={() => toggleOne(t.id)}
                                            aria-label={`${t.title} 선택`}
                                        />
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <div className={titleRow()}>
                                            <h3 className="truncate text-[15px] font-semibold text-gray-800">
                                                {t.title}
                                            </h3>
                                            <div className="flex flex-wrap items-center gap-2">
                                                {t.tags.map((tag, i) => (
                                                    <span key={i} className={badge({ tone: tag.tone, size: 'sm' })}>
                                                        {tag.label}
                                                    </span>
                                                ))}
                                            </div>
                                            <span className={dot({ unread: t.unread })} aria-hidden />
                                            <time className="ml-auto shrink-0 text-xs text-gray-400">{t.time}</time>
                                        </div>

                                        <ul className="mt-2">
                                            <li className={bullet()}>{t.summary}</li>
                                        </ul>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </main>
    );
}
