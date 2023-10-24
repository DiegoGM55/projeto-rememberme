import { HTMLProps } from "react";
import styles from "./textarea.module.css";

const Textarea = ({...rest}: HTMLProps<HTMLTextAreaElement>) => {
	return (
		<textarea
			className={styles.textTask}
            {...rest}
		></textarea>
	);
};

export default Textarea;
