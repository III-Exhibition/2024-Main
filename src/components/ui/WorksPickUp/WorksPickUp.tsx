import { EmblaOptionsType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { IoLocationSharp } from "react-icons/io5";

import { WorkData } from "@/models/works";

type PropType = {
    slides: WorkData[];
};

const options = { align: "start", loop: true } as const satisfies EmblaOptionsType;

export const WorksPickUp: React.FC<PropType> = ({ slides }) => {
    const [emblaRef, emblaApi] = useEmblaCarousel(options, [
        Fade(),
        Autoplay({ playOnInit: true, delay: 1000 }),
    ]);
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setCurrentIndex(emblaApi.selectedScrollSnap()); // Get the current index
    }, [emblaApi]);
    const [_, setIsPlaying] = useState(false);

    const handlePlay = useCallback(() => {
        const autoplay = emblaApi?.plugins()?.autoplay;
        if (!autoplay) return; // モーダルが開いている場合はAutoPlayを再開しない
        console.log("play");
        autoplay.play();
    }, [emblaApi]);

    const handleStop = useCallback(() => {
        const autoplay = emblaApi?.plugins()?.autoplay;
        if (!autoplay) return;
        autoplay.stop();
    }, [emblaApi]);

    useEffect(() => {
        if (emblaApi) {
            emblaApi.on("select", onSelect);
            onSelect();
        }
        const autoplay = emblaApi?.plugins()?.autoplay;
        if (!autoplay) return;
        setIsPlaying(autoplay.isPlaying());
        emblaApi
            .on("autoplay:play", () => setIsPlaying(true))
            .on("autoplay:stop", () => setIsPlaying(false))
            .on("reInit", () => setIsPlaying(autoplay.isPlaying()));
    }, [emblaApi, onSelect]);

    return (
        <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
                {slides.map((slide) => (
                    <div
                        className="flex-[0_0_100%] min-w-0 bg-[#D9D9D9] rounded-3xl"
                        key={`${slide.title}-${slide.place}`}
                    >
                        <div className="relative w-full h-auto rounded-full">
                            <Image
                                src={slide.imagePath}
                                alt={`works image of ${slide.title}`}
                                width={1000}
                                height={1000}
                                className="w-full h-auto rounded-3xl block"
                            />
                            <Image
                                src="/works/random_texture.png"
                                alt="random texture"
                                width={1000}
                                height={1000}
                                className="absolute top-0 left-0 w-full h-full rounded-3xl block"
                            />
                        </div>
                        <div className="pl-6 pt-4">
                            <div className="font-works-title italic text-4xl text-[#5e5e5e] border-0 border-b-[1px] border-solid border-[#5e5e5e] pb-2 w-fit">
                                {slide.title}
                            </div>
                            <p className="pt-2 font-gothic text-base text-[#5e5e5e] max-w-[70%] break-keep min-h-14">
                                {slide.member.map((member, index) => (
                                    <React.Fragment key={member}>
                                        {index > 0 && (
                                            <>
                                                {" "}
                                                /<wbr />{" "}
                                            </>
                                        )}
                                        {member}
                                    </React.Fragment>
                                ))}
                            </p>
                            <p className="pt-4 ">
                                <IoLocationSharp />
                                <span className="pl-2 font-gothic text-sm text-[#5e5e5e]">
                                    {slide.place}
                                </span>
                            </p>
                            <div className="flex justify-end pb-4 pr-4">
                                <div
                                    className="text-base  font-serif text-center 
                                    w-28

                                bg-white
                                
                                
                                rounded-full"
                                >
                                    詳細を見る
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
