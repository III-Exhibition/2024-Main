import { style } from "@vanilla-extract/css";

import { vars } from "@/styles";

export const styles = {
    button: style({
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: vars.spacing.lg,
        borderRadius: "3rem",
        backgroundColor: vars.color.primary.dark,
        width: "240px",
    }),
};
