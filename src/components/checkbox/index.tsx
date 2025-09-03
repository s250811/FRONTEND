import { useEffect, useRef } from 'react';

export default function Checkbox({
    checked,
    onChange,
    label,
    indeterminate = false,
    'aria-label': ariaLabel,
}: {
    checked: boolean;
    onChange: (next: boolean) => void;
    label: React.ReactNode;
    indeterminate?: boolean;
    'aria-label'?: string;
}) {
    const ref = useRef<HTMLInputElement>(null);

    // DOM의 indeterminate 속성 적용 (checked와는 별개 시각 상태)
    useEffect(() => {
        if (ref.current) {
            ref.current.indeterminate = !checked && !!indeterminate;
        }
    }, [checked, indeterminate]);

    return (
        <label className="flex items-start gap-x-3 cursor-pointer select-none">
            <input
                ref={ref}
                type="checkbox"
                className="sr-only peer"
                checked={checked}
                onChange={e => onChange(e.target.checked)}
                aria-label={ariaLabel}
                aria-checked={indeterminate && !checked ? 'mixed' : checked}
            />
            <span
                className={[
                    'relative inline-flex h-5 w-5 items-center justify-center rounded border',
                    checked ? 'bg-black border-black' : 'bg-white border-gray-400',
                    'transition',
                ].join(' ')}
            >
                {checked && (
                    <svg
                        className="w-3 h-3 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-7.364 7.364a1 1 0 01-1.414 0L3.293 9.414a1 1 0 011.414-1.414L8 11.293l6.293-6.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                        />
                    </svg>
                )}
                {!checked && indeterminate && <span className="absolute w-3 h-0.5 rounded bg-gray-500" />}
            </span>
            <span className="leading-5">{label}</span>
        </label>
    );
}
