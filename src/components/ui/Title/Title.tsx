// src/components/ui/TitleTest/TitleTest.tsx

import React, { useRef } from "react";

import { useTitle } from "./useTitle";

import { styles } from "./Title.css";

export const Title: React.FC = () => {
    const magicRef = useRef<HTMLDivElement>(null);
    useTitle(magicRef);

    return (
        <>
            <div style={styles.magic} ref={magicRef}></div>
        </>
    );
};
