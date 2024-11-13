import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import React from "react";

import { placeColorPalette, type Place } from "@/models/place";
import { WorkData } from "@/models/works";
import { WithWordBreak } from "@/utils/hocs/WithWordBreak";
import { BreakWord } from "@/utils/wordBreak";

import { useWorksModal } from "../WorksModal";

import {
    NextButton,
    PrevButton,
    useDotButton,
    usePrevNextButtons,
} from "@/components/ui/WorksCarousel/Button";

import { styles } from "./WorksCarousel.css";

type PropType = {
    place: Place;
    works: WorkData[];
};

const options = { axis: "y", align: "center" } as const satisfies EmblaOptionsType;

export const WorksCarousel: React.FC<PropType> = ({ place, works }) => {
    const [emblaRef, emblaApi] = useEmblaCarousel(options);

    const { selectedIndex } = useDotButton(emblaApi);

    const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } =
        usePrevNextButtons(emblaApi);

    const {
        mutator: { handleOpen },
    } = useWorksModal();

    return (
        <div className={styles.root}>
            <div className={styles.heading} style={{ backgroundColor: placeColorPalette[place] }}>
                <WithWordBreak as="h3" className={styles.headingText} align="center">
                    <BreakWord content={place} />
                </WithWordBreak>
            </div>
            <section className={styles.embla}>
                <div className={styles.arrowButtonContainer}>
                    <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
                </div>
                <div className={styles.emblaViewport} ref={emblaRef}>
                    <div className={styles.emblaContainer}>
                        {works.map((work, index) => {
                            const diff = index - selectedIndex;
                            const clampedDiff = Math.max(Math.min(diff, 2), -2).toString() as
                                | "0"
                                | "1"
                                | "2"
                                | "-2"
                                | "-1";
                            return (
                                <div
                                    className={styles.emblaSlide({
                                        indexDiff: clampedDiff,
                                    })}
                                    key={`${work.title}-${work.place}`}
                                    onClick={() => {
                                        if (clampedDiff === "0") {
                                            handleOpen(work);
                                        }
                                    }}
                                >
                                    <Image
                                        src={work.imagePath}
                                        alt={`works image titled &${work.title}`}
                                        width={150}
                                        height={150}
                                        className={styles.emblaSlideContent}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className={styles.arrowButtonContainer}>
                    <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
                </div>
                <h3>{works[selectedIndex]?.title}</h3>
            </section>
        </div>
    );
};
