import '@/app/globals.css';

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ko">
                <body>{children}</body>
        </html>
    );
}
