'use client';

import { useEffect } from 'react';

export default function MockProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        console.log('process.env.NEXT_PUBLIC_API_MOCKING : ', process.env.NEXT_PUBLIC_API_MOCKING);
        // 환경변수로 on/off 제어
        if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
            import('../../mock/browser').then(({ worker }) => {
                worker.start({ onUnhandledRequest: 'bypass' });
            });
        }
    }, []);

    return <>{children}</>;
}
