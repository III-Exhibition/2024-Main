import clsx from "clsx";
import Link from "next/link";
import { FC } from "react";

import { placeList } from "@/models/place";
import { workList } from "@/models/works";

import { SectionContainer } from "@/components/shared/Container";
import { WorksCarousel } from "@/components/ui/WorksCarousel";
import { WorksPickUp } from "@/components/ui/WorksPickUp";

import { styles, subContainerStyles } from "./WorksSection.css";

export const WorksSection: FC = () => (
    <SectionContainer id="works" title="WORKS" className={styles.root}>
        <PickUpContainer label="ピックアップ" withBorder className={styles.pickUp}>
            <WorksPickUp slides={workList} />
        </PickUpContainer>
        <SubContainer
            label="全作品"
            className={styles.allWorks}
            sublabel={
                <Link href="/workslist" target="_blank">
                    （作品一覧へ）
                </Link>
            }
        >
            {placeList.map((place) => {
                const works = workList.filter((work) => work.place === place);
                return (
                    <WorksCarousel
                        works={works.filter((work) => work.place === place)}
                        place={place}
                        key={place}
                    />
                );
            })}
        </SubContainer>
    </SectionContainer>
);

type SubContainerProps = {
    label: string;
    children: React.ReactNode;
    withBorder?: boolean;
    sublabel?: React.ReactNode;
    className?: string;
};

export const SubContainer: FC<SubContainerProps> = ({
    label,
    withBorder = false,
    sublabel,
    children,
    className,
}) => (
    <div className={subContainerStyles.root}>
        <h2 className={subContainerStyles.label({ withBorder })}>
            {label}
            {sublabel && <span className={subContainerStyles.sublabel}>{sublabel}</span>}
        </h2>
        <div className={clsx(subContainerStyles.content, className)}>{children}</div>
    </div>
);

export const PickUpContainer: FC<SubContainerProps> = ({
    label,
    withBorder = false,
    sublabel,
    children,
}) => (
    <div className={subContainerStyles.root}>
        <h2 className={subContainerStyles.label({ withBorder })}>
            {label}
            {sublabel && <span className={subContainerStyles.sublabel}>{sublabel}</span>}
        </h2>
        <div>{children}</div>
    </div>
);
