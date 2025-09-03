import Navigation from '@/components/navigation';

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-dvh">
            <div className="flex min-h-dvh">
                <div className="flex-none shrink-0">
                    <Navigation />
                </div>

                <main className="flex-1 min-w-0 overflow-auto">{children}</main>
            </div>
        </div>
    );
}
