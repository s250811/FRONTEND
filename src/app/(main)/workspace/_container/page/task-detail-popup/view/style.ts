// app/(main)/workspace/_container/page/style.ts
import { tv, type VariantProps } from 'tailwind-variants';

export const style = {
    badge: tv({
        base: 'inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium',
        variants: {
            tone: {
                active: 'border-emerald-200 bg-emerald-50 text-emerald-700',
                gray: 'border-gray-200 bg-gray-50 text-gray-600',
                blue: 'border-sky-200 bg-sky-50 text-sky-700',
                teal: 'border-teal-200 bg-teal-50 text-teal-700',
            },
        },
        defaultVariants: { tone: 'gray' },
    }),

    iconButton: tv({
        base: 'inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-700',
    }),

    statCard: tv({
        base: 'relative rounded-2xl border p-4 md:p-6 transition-colors bg-white',
        variants: {
            tone: { green: 'border-emerald-100 bg-emerald-50/50', gray: 'border-gray-200' },
        },
        defaultVariants: { tone: 'gray' },
    }),

    kpi: tv({ base: 'text-3xl font-semibold tracking-tight text-gray-900' }),

    table: tv({ base: 'w-full text-sm text-gray-700 border-separate border-spacing-0 rounded-xl overflow-hidden' }),
    th: tv({
        base: 'sticky top-0 z-10 bg-white/70 backdrop-blur border-b border-gray-200 px-4 py-3 text-left font-medium text-gray-500',
    }),
    td: tv({ base: 'px-4 py-3 border-b border-gray-100' }),

    chip: tv({
        base: 'inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold',
        variants: {
            tone: {
                green: 'bg-emerald-100 text-emerald-700',
                yellow: 'bg-amber-100 text-amber-700',
                red: 'bg-rose-100 text-rose-700',
                gray: 'bg-gray-100 text-gray-700',
                teal: 'bg-teal-100 text-teal-700',
            },
        },
        defaultVariants: { tone: 'gray' },
    }),

    progressChip: tv({
        base: 'inline-flex items-center gap-1 rounded-full border px-2 py-1 text-[11px] font-medium',
        variants: {
            tone: {
                green: 'border-emerald-200 text-emerald-700',
                yellow: 'border-amber-200 text-amber-700',
                red: 'border-rose-200 text-rose-700',
                gray: 'border-gray-200 text-gray-600',
            },
        },
        defaultVariants: { tone: 'gray' },
    }),
};

export type BadgeVariants = VariantProps<typeof style.badge>;
export type IconButtonVariants = VariantProps<typeof style.iconButton>;
export type StatCardVariants = VariantProps<typeof style.statCard>;
export type KpiVariants = VariantProps<typeof style.kpi>;
export type TableVariants = VariantProps<typeof style.table>;
export type ThVariants = VariantProps<typeof style.th>;
export type TdVariants = VariantProps<typeof style.td>;
export type ChipVariants = VariantProps<typeof style.chip>;
export type ProgressChipVariants = VariantProps<typeof style.progressChip>;
