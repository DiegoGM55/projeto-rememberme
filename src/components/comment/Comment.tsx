import { FaTrash } from "react-icons/fa";
import styles from "./comment.module.css";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/services/firebaseConnection";
import { useSession } from "next-auth/react";

interface CommentProps {
	id: string;
	comment: string;
	user: string;
	name: string;
	taskId: string;
	createdAt: string;
}

const Comment = ({ ...props }: CommentProps) => {
	const { data: session } = useSession();

	async function handleDelete() {
		const docRef = doc(db, "comments", props.id);
		await deleteDoc(docRef);
	}

	return (
		<div className={styles.comment}>
			<div className={styles.commentHeader}>
				<div className={styles.commentName}>
					<p className={styles.commentAuthor}>{props.name}</p>
					{session?.user?.email === props.user && (
						<button
							className={styles.commentDeleteButton}
							onClick={() => handleDelete()}
						>
							<FaTrash size={15} />
						</button>
					)}
				</div>
				<p>{props.createdAt}</p>
			</div>
			<p className={styles.commentText}>{props.comment}</p>
		</div>
	);
};

export default Comment;
