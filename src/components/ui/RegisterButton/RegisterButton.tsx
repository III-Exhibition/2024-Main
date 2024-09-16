import clsx from "clsx";

import type { FC } from "react";

import { styles } from "./RegisterButton.css";

type Props = React.ComponentProps<"button">;

export const RegisterButton: FC<Props> = (props) => {
    const { className, ...otherProps } = props;
    return (
        <button className={clsx(styles.button, className)} {...otherProps}>
            来場登録
        </button>
    );
};
