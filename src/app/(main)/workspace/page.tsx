'use client';

import { useEffect } from 'react';
import WorkspaceContainer from './_container';
import { fetchWorkspaceList } from './_container/data/data';

export default function WorkspacePage() {
    useEffect(() => {
        getWorkspaceList();
    }, []);

    const getWorkspaceList = async () => {
        const workspaceList = await fetchWorkspaceList();
        console.log('workspaceList : ', workspaceList);
    };

    return <WorkspaceContainer />;
}
