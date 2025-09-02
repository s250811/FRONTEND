import Navigation from "@/components/navigation";
import "@/app/globals.css"

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ko">
            <body>
                <div className="flex flex-row">
                    <Navigation />
                    <main className="flex-1">{children}</main>
                </div>
            </body>
        </html>
    )
}