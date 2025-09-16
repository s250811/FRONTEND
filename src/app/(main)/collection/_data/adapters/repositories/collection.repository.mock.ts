import type { CollectionRepositoryPort } from './collection.port';
import type { TrashEntity } from '../../types';

const MOCK: TrashEntity[] = Array.from({ length: 5 }).map((_, i) => ({
    id: `row-${i + 1}`,
    title: '홈 화면 개선 - 디자인',
    category: '태스크',
    location: '누피 폴더',
    date: '2025.06.02',
    deletedBy: 'Alexis Tran',
}));

export function makeTrashRepository(): CollectionRepositoryPort {
    // NOTE: 데모용 메모리 구현. 실제로는 fetch/axios 등으로 교체
    let data = [...MOCK];

    return {
        async list() {
            return [...data];
        },
        async restore(ids: string[]) {
            // 복구 = 휴지통에서 제거
            data = data.filter(r => !ids.includes(r.id));
        },
        async delete(ids: string[]) {
            // 영구 삭제 = 휴지통에서 제거
            data = data.filter(r => !ids.includes(r.id));
        },
    };
}
