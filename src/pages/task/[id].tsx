import Head from "next/head";
import styles from "./task.module.css";
import { GetServerSideProps } from "next";

import { db } from "@/services/firebaseConnection";

import {
	doc,
	getDoc,
	collection,
	query,
	where,
	addDoc,
	onSnapshot,
} from "firebase/firestore";
import Textarea from "@/components/textarea/Textarea";
import Button from "@/components/button/Button";
import Comment from "@/components/comment/Comment";
import { useSession } from "next-auth/react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

interface taskProps {
	taskDetails: {
		id: string;
		task: string;
		publicTask: boolean;
		user: string;
		createdAt: string;
	};
}

interface commentProps {
	id: string;
	comment: string;
	user: string;
	name: string;
	taskId: string;
	createdAt: Date;
}

const TaskPage = ({ taskDetails }: taskProps) => {
	const { data: session } = useSession();

	const [inputComment, setInputComment] = useState("");
	const [comments, setComments] = useState<commentProps[]>([]);

	useEffect(() => {
		async function getComments() {
			const comments = await collection(db, "comments");
			const q = query(comments, where("taskId", "==", taskDetails.id));

			onSnapshot(q, (snapshot) => {
				let listComments = [] as commentProps[];

				snapshot.forEach((doc) => {
					listComments.push({
						id: doc.id,
						comment: doc.data().comment,
						user: doc.data().user,
						name: doc.data().name,
						taskId: doc.data().taskId,
						createdAt: doc.data().createdAt.toDate(),
					});
				});

				setComments(listComments);
			});
		}

		getComments();
	}, [taskDetails.id]);

	const handleInputComment = (event: ChangeEvent<HTMLTextAreaElement>) => {
		setInputComment(event.target.value);
	};

	const handleComment = async (e: FormEvent) => {
		e.preventDefault();

		if (!session?.user) {
			return;
		}

		try {
			const docRef = await addDoc(collection(db, "comments"), {
				comment: inputComment,
				user: session?.user.email,
				name: session?.user.name,
				taskId: taskDetails.id,
				createdAt: new Date(),
			});

			setInputComment("");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className={styles.container}>
			<Head>
				<title>Detalhes da tarefa</title>
			</Head>
			<main>
				<div className={styles.content}>
					<div className={styles.contentTaskDetails}>
						<h1>Detalhes da tarefa</h1>
						<div className={styles.task}>
							<div className={styles.taskHeader}>
								<p>
									<span>Postado por: </span>
									{taskDetails.user}
								</p>
								<p>{taskDetails.createdAt}</p>
							</div>
							<p className={styles.taskText}>{taskDetails.task}</p>
						</div>
					</div>
				</div>
				<section className={styles.commentArea}>
					<div className={styles.commentContainer}>
						<h2>Deixe seu comentário</h2>
						<form className={styles.formComment} onSubmit={handleComment}>
							<Textarea
								value={inputComment}
								onChange={handleInputComment}
								placeholder="Comente aqui"
								required
							/>
							<Button
								type="submit"
								value="Comentar"
								disabled={!session?.user}
							/>
						</form>
						<div className={styles.comments}>
							<h2>Todos os comentários</h2>
							{comments.map((comment) => (
								<Comment
									key={comment.id}
									id={comment.id}
									comment={comment.comment}
									user={comment.user}
									name={comment.name}
									taskId={comment.taskId}
									createdAt={comment.createdAt.toLocaleString()}
								/>
							))}
						</div>
					</div>
				</section>
			</main>
		</div>
	);
};

export default TaskPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	const id = params?.id as string;

	const docRef = doc(db, "tasks", id);

	const snapshot = await getDoc(docRef);

	if (!snapshot.exists()) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}

	if (!snapshot.data()?.publicTask) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}

	const data = {
		id: snapshot.id,
		task: snapshot.data()?.task,
		publicTask: snapshot.data()?.publicTask,
		user: snapshot.data().user,
		createdAt: snapshot.data().createdAt.toDate().toLocaleString() as string,
	};

	return {
		props: {
			taskDetails: data,
		},
	};
};
