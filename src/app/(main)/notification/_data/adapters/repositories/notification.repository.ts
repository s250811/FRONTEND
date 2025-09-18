import type { NotificationsRepositoryPort } from '../port/notification.repository.port';
import type { TaskEntity } from '../../types';

const MOCK: TaskEntity[] = [
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

export function makeNotificationsRepository(): NotificationsRepositoryPort {
    return {
        async list() {
            // 실제 구현에서는 fetch/axios 등으로 교체
            return [...MOCK];
        },
    };
}
