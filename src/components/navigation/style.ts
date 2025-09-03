// styles/navigation.ts
import { tv } from 'tailwind-variants';

export const nav = {
    aside: tv({
        base: 'h-screen border-r border-[#F4F4F4] p-10 space-y-3 bg-white flex flex-col',
    }),
    header: tv({
        base: 'flex items-center gap-2 text-gray-800 font-semibold',
    }),
    badge: tv({
        base: 'inline-flex items-center justify-center w-6 h-6 rounded bg-gray-100',
    }),
    menuContainer: tv({
        // ✅ hover 제거 (아이콘+텍스트가 NavigationItem 안으로 들어가므로 컨테이너는 단순 정렬만)
        base: 'flex flex-row items-center',
    }),
    menu: tv({
        base: 'text-sm pt-2 flex-1 overflow-y-auto mt-[15px] -mr-10 pr-10',
    }),
    sectionTitle: tv({
        base: 'px-2 py-1 font-medium text-gray-900',
    }),
    smallMeta: tv({
        base: 'pt-4 text-xs text-gray-500',
    }),
    item: tv({
        // ✅ 행 전체가 hover될 수 있도록 flex + gap + hover 배경
        base: 'flex items-center justify-between gap-2 px-2 py-[15px] rounded transition-colors hover:bg-[#212121]/10',
        variants: {
            active: {
                false: 'text-[#646464] text-[16px]',
                true: 'bg-gray-100 text-[16px] text-gray-900',
            },
            level: {
                0: '',
                1: 'pl-8',
                2: 'pl-12',
            },
            intent: {
                link: '',
                button: 'w-full text-left',
            },
        },
        defaultVariants: {
            active: false,
            level: 0,
            intent: 'link',
        },
    }),
};
