import MockProvider from './providers/MockProvider';
import '@/app/globals.css';

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ko">
            <MockProvider>
                <body>{children}</body>
            </MockProvider>
        </html>
    );
}
