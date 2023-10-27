import { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/home.module.css";

import home from "../../public/assets/home.jpg";

import { collection, getDocs } from 'firebase/firestore';
import { db } from "@/services/firebaseConnection";

interface HomeProps {
  posts: number;
  comments: number;
}

export default function Home({ posts, comments}: HomeProps) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Remember-me</title>
      </Head>
      <main className={styles.main}>
        <div className={styles.bannerContent}>
          <Image className={styles.banner} alt="banner" width={500} src={home} priority />
          <h1 className={styles.title}>Remember-me é um sistema para  você <br /> se lembrar das suas tarefas.</h1>
        </div>

        <div className={styles.infoContent}>
          <section className={styles.info}>
            <span>+{posts} Tarefas</span>
          </section>
          <section className={styles.info}>
            <span>+{comments} Comentários</span>
          </section>
        </div>

      </main>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {

  const commentsRef = collection(db, 'comments');
  const postsRef = collection(db, 'tasks');

  const commentSnapshot = await getDocs(commentsRef);
  const postSnapshot = await getDocs(postsRef);

  return {
    props: {
      posts: postSnapshot.size || 0,
      comments: commentSnapshot.size || 0,
    },
    revalidate: 60, // 1 minuto
  };
}
