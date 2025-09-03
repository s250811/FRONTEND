// styles/navigation.ts
import { tv } from 'tailwind-variants';

export const nav = {
    aside: tv({
        base: 'h-screen border-r border-[#F4F4F4] p-12 space-y-3 bg-white flex flex-col',
    }),
    header: tv({
        base: 'flex items-center gap-2 text-gray-800 font-semibold',
    }),
    badge: tv({
        base: 'inline-flex items-center justify-center w-6 h-6 rounded bg-gray-100',
    }),
    menu: tv({
        base: 'text-sm pt-2 flex-1 overflow-y-auto',
    }),
    sectionTitle: tv({
        base: 'px-2 py-1 font-medium text-gray-900',
    }),
    smallMeta: tv({
        base: 'pt-4 text-xs text-gray-500',
    }),
    item: tv({
        base: 'block px-2 py-1 rounded transition-colors',
        variants: {
            active: {
                false: 'text-gray-700 hover:bg-gray-50',
                true: 'bg-gray-100 text-gray-900',
            },
            level: {
                0: '',
                1: 'pl-3',
                2: 'pl-6',
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
