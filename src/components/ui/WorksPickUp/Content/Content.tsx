import Image from "next/image";
import React, { FC } from "react";

import { WorkData } from "@/models/works";

import { useWorksModal } from "../../WorksModal";

import styles from "./Content.module.css";

type Props = {
    data: WorkData;
    autoPlayHandler: { handlePlay: () => void; handleStop: () => void };
} & React.ComponentProps<"div">;

export const Content: FC<Props> = (props) => {
    const {
        data,
        autoPlayHandler: { handlePlay, handleStop },
        className,
        ...otherProps
    } = props;
    const {
        mutator: { handleOpen },
        d,
    } = useWorksModal({ onClose: handlePlay });
    return (
        <div className="w-full h-full flex flex-col justify-start items-center">
            <div className={`${styles.image} w-full h-full rounded-2xl `}>
                <Image
                    src={data.imagePath}
                    alt={`works image of ${data.title}`}
                    width={1000}
                    height={1000}
                    className="w-full h-full rounded-2xl"
                />
            </div>
        </div>
    );
};
