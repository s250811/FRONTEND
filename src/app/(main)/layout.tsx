import Navigation from '@/components/navigation';

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-dvh">
            <div className="flex min-h-dvh">
                {/* 사이드바: 고정 폭 + 수축 금지 */}
                <div className="flex-none shrink-0 w-64">
                    <Navigation />
                </div>

                {/* 메인: 남은 공간 전부 + 내부가 줄어들 대상 */}
                <main className="flex-1 min-w-0 overflow-auto">{children}</main>
            </div>
        </div>
    );
}
