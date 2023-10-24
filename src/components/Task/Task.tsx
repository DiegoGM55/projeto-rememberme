import styles from "./task.module.css";
import { FaShare, FaTrash } from "react-icons/fa";

const Task = () => {
	return (
		<div className={styles.task}>
			<div className={styles.taskHeader}>
				<p className={styles.public}>Publica</p>
				<button className={styles.shareButton}>
					<FaShare size={20} />
				</button>
			</div>
			<div className={styles.taskBody}>
				<p>Comprar pão</p>
				<button className={styles.taskButton}>
					<FaTrash size={20} />
				</button>
			</div>
		</div>
	);
};

export default Task;
