import Image from 'next/image';

export default function Footer() {
    return (
        <footer className="flex flex-row justify-between px-[48px] py-[38px] bg-[#212121]/5 mt-[20px]">
            {/* Logo & Copyright */}
            <div className="flex flex-col gap-y-[96px]">
                <Image src="/logo/footer_logo.svg" alt="Logo" width={48} height={38} />
                <div className="text-[12px] text-[#828282]">@ 2025 Pickle AI. All rights reserved.</div>
            </div>

            {/* Contact */}
            <div className="flex flex-col gap-y-[10px]">
                <span className="text-lg">Let&apos;s Talk</span>
                <span className="text-[12px] text-[#212121] underline opacity-60">contact@yourdomain.com</span>
            </div>
        </footer>
    );
}
