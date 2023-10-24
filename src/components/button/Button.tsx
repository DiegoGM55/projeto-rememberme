import { HTMLProps } from "react";
import styles from "./button.module.css";

const Button = ({ ...props} : HTMLProps<HTMLInputElement> ) => {

    return (
        <input
            className={styles.button}
            {...props}
        />
    );
}

export default Button;