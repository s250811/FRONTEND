'use client';

import React, { useState, useId } from 'react';
import { nav } from './style';
import Image from 'next/image';
import WorkspaceCreateModal, {
    CreateWorkspacePayload,
} from '@/app/(main)/workspace/_container/page/workspace-create-popup';
import WorkspaceInviteModal, { InvitePayload } from '@/app/(main)/workspace/_container/page/workspace-invite-popup';

function CollapsibleSection({
    id,
    title,
    leading,
    children,
    defaultOpen = false,
}: {
    id: string;
    title: string;
    leading: React.ReactNode;
    children: React.ReactNode;
    defaultOpen?: boolean;
}) {
    const [open, setOpen] = useState(defaultOpen);

    return (
        <div>
            <NavigationItem
                as="button"
                onClick={() => setOpen(v => !v)}
                leading={leading}
                trailing={
                    <span aria-hidden="true">
                        <Image
                            src="/icon/folder_trailing.svg"
                            alt=""
                            width={24}
                            height={24}
                            className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
                        />
                    </span>
                }
            >
                {title}
            </NavigationItem>

            {/* 접히는 패널 */}
            <div
                className={`overflow-hidden transition-all duration-200 ${
                    open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
            >
                <div className="space-y-1 mt-1">{children}</div>
            </div>
        </div>
    );
}

function LetterCircleAvatar({
    text,
    size = 42,
    bgClass = 'bg-gray-200',
    textClass = 'text-[#909090]',
}: {
    text: string;
    size?: number;
    bgClass?: string;
    textClass?: string;
}) {
    const letter = text?.trim()?.[0] ?? '?';

    return (
        <div
            className={`rounded-full ${bgClass} flex items-center justify-center shadow`}
            style={{ width: size, height: size }}
            aria-label={`${text} avatar`}
        >
            <span className={`font-semibold ${textClass}`} style={{ fontSize: size * 0.42 }}>
                {letter}
            </span>
        </div>
    );
}

// components/navigation.tsx (발췌)
type NavItemProps = {
    as?: 'a' | 'button' | 'div';
    href?: string;
    children: React.ReactNode;
    active?: boolean;
    level?: 0 | 1 | 2;
    className?: string;
    onClick?: () => void;
    leading?: React.ReactNode; // ✅ 앞 아이콘 추가
    trailing?: React.ReactNode; // 기존
};

function NavigationItem({
    as: ElementType = 'a',
    href,
    children,
    active = false,
    level = 0,
    className,
    onClick,
    leading,
    trailing,
}: NavItemProps) {
    const RenderElement = ElementType as React.ElementType;
    const navigationIntent = ElementType === 'button' ? 'button' : 'link';

    const widthSafeBaseClass = 'block w-full shrink-0';
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

    return (
        <RenderElement {...commonProps}>
            <span className="flex items-center justify-between w-full">
                {/* 왼쪽: 앞 아이콘 + 텍스트 묶음 */}
                <span className="flex items-center gap-2 min-w-0">
                    {leading ? <span className="shrink-0">{leading}</span> : null}
                    <span className="truncate">{children}</span>
                </span>
                {/* 오른쪽: 화살표 등 트레일링 아이콘 */}
                {trailing ? <span className="ml-2 shrink-0">{trailing}</span> : null}
            </span>
        </RenderElement>
    );
}

export default function Navigation() {
    const [wsOpen, setWsOpen] = useState(false);
    const [inviteOpen, setInviteOpen] = useState(false);

    const handleCreate = (payload: CreateWorkspacePayload) => {
        console.log('Create Workspace:', payload);
        setWsOpen(false);
    };

    const handleInvite = (payload: InvitePayload) => {
        console.log('Invite Workspace:', payload);
        setInviteOpen(false);
    };

    return (
        <>
            <aside className={nav.aside()}>
                {/* 헤더 */}
                <div className={nav.header()}>
                    <LetterCircleAvatar text="프로젝트 명" />
                    <span>프로젝트 명</span>
                    <Image src="/icon/workspace_owner.svg" alt="workspace_owner" width={20} height={21} />
                </div>

                {/* 메뉴 */}
                <nav className={nav.menu()} aria-label="사이드 내비게이션">
                    {/* 알림함 */}
                    <div className={nav.menuContainer()}>
                        <NavigationItem
                            href="/alerts"
                            leading={<Image src="/icon/notification.svg" alt="notification" width={24} height={24} />}
                        >
                            알림함
                        </NavigationItem>
                    </div>

                    {/* UI 프로젝트 */}
                    <div className={nav.menuContainer()}>
                        <CollapsibleSection
                            id="ui-projects"
                            title="UI 프로젝트"
                            leading={<Image src="/icon/folder.svg" alt="folder" width={24} height={24} />}
                            defaultOpen={false}
                        >
                            <NavigationItem level={1}>하위 프로젝트 1</NavigationItem>
                            <NavigationItem level={1} active>
                                하위 프로젝트 2
                            </NavigationItem>
                            <NavigationItem level={1}>하위 프로젝트 3</NavigationItem>
                            <NavigationItem level={1}>하위 프로젝트 4</NavigationItem>
                            <NavigationItem level={1}>하위 프로젝트 5</NavigationItem>
                            <NavigationItem level={1}>하위 프로젝트 6</NavigationItem>
                        </CollapsibleSection>
                    </div>

                    {/* 회원가입 로직 */}
                    <div className={nav.menuContainer()}>
                        <CollapsibleSection
                            id="signup-flow"
                            title="회원가입 로직"
                            leading={<Image src="/icon/folder.svg" alt="folder" width={24} height={24} />}
                        >
                            <NavigationItem level={1}>플로우 A</NavigationItem>
                            <NavigationItem level={1}>플로우 B</NavigationItem>
                        </CollapsibleSection>
                    </div>

                    {/* 상세이미지 개선 */}
                    <div className={nav.menuContainer()}>
                        <CollapsibleSection
                            id="detail-image"
                            title="상세이미지 개선"
                            leading={<Image src="/icon/folder.svg" alt="folder" width={24} height={24} />}
                        >
                            <NavigationItem level={1}>이미지 최적화</NavigationItem>
                            <NavigationItem level={1}>CDN 적용</NavigationItem>
                        </CollapsibleSection>
                    </div>
                    <div className={nav.menuContainer()}>
                        <Image src="/icon/project_add.svg" alt="project_add" width={24} height={24} />
                        <NavigationItem as="button">프로젝트 추가</NavigationItem>
                    </div>
                    <div className={nav.menuContainer()}>
                        <Image src="/icon/waste_backet.svg" alt="waste_backet" width={24} height={24} />
                        <NavigationItem as="button">휴지통</NavigationItem>
                    </div>
                    <div className="my-5">
                        <Image src="/icon/menu_divider.svg" alt="menu_divider" width={192} height={1} />
                    </div>
                    <div className={nav.menuContainer()}>
                        <Image src="/icon/invite_workspace.svg" alt="invite_workspace" width={24} height={24} />
                        <NavigationItem as="button" onClick={() => setInviteOpen(true)}>
                            워크스페이스 초대
                        </NavigationItem>
                    </div>
                    <div className={nav.menuContainer()}>
                        <Image src="/icon/create_workspace.svg" alt="create_workspace" width={24} height={24} />
                        <NavigationItem as="button" onClick={() => setWsOpen(true)}>
                            워크스페이스 생성
                        </NavigationItem>
                    </div>
                    <div className={nav.menuContainer()}>
                        <span className="mt-2 text-[14px] text-gray-400">로그아웃</span>
                    </div>
                </nav>
            </aside>

            {wsOpen && (
                <WorkspaceCreateModal key="ws-create" open onClose={() => setWsOpen(false)} onCreate={handleCreate} />
            )}
            {inviteOpen && (
                <WorkspaceInviteModal
                    key="ws-invite"
                    open
                    onClose={() => setInviteOpen(false)}
                    onInvite={handleInvite}
                />
            )}
        </>
    );
}
