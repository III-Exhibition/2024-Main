import { FC } from "react";

import { RegisterButton } from "@/components/ui/RegisterButton";

import { styles } from "./WithRegisterButton.css";

type Props = {
    children: React.ReactNode;
};

export const WithRegisterButton: FC<Props> = ({ children }) => (
    <div className={styles.root}>
        <div className={styles.content}>{children}</div>
        <RegisterButton className={styles.button} />
    </div>
);
