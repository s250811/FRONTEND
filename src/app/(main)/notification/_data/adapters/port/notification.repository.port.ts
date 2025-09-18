import type { TaskEntity, GroupedTasks } from '../../types';

export interface NotificationsRepositoryPort {
    list(): Promise<TaskEntity[]>;
}
