'use server';

import { makeTrashRepository } from './adapters/repositories/collection.repository.mock';

export async function restoreTrashAction(ids: string[]) {
    const repo = makeTrashRepository();
    await repo.restore(ids);
}

export async function deleteTrashAction(ids: string[]) {
    const repo = makeTrashRepository();
    await repo.delete(ids);
}
