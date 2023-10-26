import Link from "next/link";
import styles from "./task.module.css";
import { FaShare, FaTrash } from "react-icons/fa";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/services/firebaseConnection";

interface TaskProps {
	id: string;
	task: string;
	publicTask: boolean;
	user: string;
	createdAt: Date;
}

const Task = ({ ...props }: TaskProps) => {

	async function handleShare() {
		try {
			await navigator.clipboard.writeText(process.env.NEXT_PUBLIC_URL + "/task/" + props.id);
		} catch (error) {
			console.log(error);
		}
	}

	async function handleDelete() {
		const docRef = doc(db, "tasks", props.id);
		await deleteDoc(docRef);
	}

	return (
		<div className={styles.task}>
			{props.publicTask && (
				<div className={styles.taskHeader}>
					<p className={styles.public}>Publica</p>
					<button className={styles.shareButton} onClick={() => handleShare()} >
						<FaShare size={20} />
					</button>
				</div>
			)}
			<div className={styles.taskBody}>

				{props.publicTask ? (
					<Link href={`/task/${props.id}`}>
					<p>{props.task}</p>
					</Link>
				) : (
					<p>{props.task}</p>
				)}
				
				<button className={styles.taskButton} onClick={() => handleDelete()}>
					<FaTrash size={20} />
				</button>
			</div>
		</div>
	);
};

export default Task;
