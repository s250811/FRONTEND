'use client';

import React from 'react';
import { nav } from './style';

type NavItemProps = {
    as?: 'a' | 'button' | 'div';
    href?: string; // as="a"일 때 사용할 href
    children: React.ReactNode;
    active?: boolean;
    level?: 0 | 1 | 2;
    className?: string;
    onClick?: () => void;
};

function NavigationItem({
    as: ElementType = 'a',
    href,
    children,
    active = false,
    level = 0,
    className,
    onClick,
}: NavItemProps) {
    const RenderElement = ElementType as React.ElementType;
    const navigationIntent = ElementType === 'button' ? 'button' : 'link';

    // ✅ 폭이 뭉개지지 않도록 기본적으로 줄어들지 않게(shrink-0) + 행 전체(block w-full)
    const widthSafeBaseClass = 'block w-full shrink-0';

    // 전달받은 className과 안전 클래스를 합치기
    const mergedClassName = [widthSafeBaseClass, className].filter(Boolean).join(' ');

    const commonProps: React.HTMLAttributes<HTMLElement> & { [key: string]: unknown } = {
        className: nav.item({
            active,
            level,
            intent: navigationIntent,
            className: mergedClassName,
        }),
        onClick,
    };

    // 의미에 맞는 속성 부여
    if (ElementType === 'a') {
        commonProps.href = href ?? '#';
        if (active) commonProps['aria-current'] = 'page';
    }
    if (ElementType === 'button') {
        commonProps.type = 'button';
    }
    if (ElementType === 'div') {
        commonProps.role = 'button';
    }

    return <RenderElement {...commonProps}>{children}</RenderElement>;
}

export default function Navigation() {
    return (
        <aside className={nav.aside()}>
            {/* 헤더 */}
            <div className={nav.header()}>
                <span className={nav.badge()}>Ⅱ</span>
                프로젝트 명
            </div>

            {/* 메뉴 */}
            <nav className={nav.menu()} aria-label="사이드 내비게이션">
                <NavigationItem href="/alerts">알림함</NavigationItem>

                <div>
                    <NavigationItem as="button">내 프로젝트</NavigationItem>
                </div>
                <div>
                    <NavigationItem as="button">체험기반 플러그</NavigationItem>
                </div>
                <div>
                    <NavigationItem as="button">계획 관리</NavigationItem>
                </div>

                <div>
                    <div className={nav.sectionTitle()}>상세이미지 개선</div>
                    <div className="space-y-1">
                        <NavigationItem level={1} href="/p1">
                            하위 프로젝트 1
                        </NavigationItem>
                        <NavigationItem level={1} active href="/p2">
                            하위 프로젝트 2
                        </NavigationItem>
                        <NavigationItem level={1} href="/t1">
                            업무 1
                        </NavigationItem>
                        <NavigationItem level={1} href="/p3">
                            하위 프로젝트 3
                        </NavigationItem>
                        <NavigationItem level={1} href="/p4">
                            하위 프로젝트 4
                        </NavigationItem>
                        <NavigationItem level={1} href="/p5">
                            하위 프로젝트 5
                        </NavigationItem>
                        <NavigationItem level={1} href="/p6">
                            하위 프로젝트 6
                        </NavigationItem>
                    </div>
                </div>

                <div className="pt-2">
                    <NavigationItem href="/trash">휴지통</NavigationItem>
                </div>

                <div className={nav.smallMeta()}>
                    <div className="px-2 py-1">
                        <NavigationItem as="button">워크스페이스 초대</NavigationItem>
                    </div>
                    <div className="px-2 py-1">
                        <NavigationItem as="button">워크스페이스 생성</NavigationItem>
                    </div>
                </div>
            </nav>
        </aside>
    );
}
