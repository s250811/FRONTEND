export type TrashEntity = {
    id: string;
    title: string;
    category: string;
    location: string;
    date: string; // YYYY.MM.DD
    deletedBy: string;
};

export type TrashListVM = {
    rows: Array<{
        id: string;
        title: string;
        category: string;
        location: string;
        date: string;
        deletedBy: string;
    }>;
};
