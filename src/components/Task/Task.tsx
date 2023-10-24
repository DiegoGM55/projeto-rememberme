import styles from "./task.module.css";
import { FaShare, FaTrash } from "react-icons/fa";

interface TaskProps {
	task: string;
	publicTask: boolean;
	user: string;
	createdAt: Date;
}

const Task = ({ ...props }: TaskProps) => {
	return (
		<div className={styles.task}>
			{props.publicTask && (
				<div className={styles.taskHeader}>
					<p className={styles.public}>Publica</p>
					<button className={styles.shareButton}>
						<FaShare size={20} />
					</button>
				</div>
			)}
			<div className={styles.taskBody}>
				<p>{props.task}</p>
				<button className={styles.taskButton}>
					<FaTrash size={20} />
				</button>
			</div>
		</div>
	);
};

export default Task;
