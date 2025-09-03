import dynamic from 'next/dynamic';

const GanttNoSSR = dynamic(() => import('./view/project-dashbaord-gantt'), {
    ssr: false,
});

export default function GanttPage() {
    return (
        <main className="mx-auto max-w-6xl p-6">
            <h1 className="mb-4 text-2xl font-bold">상위 프로젝트 이름</h1>
            <GanttNoSSR />
        </main>
    );
}
