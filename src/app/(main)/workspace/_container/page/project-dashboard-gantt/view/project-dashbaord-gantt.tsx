'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import 'gantt-task-react/dist/index.css';
import { Gantt, Task, ViewMode } from 'gantt-task-react';
import type { GanttProps } from 'gantt-task-react';
import dayjs from 'dayjs';

/** 아바타 경로 매핑 (실제 경로로 바꿔주세요) */
const AVATARS: Record<string, string> = {
    t1: '/avatar-alexis.png',
    t2: '/avatar-derek.png',
    t3: '/avatar-alice.png',
    t4: '/avatar-alexis.png',
    p1: '/avatar-alexis.png',
    p3: '/avatar-alexis.png',
    p6: '/avatar-derek.png',
};

type Overlay = {
    id: string;
    left: number;
    top: number;
    width: number;
    height: number;
    pct: number; // 0~100
    tone: 'emerald' | 'amber' | 'gray';
};

export default function GanttChart() {
    // Set a default view mode
    const [viewMode] = useState<ViewMode>(ViewMode.Day);
    const wrapRef = useRef<HTMLDivElement>(null);
    const [overlays, setOverlays] = useState<Overlay[]>([]);

    const handleDateChange: GanttProps['onDateChange'] = () => true;

    /** 데모 데이터 (스크린샷 타이밍과 일치) */
    const tasks: Task[] = useMemo(() => {
        const d = (date: string) => dayjs(date).toDate();
        return [
            // 좌측 리스트 항목들이 위에서 아래로 보이는 순서와 거의 일치하도록 구성
            {
                id: 'p1',
                type: 'project',
                name: '하위 프로젝트 1',
                start: d('2025-04-01'),
                end: d('2025-04-08'),
                progress: 100,
                styles: { progressColor: '#c7c7c7', progressSelectedColor: '#9ca3af' },
                isDisabled: true,
            },
            {
                id: 'p2',
                type: 'project',
                name: '하위 프로젝트 2',
                start: d('2025-04-01'),
                end: d('2025-04-12'),
                progress: 50,
                styles: { progressColor: '#10b981', progressSelectedColor: '#059669' }, // emerald
            },
            // p2 내부
            {
                id: 't1',
                project: 'p2',
                type: 'task',
                name: 'Alexis Tran',
                start: d('2025-04-01'),
                end: d('2025-04-07'),
                progress: 100,
                styles: { progressColor: '#c7c7c7', progressSelectedColor: '#9ca3af' }, // 회색
            },
            {
                id: 't2',
                project: 'p2',
                type: 'task',
                name: 'Derek Yu',
                start: d('2025-04-03'),
                end: d('2025-04-09'),
                progress: 50,
                styles: { progressColor: '#10b981', progressSelectedColor: '#059669' }, // 에메랄드
            },
            {
                id: 't3',
                project: 'p2',
                type: 'task',
                name: 'Alice',
                start: d('2025-04-05'),
                end: d('2025-04-08'),
                progress: 20,
                styles: { progressColor: '#10b981', progressSelectedColor: '#059669' }, // 에메랄드 (강조)
            },
            {
                id: 't4',
                project: 'p2',
                type: 'task',
                name: 'Alexis Tran',
                start: d('2025-04-06'),
                end: d('2025-04-11'),
                progress: 50,
                styles: { progressColor: '#f59e0b', progressSelectedColor: '#d97706' }, // 앰버
            },
            // 하단 구간
            {
                id: 'p3',
                type: 'project',
                name: '하위 프로젝트 3',
                start: d('2025-04-07'),
                end: d('2025-04-12'),
                progress: 20,
                styles: { progressColor: '#c7c7c7', progressSelectedColor: '#9ca3af' },
            },
            {
                id: 'p6',
                type: 'project',
                name: '하위 프로젝트 6',
                start: d('2025-04-09'),
                end: d('2025-04-14'),
                progress: 10,
                styles: { progressColor: '#c7c7c7', progressSelectedColor: '#9ca3af' }, // 회색 막대, % 10
            },
        ];
    }, []);

    // Define the type for the updateOverlays function
    type UpdateOverlaysFunction = () => void;

    // Use a ref to store the updateOverlays function to avoid circular dependency
    const updateOverlaysRef = useRef<UpdateOverlaysFunction>(() => {});

    // Define the updateOverlays function
    const updateOverlays = useCallback<UpdateOverlaysFunction>(() => {
        const host = wrapRef.current;
        if (!host) return;

        const refresh = (): void => {
            const svg = host.querySelector<SVGSVGElement>('svg');
            if (!svg) return;
            // 위 선택자가 브라우저/버전에 따라 다를 수 있어 fallback: 모든 rect.bar
            const rects = Array.from(svg.querySelectorAll<SVGRectElement>('rect.bar'));

            // rect.bar 개수와 tasks 개수를 최소치로 맞춰 순서 매핑
            const count = Math.min(rects.length, tasks.length);
            const hostBox = host.getBoundingClientRect();

            const next: Overlay[] = [];
            for (let i = 0; i < count; i++) {
                const r = rects[i];
                // 진행률 rect
                const p = r.parentElement?.querySelector<SVGRectElement>('rect.barProgress');
                const rb = r.getBoundingClientRect();
                const width = rb.width;
                const height = rb.height;
                const left = rb.left - hostBox.left;
                const top = rb.top - hostBox.top;

                const totalW = Math.max(1, Number(r.getAttribute('width') || width));
                const progW = Number(p?.getAttribute('width') || 0);
                const pct = Math.max(0, Math.min(100, Math.round((progW / totalW) * 100)));

                const fill = (p?.getAttribute('fill') || r.getAttribute('fill') || '').toLowerCase();
                const tone: Overlay['tone'] =
                    fill.includes('10b981') || fill.includes('059669')
                        ? 'emerald'
                        : fill.includes('f59e0b') || fill.includes('d97706')
                          ? 'amber'
                          : 'gray';

                next.push({ id: tasks[i].id, left, top, width, height, pct, tone });
            }
            setOverlays(next);
        };

        // 최초/스크롤/리사이즈에 반응
        const timeline = host.querySelector<HTMLElement>('.ganttVerticalContainer') || host;
        const ro = new ResizeObserver(refresh);
        ro.observe(host);
        if (timeline) timeline.addEventListener('scroll', refresh, { passive: true });
        window.addEventListener('resize', refresh, { passive: true });

        // 약간 지연 후 1회
        const id = window.setTimeout(refresh, 80);

        return () => {
            clearTimeout(id);
            ro.disconnect();
            if (timeline) timeline.removeEventListener('scroll', refresh);
            window.removeEventListener('resize', refresh);
        };
    }, [tasks, wrapRef, setOverlays]);

    // Store the updateOverlays function in the ref
    useEffect(() => {
        updateOverlaysRef.current = updateOverlays;
    }, [updateOverlays]);

    // Call the updateOverlays function using the ref to avoid circular dependency
    useEffect(() => {
        const update = () => updateOverlaysRef.current();
        update();
        return () => {
            // Cleanup function
        };
    }, [updateOverlaysRef]);

    return (
        <div className="w-full">
            {/* 상단 라벨/탭은 이미 만드신 곳에 있고, 여기서는 간트 카드만 */}
            <div ref={wrapRef} className="relative rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                {/* 실제 간트 */}
                <Gantt
                    tasks={tasks}
                    viewMode={viewMode}
                    listCellWidth="220px"
                    columnWidth={viewMode === ViewMode.Month ? 200 : viewMode === ViewMode.Week ? 60 : 40}
                    barCornerRadius={14}
                    todayColor="rgba(16,185,129,0.12)"
                    onDateChange={handleDateChange}
                    locale="ko-KR"
                    TaskListHeader={OnlyNameHeader}
                    TaskListTable={OnlyNameTable}
                />

                {/* === 오버레이 레이어 (아바타 + 퍼센트 캡슐 + 오른쪽 점) === */}
                <div className="pointer-events-none absolute inset-0">
                    {overlays.map(o => {
                        const avatar = AVATARS[o.id];
                        const pillTop = o.top + (o.height - 28) / 2; // 막대 중앙정렬(높이 28 기준)
                        const pillLeft = o.left;
                        const pillWidth = o.width;
                        const dotColor = o.tone === 'emerald' ? '#34d399' : o.tone === 'amber' ? '#f59e0b' : '#9ca3af';
                        const pillBg =
                            // 스샷처럼 Alice(20%) 막대는 채도가 훨씬 높은 에메랄드 강조
                            o.id === 't3' ? 'rgba(16,185,129,0.25)' : '#f3f4f6';

                        return (
                            <div key={o.id}>
                                {/* 막대 캡슐 시각 보정(부드러운 그림자/반경) */}
                                <div
                                    style={{
                                        position: 'absolute',
                                        left: pillLeft,
                                        top: pillTop,
                                        width: pillWidth,
                                        height: 28,
                                        borderRadius: 9999,
                                        boxShadow: '0 1px 1px rgba(0,0,0,.06)',
                                        background: pillBg,
                                    }}
                                />
                                {/* 왼쪽 아바타(막대 안쪽) */}
                                {avatar && (
                                    <div
                                        style={{
                                            position: 'absolute',
                                            left: pillLeft + 8,
                                            top: pillTop + 4,
                                            width: 20,
                                            height: 20,
                                            borderRadius: '9999px',
                                            backgroundImage: `url(${avatar})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                            boxShadow: '0 0 0 2px #fff',
                                        }}
                                    />
                                )}
                                {/* 우측 퍼센트 캡슐 + 컬러 점 */}
                                <div
                                    style={{
                                        position: 'absolute',
                                        left: pillLeft + pillWidth + 8,
                                        top: pillTop + 4,
                                        height: 20,
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: 6,
                                        padding: '0 8px',
                                        borderRadius: 9999,
                                        background: '#fff',
                                        border: '1px solid #e5e7eb',
                                        fontSize: 12,
                                        color: '#111827',
                                        boxShadow: '0 1px 1px rgba(0,0,0,.03)',
                                    }}
                                >
                                    <span
                                        style={{
                                            width: 8,
                                            height: 8,
                                            borderRadius: 9999,
                                            background: dotColor,
                                        }}
                                    />
                                    <span>{o.pct}%</span>
                                </div>
                            </div>
                        );
                    })}

                    {/* 오늘 수직 점선 (스샷의 진한 점선) - 라이브러리 todayColor 위에 강조선 추가 */}
                    <TodayDashedLine containerRef={wrapRef} />
                </div>
            </div>

            {/* 글로벌 스타일: 좌측 리스트/헤더/그리드/막대 라운드 보정 */}
            <style jsx global>{`
                .ganttTable {
                    border-right: 1px solid #e5e7eb;
                }
                .ganttTable_Header {
                    font-weight: 700;
                    color: #111827;
                }
                .ganttTable_body {
                    font-size: 14px;
                    color: #111827;
                }
                .ganttTable_body .taskListCell {
                    padding-left: 12px !important;
                }
                .calendarRow {
                    border-bottom: 1px solid #f3f4f6;
                }
                .bar,
                .barProgress {
                    height: 28px !important;
                    rx: 14px !important;
                    ry: 14px !important;
                    stroke: rgba(0, 0, 0, 0.04) !important;
                }
                /* 점선 today 기본선은 연하게, 오버레이에서 진한 점선 추가 */
                .today,
                .todayMarker {
                    border-left: 2px dashed rgba(16, 185, 129, 0.25) !important;
                }
            `}</style>
        </div>
    );
}

/** 오늘 수직 점선: 실제 오늘 위치에 진한 점선 오버레이 */
function TodayDashedLine({
    containerRef,
}: {
    containerRef: React.MutableRefObject<HTMLDivElement | null> | React.RefObject<HTMLDivElement | null>;
}) {
    const [style, setStyle] = useState<React.CSSProperties | null>(null);

    // Define the refresh function
    const refresh = useCallback((): void => {
        const host = containerRef.current;
        if (!host) return;

        const svg = host.querySelector<SVGSVGElement>('svg');
        if (!svg) return;
        const today = svg.querySelector<SVGRectElement>('rect.today, .today');
        if (!today) return;
        const hostBox = host.getBoundingClientRect();
        const tb = today.getBoundingClientRect();
        setStyle({
            position: 'absolute',
            left: tb.left - hostBox.left - 1,
            top: 0,
            bottom: 0,
            width: 0,
            borderLeft: '2px dashed #10b981',
        });
    }, [containerRef]);

    // Set up the effect to handle updates
    useEffect(() => {
        const host = containerRef.current;
        if (!host) return;

        // Initial refresh
        refresh();

        // Set up observers and event listeners
        const ro = new ResizeObserver(refresh);
        ro.observe(host);

        const timeline = host.querySelector<HTMLElement>('.ganttVerticalContainer') || host;
        timeline.addEventListener('scroll', refresh, { passive: true });
        window.addEventListener('resize', refresh, { passive: true });

        // Schedule an initial refresh after a short delay
        const id = window.setTimeout(refresh, 80);

        // Cleanup function
        return (): void => {
            clearTimeout(id);
            ro.disconnect();
            timeline.removeEventListener('scroll', refresh);
            window.removeEventListener('resize', refresh);
        };
    }, [containerRef, refresh]);

    if (!style) return null;
    return <div className="pointer-events-none" style={style} />;
}

interface OnlyNameHeaderProps {
    headerHeight: number;
    rowWidth: number | string;
}

const OnlyNameHeader: React.FC<OnlyNameHeaderProps> = ({ headerHeight, rowWidth }) => (
    <div className="ganttTable_Header" style={{ height: headerHeight }}>
        <div className="taskListHeader" style={{ width: rowWidth }}>
            Name
        </div>
    </div>
);

// Name만 남기는 바디
interface OnlyNameTableProps {
    tasks: Task[];
    rowHeight: number;
    rowWidth: number | string;
    onExpanderClick?: (task: Task) => void;
}

const OnlyNameTable: React.FC<OnlyNameTableProps> = ({ tasks, rowHeight, rowWidth, onExpanderClick }) => (
    <div className="ganttTable_body">
        {tasks.map((t: Task) => (
            <div key={t.id} className="taskListRow" style={{ height: rowHeight }}>
                <div className="taskListCell flex items-center gap-2" style={{ width: rowWidth }}>
                    {/* 필요하면 펼침 토글 */}
                    {typeof (t as Task & { hideChildren?: boolean }).hideChildren === 'boolean' && (
                        <button
                            type="button"
                            className="expander"
                            onClick={() => onExpanderClick?.(t)}
                            aria-label="toggle"
                        />
                    )}
                    <span className="truncate">{t.name}</span>
                </div>
            </div>
        ))}
    </div>
);
