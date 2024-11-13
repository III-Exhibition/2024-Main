import { createVar, style } from "@vanilla-extract/css";

import { mediaUtils, vars } from "@/styles";

const slideHeight = createVar();
const slideSpacing = createVar();
const slideSize = createVar();

export const styles = {
    embla: style({
        height: "100%",
        maxHeight: "600px",
        width: "100%",
        vars: {
            [slideHeight]: "100%",
            [slideSpacing]: "1rem",
            [slideSize]: "100%",
        },
        "@media": {
            [mediaUtils.md]: {
                width: "fit-content",
            },
        },
    }),
    emblaViewport: style({
        height: "100%",
        width: "100%",
        "@media": {
            [mediaUtils.md]: {
                width: "400px",
            },
        },
    }),
    emblaContainer: style({
        height: "100%",
        display: "flex",
        touchAction: "pan-y pinch-zoom",
        marginLeft: `calc(${slideSpacing} * -1)`,
    }),
    emblaSlide: style({
        height: "100%",
        transform: "translate3d(0, 0, 0)",
        flex: `0 0 ${slideSize}`,
        minWidth: 0,
        // paddingLeft: `${slideSpacing}`,
    }),
    emblaSlideContent: style({
        display: "block",
        width: "100%",
        height: slideHeight,
    }),
    arrowButtonContainer: style({
        textAlign: "center",
    }),
    emblaControls: style({
        display: "grid",
        gridTemplateColumns: "auto 1fr",
        justifyContent: "space-between",
        gap: "1.2rem",
        marginTop: "1.8rem",
    }),
    emblaButtons: style({
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "0.6rem",
        alignItems: "center",
    }),
    emblaButton: style({
        WebkitTapHighlightColor: "rgba(orange, 0.5)",
        WebkitAppearance: "none",
        appearance: "none",
        backgroundColor: "transparent",
        touchAction: "manipulation",
        display: "inline-flex",
        textDecoration: "none",
        cursor: "pointer",
        border: 0,
        padding: 0,
        margin: 0,
        width: "3.6rem",
        height: "3.6rem",
        zIndex: 1,
        borderRadius: "50%",
        color: vars.color.text,
        alignItems: "center",
        justifyContent: "center",
        ":disabled": {
            color: "gray",
        },
    }),
    emblaButtonSvg: style({
        width: "35%",
        height: "35%",
    }),
    emblaPlay: style({
        WebkitTapHighlightColor: "rgba(orange, 0.5)",
        WebkitAppearance: "none",
        appearance: "none",
        backgroundColor: "transparent",
        touchAction: "manipulation",
        display: "inline-flex",
        textDecoration: "none",
        cursor: "pointer",
        border: 0,
        padding: 0,
        margin: 0,
        boxShadow: "inset 0 0 0 0.2rem black",
        borderRadius: "1.8rem",
        alignItems: "center",
        justifyContent: "center",
        justifySelf: "flex-end",
        color: vars.color.text,
        fontWeight: 700,
        fontSize: "1.4rem",
        minWidth: "8.4rem",
    }),
};
