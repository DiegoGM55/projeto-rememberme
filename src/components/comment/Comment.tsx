import styles from "./comment.module.css";

interface CommentProps {
    id: string;
    comment: string;
    user: string;
    name: string;
    taskId: string;
    createdAt: string;
}

const Comment = ({...props}:CommentProps) => {
	return (
		<div className={styles.comment}>
			<div className={styles.commentHeader}>
				<p className={styles.commentAuthor}>{props.name}</p>
				<p>{props.createdAt}</p>
			</div>
			<p className={styles.commentText}>
				{props.comment}
			</p>
		</div>
	);
};

export default Comment;
