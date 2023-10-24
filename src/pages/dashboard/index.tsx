import { GetServerSideProps } from "next";
import styles from "./dashboard.module.css";
import Head from "next/head";

import { getSession } from "next-auth/react";
import Textarea from "@/components/textarea/Textarea";
import Button from "@/components/button/Button";
import Task from "@/components/Task/Task";

export default function Dashboard() {
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
						<form>
							<Textarea placeholder="Digite sua tarefa aqui..." />
							<br />
							<div className={styles.checkboxArea}>
								<input
									className={styles.checkbox}
									type="checkbox"
									name="publica"
									id="public"
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
						<Task />
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
		props: {},
	};
};
