import styled from 'styled-components';
import React from 'react';

const FlexColumnListWrapper = styled.div`
    margin: 0;
    padding: 0;
    width: 100%;
    position: relative;
    display: grid;
    grid-template-columns: repeat(auto-fill, 250px);
    grid-auto-rows: 10px;
    justify-content: center;
    /* background-color: black; */
    /* display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 0.8rem;
    align-content: flex-start; */
    /* justify-content: center; */
    /* align-items: flex-start; */
    & > div {
        padding: 0;
        margin: 0.5rem 10px;
        border-radius: 16px;
        /* background-color: red; */
    }
    .card_small {
        grid-row-end: span 22;
    }
    .card_med {
        grid-row-end: span 30;
    }
    .card_large {
        grid-row-end: span 43;
    }
`;

const cardSizes = ['card_small', 'card_med', 'card_large'];

export function getSizeByRatio(ratio: number) {
    if (ratio < 1) return cardSizes[2];
    if (ratio < 1.5) return cardSizes[1];
    return cardSizes[0];
}

export default function FlexColumnList<T = any>({
    children,
    className,
    style,
    dataSource,
    component: Component,
}: {
    dataSource?: T[];
    children?: any;
    className?: string;
    style?: React.CSSProperties;
    component: React.ComponentType<{ data: T; key: any }>;
}) {
    return (
        <FlexColumnListWrapper className={className} style={style}>
            {dataSource?.map((data: T, index) => {
                // const random = Math.floor(Math.random() * cardSizes.length);
                return <Component data={data} key={`${(data as any).id}${(data as any).key}${index}`} />;
            })}
            {children}
        </FlexColumnListWrapper>
    );
}
