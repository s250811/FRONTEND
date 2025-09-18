import { makeNotificationsRepository } from './adapters/repositories/notification.repository';
import { presentNotifications } from './adapters/presenters/notification.presenter';

export async function loadNotificationsVM() {
    const repo = makeNotificationsRepository();
    const rows = await repo.list();
    return presentNotifications(rows);
}
