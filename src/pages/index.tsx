import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/home.module.css";

import home from "../../public/assets/home.jpg";

export default function Home() {
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
            <span>+12 tarefas</span>
          </section>
          <section className={styles.info}>
            <span>+10 Comentários</span>
          </section>
        </div>

      </main>
    </div>
  );
}
