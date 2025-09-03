'use client';

import React, { useMemo, useState } from 'react';
import 'gantt-task-react/dist/index.css';
import { Gantt, Task, ViewMode } from 'gantt-task-react';
import type { GanttProps } from 'gantt-task-react';
import dayjs from 'dayjs';

/**
 * 간트 차트 데모: 하위 프로젝트와 업무들이 겹치는 스케줄
 * - 드래그로 날짜 조정, 리사이즈, 진행률 조정 가능
 * - 상단에서 Zoom(뷰 모드) 변경 가능
 */
export default function GanttChart() {
    const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.Day);

    const handleDateChange: GanttProps['onDateChange'] = async (task, ...rest: unknown[]) => {
        // case 1: children 배열만 넘어온 경우
        if (rest.length === 1 && Array.isArray(rest[0])) {
            const children = rest[0] as Task[];
            console.log('date change (children):', task.id, children.length);
            return true;
        }

        // case 2: start, end, dependencies 넘어온 경우
        if (rest.length >= 2 && rest[0] instanceof Date && rest[1] instanceof Date) {
            const [start, end, dependencies] = rest as [Date, Date, unknown?];
            console.log('date change:', task.id, start, end, dependencies);
            return true;
        }

        return true;
    };

    // 데모 데이터
    const tasks: Task[] = useMemo(() => {
        const d = (date: string) => dayjs(date).toDate();

        return [
            {
                id: 'p2',
                type: 'project',
                name: '하위 프로젝트 2',
                start: d('2025-04-01'),
                end: d('2025-04-12'),
                progress: 50,
                styles: { progressColor: '#10b981', progressSelectedColor: '#059669' }, // emerald
            },

            {
                id: 't1',
                project: 'p2',
                type: 'task',
                name: 'Alexis Tran',
                start: d('2025-04-01'),
                end: d('2025-04-07'),
                progress: 100,
                styles: { progressColor: '#a3a3a3', progressSelectedColor: '#737373' }, // gray
            },
            {
                id: 't2',
                project: 'p2',
                type: 'task',
                name: 'Derek Yu',
                start: d('2025-04-03'),
                end: d('2025-04-09'),
                progress: 50,
                styles: { progressColor: '#10b981', progressSelectedColor: '#059669' },
            },
            {
                id: 't3',
                project: 'p2',
                type: 'task',
                name: 'Alice',
                start: d('2025-04-05'),
                end: d('2025-04-10'),
                progress: 20,
                styles: { progressColor: '#10b981', progressSelectedColor: '#059669' },
            },
            {
                id: 't4',
                project: 'p2',
                type: 'task',
                name: 'Alexis Tran',
                start: d('2025-04-06'),
                end: d('2025-04-11'),
                progress: 50,
                styles: { progressColor: '#f59e0b', progressSelectedColor: '#d97706' }, // amber
            },

            // 다른 하위 프로젝트/업무들 (스크린샷 하단 느낌)
            {
                id: 'p3',
                type: 'project',
                name: '하위 프로젝트 3',
                start: d('2025-04-07'),
                end: d('2025-04-12'),
                progress: 20,
                styles: { progressColor: '#a3a3a3', progressSelectedColor: '#737373' },
            },
            {
                id: 'p6',
                type: 'project',
                name: '하위 프로젝트 6',
                start: d('2025-04-09'),
                end: d('2025-04-14'),
                progress: 10,
                styles: { progressColor: '#ef4444', progressSelectedColor: '#dc2626' }, // red
            },
        ];
    }, []);

    return (
        <div className="w-full rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
            {/* 헤더 컨트롤 */}
            <div className="mb-3 flex items-center justify-between">
                <div className="text-lg font-semibold text-gray-800">간트</div>
                <div className="flex items-center gap-2">
                    {[
                        { k: ViewMode.Day, label: 'Day' },
                        { k: ViewMode.Week, label: 'Week' },
                        { k: ViewMode.Month, label: 'Month' },
                    ].map(v => (
                        <button
                            key={v.label}
                            onClick={() => setViewMode(v.k)}
                            className={`h-9 rounded-full px-3 text-sm ${
                                viewMode === v.k ? 'bg-emerald-600 text-white' : 'text-gray-700 hover:bg-gray-100'
                            }`}
                            type="button"
                        >
                            {v.label}
                        </button>
                    ))}
                </div>
            </div>

            <Gantt
                tasks={tasks}
                viewMode={viewMode}
                listCellWidth="220px"
                columnWidth={viewMode === ViewMode.Month ? 200 : viewMode === ViewMode.Week ? 60 : 40}
                barCornerRadius={6}
                todayColor="rgba(16,185,129,0.35)" // 오늘 표시 라인/배경
                onDateChange={handleDateChange}
                onProgressChange={(task, progress) => {
                    console.log('progress change:', task.id, progress);
                }}
                onDoubleClick={task => {
                    console.log('open modal:', task.id);
                }}
                locale="ko-KR"
            />
        </div>
    );
}
