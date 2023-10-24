import { GetServerSideProps } from "next";
import styles from "./dashboard.module.css";
import Head from "next/head";

import { getSession } from "next-auth/react";
import Textarea from "@/components/textarea/Textarea";
import Button from "@/components/button/Button";
import Task from "@/components/Task/Task";
import { useState, useEffect, use } from "react";

import { db } from "@/services/firebasConnection";

import {
	addDoc,
	collection,
	query,
	orderBy,
	where,
	onSnapshot,
} from "firebase/firestore";

interface DashboardProps {
	user: {
		email: string;
	};
}

interface TaskProps {
	id: string;
	task: string;
	publicTask: boolean;
	user: string;
	createdAt: Date;
}

export default function Dashboard({ user }: DashboardProps) {
	const [input, setInput] = useState("");
	const [publicTask, setPublicTask] = useState(false);
	const [tasks, setTasks] = useState<TaskProps[]>([]);

	useEffect(() => {
		async function getTasks() {
			const tasks = await collection(db, "tasks");
			const q = query(
				tasks,
				orderBy("createdAt", "desc"),
				where("user", "==", user.email)
			);

			onSnapshot(q, (snapshot) => {
				let listTasks = [] as TaskProps[];

				snapshot.forEach((doc) => {
					listTasks.push({
						id: doc.id,
						task: doc.data().task,
						publicTask: doc.data().publicTask,
						user: doc.data().user,
						createdAt: doc.data().createdAt.toDate(),
					});
				});

				setTasks(listTasks);
			});
		}
		getTasks();
	}, [user?.email]);

	function handleInput(e: React.ChangeEvent<HTMLTextAreaElement>) {
		setInput(e.target.value);
	}

	async function handleRegisterTask(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		try {
			await addDoc(collection(db, "tasks"), {
				task: input,
				publicTask: publicTask,
				user: user.email,
				createdAt: new Date(),
			});

			setInput("");
			setPublicTask(false);
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<div className={styles.container}>
			<Head>
				<title>Remember-me | Meu painel</title>
			</Head>
			<main>
				<div className={styles.content}>
					<section className={styles.contentForm}>
						<h1>Olá, seja bem vindo!</h1>
						<p>Esse é o seu painel, aqui você pode gerenciar suas tarefas.</p>
						<form onSubmit={handleRegisterTask}>
							<Textarea
								value={input}
								onChange={handleInput}
								placeholder="Digite sua tarefa aqui..."
								required
							/>
							<br />
							<div className={styles.checkboxArea}>
								<input
									className={styles.checkbox}
									type="checkbox"
									name="publica"
									id="public"
									checked={publicTask}
									onChange={() => setPublicTask(!publicTask)}
								/>
								<label className={styles.label} htmlFor="public">
									Tornar tarefa pública
								</label>
							</div>
							<Button type="submit" value="Adicionar tarefa" />
						</form>
					</section>
				</div>
				<section className={styles.taskArea}>
					<div className={styles.taskAreaContainer}>
						<h2>Minhas tarefas</h2>
						{tasks.map((task) => (
							<Task
								key={task.id}
								task={task.task}
								publicTask={task.publicTask}
								user={task.user}
								createdAt={task.createdAt}
							/>
						))}
					</div>
				</section>
			</main>
		</div>
	);
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	const session = await getSession({ req });

	if (!session) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}

	return {
		props: {
			user: {
				email: session?.user?.email,
			},
		},
	};
};
