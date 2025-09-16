import type { TrashEntity } from '../../types';

export interface CollectionRepositoryPort {
    list(): Promise<TrashEntity[]>;
    restore(ids: string[]): Promise<void>;
    delete(ids: string[]): Promise<void>;
}
