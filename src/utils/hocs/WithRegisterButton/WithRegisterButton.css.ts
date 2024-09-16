import { style } from "@vanilla-extract/css";

import { vars } from "@/styles";

export const styles = {
    root: style({
        display: "flex",
        flexDirection: "column",
        height: "100%",
    }),
    content: style({
        display: "flex",
        height: "100%",
    }),
    button: style({
        position: "sticky",
        bottom: vars.spacing.md,
        left: 0,
    }),
};
