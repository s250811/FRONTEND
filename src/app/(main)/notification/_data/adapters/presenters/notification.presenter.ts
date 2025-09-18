import type { TaskEntity, NotificationsVM } from '../../types';

export function presentNotifications(rows: TaskEntity[]): NotificationsVM {
    return {
        groups: {
            Today: rows.filter(t => t.dayGroup === 'Today'),
            Yesterday: rows.filter(t => t.dayGroup === 'Yesterday'),
        },
    };
}
