import { makeTrashRepository } from './adapters/repositories/collection.repository.mock';
import { presentTrashList } from './presenters/collection.presenter';

export async function loadTrashList() {
    const repo = makeTrashRepository();
    const rows = await repo.list();
    return presentTrashList(rows); // TrashListVM
}
