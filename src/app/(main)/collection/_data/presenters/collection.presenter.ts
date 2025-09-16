import type { TrashEntity, TrashListVM } from '../types';

export function presentTrashList(rows: TrashEntity[]): TrashListVM {
    return {
        rows: rows.map(r => ({
            id: r.id,
            title: r.title,
            category: r.category,
            location: r.location,
            date: r.date,
            deletedBy: r.deletedBy,
        })),
    };
}
