'use client';

import React, { useMemo, useState, useEffect } from 'react';
import { tv } from 'tailwind-variants';

/* ============================== styles(tv) =============================== */
const pageWrap = tv({ base: 'mx-auto w-full max-w-6xl px-4 py-8' });

const searchBox = tv({
    base: 'relative ml-auto w-[320px] max-w-full',
});
const searchInput = tv({
    base: 'w-full rounded-full border border-gray-200 bg-white pl-10 pr-4 py-2.5 text-sm outline-none placeholder:text-gray-400 focus:border-emerald-400',
});

const tableWrap = tv({ base: 'relative overflow-x-auto rounded-2xl border border-gray-200 bg-white' });

const table = tv({ base: 'w-full text-sm text-gray-800 border-separate border-spacing-0' });

const th = tv({
    base: 'sticky top-0 z-10 bg-white px-4 py-3 text-left font-medium text-gray-500 border-b border-gray-200',
});

const td = tv({
    base: 'px-4 py-4 align-middle border-b border-gray-100',
});

const row = tv({
    base: 'transition-colors',
    variants: {
        selected: {
            true: 'bg-emerald-50/40 ring-1 ring-emerald-200',
            false: 'hover:bg-gray-50/60',
        },
        withOutline: {
            true: 'outline outline-1 outline-emerald-300/70 rounded-xl',
            false: '',
        },
    },
});

const tag = tv({
    base: 'inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium',
    variants: {
        tone: {
            gray: 'border-gray-200 text-gray-600 bg-gray-50',
            green: 'border-emerald-200 text-emerald-700 bg-emerald-50',
        },
    },
    defaultVariants: { tone: 'gray' },
});

const iconBtn = tv({
    base: 'inline-flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-700',
});

const bulkMenu = tv({
    base: 'absolute right-3 bottom-3 z-20 rounded-xl border border-gray-200 bg-white shadow-lg ring-1 ring-black/5 overflow-hidden',
});

const pagerBtn = tv({
    base: 'inline-flex h-8 min-w-8 items-center justify-center rounded-md border text-sm',
    variants: {
        active: {
            true: 'border-emerald-600 text-white bg-emerald-600',
            false: 'border-gray-200 text-gray-700 hover:bg-gray-50',
        },
        ghost: { true: 'border-transparent text-gray-400 hover:bg-gray-50' },
    },
});

/* ================================ types ================================= */
type TrashRow = {
    id: string;
    title: string;
    category: string;
    location: string;
    date: string; // YYYY.MM.DD
    deletedBy: string;
};

/* =============================== mock data ============================== */
const MOCK: TrashRow[] = Array.from({ length: 5 }).map((_, i) => ({
    id: `row-${i + 1}`,
    title: '홈 화면 개선 - 디자인',
    category: '태스크',
    location: '누피 폴더',
    date: '2025.06.02',
    deletedBy: 'Alexis Tran',
}));

/* ============================== small icons ============================= */
const CaretDown = () => (
    <svg viewBox="0 0 24 24" className="h-4 w-4 text-gray-400">
        <path d="M7 10l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
);
const RestoreIcon = () => (
    <svg viewBox="0 0 24 24" className="h-4 w-4">
        <path d="M12 8v4l3 3" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M12 5a7 7 0 1 1-6.16 10.39" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M6 5v4H2" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
);
const DeleteIcon = () => (
    <svg viewBox="0 0 24 24" className="h-4 w-4">
        <path
            d="M5 7h14M10 11v6M14 11v6M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
        />
    </svg>
);
const Avatar = ({ name }: { name: string }) => (
    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-gray-200 text-gray-500 text-[11px] font-medium">
        {name[0]}
    </span>
);

/* ================================= page ================================= */
export default function CollectionContainer() {
    const [rows, setRows] = useState<TrashRow[]>(MOCK);
    const [selected, setSelected] = useState<Record<string, boolean>>({
        [MOCK[0].id]: true,
        [MOCK[2].id]: true,
        [MOCK[4].id]: true,
    });

    const [q, setQ] = useState('');
    const filtered = useMemo(() => rows.filter(r => r.title.toLowerCase().includes(q.toLowerCase())), [rows, q]);

    const allChecked = filtered.length > 0 && filtered.every(r => selected[r.id]);
    const someChecked = filtered.some(r => selected[r.id]) && !allChecked;

    const toggleOne = (id: string) => setSelected(prev => ({ ...prev, [id]: !prev[id] }));

    const toggleAll = () => {
        if (allChecked) {
            const next = { ...selected };
            filtered.forEach(r => delete next[r.id]);
            setSelected(next);
        } else {
            const add = Object.fromEntries(filtered.map(r => [r.id, true] as const));
            setSelected(prev => ({ ...prev, ...add }));
        }
    };

    const selectedIds = Object.entries(selected)
        .filter(([, v]) => v)
        .map(([k]) => k);
    const selectedCount = selectedIds.length;

    const restoreOne = (id: string) => {
        // 실제 API 연동 시 mutate 후 목록 새로고침
        setRows(prev => prev.filter(r => r.id !== id));
        setSelected(prev => {
            const n = { ...prev };
            delete n[id];
            return n;
        });
    };
    const deleteOne = (id: string) => {
        setRows(prev => prev.filter(r => r.id !== id));
        setSelected(prev => {
            const n = { ...prev };
            delete n[id];
            return n;
        });
    };

    const bulkRestore = () => {
        setRows(prev => prev.filter(r => !selected[r.id]));
        setSelected({});
    };
    const bulkDelete = () => {
        setRows(prev => prev.filter(r => !selected[r.id]));
        setSelected({});
    };

    // 간단한 pagination 목업
    const [page, setPage] = useState(1);

    useEffect(() => {
        // 페이지 이동시 선택 해제(선택 유지 원하면 제거)
        setSelected({});
    }, [page]);

    return (
        <div className={pageWrap()}>
            {/* 상단 타이틀 + 검색 */}
            <div className="mb-4 flex items-center gap-4">
                <h1 className="text-2xl font-semibold text-gray-900">휴지통</h1>
                <div className={searchBox()}>
                    <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <svg viewBox="0 0 24 24" className="h-4 w-4">
                            <path
                                d="M21 21l-4.35-4.35M10 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16z"
                                stroke="currentColor"
                                strokeWidth="2"
                                fill="none"
                                strokeLinecap="round"
                            />
                        </svg>
                    </span>
                    <input
                        value={q}
                        onChange={e => setQ(e.target.value)}
                        placeholder="프로젝트 이름 검색"
                        className={searchInput()}
                    />
                </div>
            </div>

            {/* 표 */}
            <div className={tableWrap()}>
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
                            <th className={th()}>Task</th>
                            <th className={th()}>
                                <div className="inline-flex items-center gap-1">
                                    Category <CaretDown />
                                </div>
                            </th>
                            <th className={th()}>
                                <div className="inline-flex items-center gap-1">
                                    Location <CaretDown />
                                </div>
                            </th>
                            <th className={th()}>
                                <div className="inline-flex items-center gap-1">
                                    Dates <CaretDown />
                                </div>
                            </th>
                            <th className={th()}>
                                <div className="inline-flex items-center gap-1">
                                    DeletedBy <CaretDown />
                                </div>
                            </th>
                            <th className={th()} style={{ width: 100 }} />
                        </tr>
                    </thead>

                    <tbody>
                        {filtered.map((r, i) => {
                            const isSelected = !!selected[r.id];
                            const showOutline = i === 0 || i === 2 || i === 4; // 스샷처럼 일부 행 윤곽 예시
                            return (
                                <tr key={r.id} className={row({ selected: isSelected, withOutline: showOutline })}>
                                    <td className={td()}>
                                        <input
                                            type="checkbox"
                                            checked={isSelected}
                                            onChange={() => toggleOne(r.id)}
                                            className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                                        />
                                    </td>
                                    <td className={td()}>
                                        <div className="flex items-center gap-3">
                                            <span className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 bg-white">
                                                {/* 문서 아이콘 대체 */}
                                                <svg viewBox="0 0 24 24" className="h-4 w-4 text-gray-500">
                                                    <path
                                                        d="M6 2h8l4 4v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        fill="none"
                                                    />
                                                    <path
                                                        d="M14 2v4h4"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        fill="none"
                                                    />
                                                </svg>
                                            </span>
                                            <span className="font-medium"> {r.title} </span>
                                        </div>
                                    </td>
                                    <td className={td()}>
                                        <span className={tag({ tone: 'gray' })}>태스크</span>
                                    </td>
                                    <td className={td()}>{r.location}</td>
                                    <td className={td()}>{r.date}</td>
                                    <td className={td()}>
                                        <div className="flex items-center gap-2 text-gray-700">
                                            <Avatar name={r.deletedBy} />
                                            <span className="text-gray-600">{r.deletedBy}</span>
                                        </div>
                                    </td>
                                    <td className={td()}>
                                        <div className="flex items-center justify-end gap-2">
                                            {/* Restore */}
                                            <button
                                                title="Restore"
                                                onClick={() => restoreOne(r.id)}
                                                className={
                                                    iconBtn() +
                                                    ' text-emerald-600 border-emerald-200 hover:bg-emerald-50'
                                                }
                                            >
                                                <RestoreIcon />
                                            </button>
                                            {/* Delete */}
                                            <button
                                                title="Delete"
                                                onClick={() => deleteOne(r.id)}
                                                className={
                                                    iconBtn() + ' text-rose-600 border-rose-200 hover:bg-rose-50'
                                                }
                                            >
                                                <DeleteIcon />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}

                        {filtered.length === 0 && (
                            <tr>
                                <td className="px-4 py-12 text-center text-sm text-gray-500" colSpan={7}>
                                    결과가 없습니다.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {/* 선택 항목 있을 때 우측 하단 벌크 메뉴 */}
                {selectedCount > 0 && (
                    <div className={bulkMenu()}>
                        <ul className="text-sm text-gray-700">
                            <li>
                                <button
                                    onClick={bulkRestore}
                                    className="flex w-full items-center gap-2 px-3 py-2 hover:bg-gray-50"
                                >
                                    <span className="inline-flex h-5 w-5 items-center justify-center rounded bg-emerald-100 text-emerald-700">
                                        <RestoreIcon />
                                    </span>
                                    전체복구
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={bulkDelete}
                                    className="flex w-full items-center gap-2 px-3 py-2 hover:bg-gray-50"
                                >
                                    <span className="inline-flex h-5 w-5 items-center justify-center rounded bg-rose-100 text-rose-700">
                                        <DeleteIcon />
                                    </span>
                                    삭제하기
                                </button>
                            </li>
                        </ul>
                    </div>
                )}
            </div>

            {/* pager */}
            <div className="mt-6 flex items-center justify-center gap-2 text-sm">
                <button
                    className={pagerBtn({ active: false, ghost: true })}
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                >
                    ‹
                </button>
                <button className={pagerBtn({ active: page === 1 })} onClick={() => setPage(1)}>
                    1
                </button>
                <button className={pagerBtn({ active: page === 2 })} onClick={() => setPage(2)}>
                    2
                </button>
                <button className={pagerBtn({ active: false, ghost: true })} onClick={() => setPage(p => p + 1)}>
                    ›
                </button>
            </div>
        </div>
    );
}
