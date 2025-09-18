export type TaskEntity = {
    id: string;
    title: string;
    summary: string;
    time: string; // "14:21"
    unread: boolean;
    tags: Array<{ label: string; tone?: 'gray' | 'blue' | 'green' | 'indigo' }>;
    dayGroup: 'Today' | 'Yesterday';
};

export type GroupedTasks = {
    Today: TaskEntity[];
    Yesterday: TaskEntity[];
};

export type NotificationsVM = {
    groups: GroupedTasks;
};
