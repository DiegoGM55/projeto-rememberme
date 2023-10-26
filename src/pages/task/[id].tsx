import Head from "next/head";
import styles from "./task.module.css";
import { GetServerSideProps } from "next";

import { db } from "@/services/firebaseConnection";

import { doc, getDoc, collection, query, where } from "firebase/firestore";
import Textarea from "@/components/textarea/Textarea";
import Button from "@/components/button/Button";
import { getSession } from "next-auth/react";

interface taskProps {
	taskDetails: {
		id: string;
		task: string;
		publicTask: boolean;
		user: string;
		createdAt: string;
	};
}

const TaskPage = ({ taskDetails }: taskProps) => {

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
						<form className={styles.formComment}>
							<Textarea placeholder="Comente aqui" />
							<Button value="Comentar" />
						</form>
                        <div className={styles.comments}>
                            <h2>Todos os comentários</h2>
                            <div className={styles.comment}>
                                <div className={styles.commentHeader}>
                                    <p className={styles.commentAuthor}>Usuário</p>
                                    <p>00/00/0000</p>
                                </div>
                                <p className={styles.commentText}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, voluptatem.</p>
                            </div>
                        </div>
					</div>
				</section>
			</main>
		</div>
	);
};

export default TaskPage;

export const getServerSideProps: GetServerSideProps = async ({ params, req }) => {
    const session = await getSession({ req });
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
