import React from 'react';
import AppLayoutSideBar from './AppLayoutSideBar';
import AppLayoutContent from './AppLayoutContent';
import AppLayoutExtra from './AppLayoutExtra';

export default function PageLayout({ children }: { children: React.ReactElement }) {
    return (
        <div>
            <AppLayoutSideBar />
            <AppLayoutContent>{children}</AppLayoutContent>
            <AppLayoutExtra />
        </div>
    );
}
