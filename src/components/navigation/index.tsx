'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { nav } from './style';
import WorkspaceCreateModal, {
    CreateWorkspacePayload,
} from '@/app/(main)/workspace/_container/page/workspace-create-popup';
import WorkspaceInviteModal, { InvitePayload } from '@/app/(main)/workspace/_container/page/workspace-invite-popup';

/* -------------------------------------------------------------------------- */
/*                                  Helpers                                   */
/* -------------------------------------------------------------------------- */
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
    const panelId = `${id}-panel`;

    const ariaExpanded = open ? true : undefined;
    const ariaControls = open ? panelId : undefined;

    return (
        <div id={id}>
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
                aria-expanded={ariaExpanded}
                aria-controls={ariaControls}
            >
                {title}
            </NavigationItem>

            {/* 접히는 패널 */}
            <div
                id={panelId}
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

/* -------------------------------------------------------------------------- */
/*                              Navigation Item                               */
/* -------------------------------------------------------------------------- */
type NavItemProps = {
    as?: 'link' | 'button' | 'div';
    href?: string; // 있으면 무조건 Link
    children: React.ReactNode;
    active?: boolean;
    level?: 0 | 1 | 2;
    className?: string;
    onClick?: React.MouseEventHandler;
    leading?: React.ReactNode;
    trailing?: React.ReactNode;
    // a11y 확장 가능(예: CollapsibleSection에서 사용)
    ['aria-expanded']?: boolean;
    ['aria-controls']?: string;
};

function ItemInner({ children, leading, trailing }: Pick<NavItemProps, 'children' | 'leading' | 'trailing'>) {
    return (
        <span className="flex items-center justify-between w-full">
            <span className="flex items-center gap-2 min-w-0">
                {leading ? <span className="shrink-0">{leading}</span> : null}
                <span className="truncate">{children}</span>
            </span>
            {trailing ? <span className="ml-2 shrink-0">{trailing}</span> : null}
        </span>
    );
}

function NavigationItem({
    as = 'link',
    href,
    children,
    active = false,
    level = 0,
    className,
    onClick,
    leading,
    trailing,
    ...restA11y
}: NavItemProps) {
    // href가 있으면 무조건 링크로 렌더 (SSR/CSR 동일 보장)
    const intent = href ? 'link' : as === 'button' ? 'button' : as === 'div' ? 'div' : 'link';
    if (process.env.NODE_ENV !== 'production') {
        if (href && as === 'button') {
            throw new Error('NavigationItem: `href`가 있으면 `as="button"`을 사용하지 마세요. 링크로 렌더됩니다.');
        }
    }

    const widthSafeBaseClass = 'block w-full shrink-0';
    const mergedClassName = [widthSafeBaseClass, className].filter(Boolean).join(' ');

    const computedClassName = nav.item({
        active,
        level,
        intent: intent === 'button' ? 'button' : 'link',
        className: mergedClassName,
    });

    const a11y: {
        'aria-expanded'?: boolean;
        'aria-controls'?: string;
    } = {};
    if (restA11y['aria-expanded'] === true) a11y['aria-expanded'] = true;
    if (typeof restA11y['aria-controls'] === 'string' && restA11y['aria-controls'])
        a11y['aria-controls'] = restA11y['aria-controls'];

    // 링크
    if (href) {
        return (
            <Link
                href={href}
                className={computedClassName}
                aria-current={active ? 'page' : undefined}
                onClick={onClick}
                prefetch={false}
                {...a11y}
            >
                <ItemInner leading={leading} trailing={trailing}>
                    {children}
                </ItemInner>
            </Link>
        );
    }

    // 버튼
    if (intent === 'button') {
        return (
            <button type="button" className={computedClassName} onClick={onClick} {...a11y}>
                <ItemInner leading={leading} trailing={trailing}>
                    {children}
                </ItemInner>
            </button>
        );
    }

    // 일반 div
    return (
        <div className={computedClassName} {...restA11y}>
            <ItemInner leading={leading} trailing={trailing}>
                {children}
            </ItemInner>
        </div>
    );
}

/* -------------------------------------------------------------------------- */
/*                                  Sidebar                                   */
/* -------------------------------------------------------------------------- */
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
                            href="/notification"
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
                            <NavigationItem href="/workspace" level={1}>
                                하위 프로젝트 1
                            </NavigationItem>
                            <NavigationItem href="/workspace" level={1} active>
                                하위 프로젝트 2
                            </NavigationItem>
                            <NavigationItem href="/workspace" level={1}>
                                하위 프로젝트 3
                            </NavigationItem>
                            <NavigationItem href="/workspace" level={1}>
                                하위 프로젝트 4
                            </NavigationItem>
                            <NavigationItem href="/workspace" level={1}>
                                하위 프로젝트 5
                            </NavigationItem>
                            <NavigationItem href="/workspace" level={1}>
                                하위 프로젝트 6
                            </NavigationItem>
                        </CollapsibleSection>
                    </div>

                    {/* 회원가입 로직 */}
                    <div className={nav.menuContainer()}>
                        <CollapsibleSection
                            id="signup-flow"
                            title="회원가입 로직"
                            leading={<Image src="/icon/folder.svg" alt="folder" width={24} height={24} />}
                        >
                            <NavigationItem href="/workspace" level={1}>
                                플로우 A
                            </NavigationItem>
                            <NavigationItem href="/workspace" level={1}>
                                플로우 B
                            </NavigationItem>
                        </CollapsibleSection>
                    </div>

                    {/* 상세이미지 개선 */}
                    <div className={nav.menuContainer()}>
                        <CollapsibleSection
                            id="detail-image"
                            title="상세이미지 개선"
                            leading={<Image src="/icon/folder.svg" alt="folder" width={24} height={24} />}
                        >
                            <NavigationItem href="/workspace" level={1}>
                                이미지 최적화
                            </NavigationItem>
                            <NavigationItem href="/workspace" level={1}>
                                CDN 적용
                            </NavigationItem>
                        </CollapsibleSection>
                    </div>

                    <div className={nav.menuContainer()}>
                        <NavigationItem
                            as="button"
                            leading={<Image src="/icon/project_add.svg" alt="project_add" width={24} height={24} />}
                        >
                            프로젝트 추가
                        </NavigationItem>
                    </div>

                    <div className={nav.menuContainer()}>
                        <NavigationItem
                            href="/collection"
                            leading={<Image src="/icon/waste_backet.svg" alt="waste_backet" width={24} height={24} />}
                        >
                            휴지통
                        </NavigationItem>
                    </div>

                    <div className="my-5">
                        <Image src="/icon/menu_divider.svg" alt="menu_divider" width={192} height={1} />
                    </div>

                    <div className={nav.menuContainer()}>
                        <NavigationItem
                            as="button"
                            onClick={() => setInviteOpen(true)}
                            leading={
                                <Image src="/icon/invite_workspace.svg" alt="invite_workspace" width={24} height={24} />
                            }
                        >
                            워크스페이스 초대
                        </NavigationItem>
                    </div>

                    <div className={nav.menuContainer()}>
                        <NavigationItem
                            as="button"
                            onClick={() => setWsOpen(true)}
                            leading={
                                <Image src="/icon/create_workspace.svg" alt="create_workspace" width={24} height={24} />
                            }
                        >
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
