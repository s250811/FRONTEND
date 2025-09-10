import dynamic from 'next/dynamic';

const GanttNoSSR = dynamic(() => import('./view/project-dashbaord-gantt'), {
    ssr: false,
});

export default function GanttPage() {
    return (
        <main className="mx-auto max-w-6xl p-6">
            <GanttNoSSR />
        </main>
    );
}
