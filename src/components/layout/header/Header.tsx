import Link from "next/link";
import styles from "./header.module.css";
import { useSession, signIn, signOut } from "next-auth/react";

export function Header() {
  const { data: session, status } = useSession();

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.menu}>
          <Link href="/">
            <h1 className={styles.logo}>
              <span>Remember<span className={styles.meLogo}>-me</span></span>
              <span className={styles.overlay}></span>
            </h1>
          </Link>
          {session && (
            <Link href="/dashboard/">
              <p className={styles.link}>Meu painel</p>
            </Link>
          )}
        </div>
        <div>
          {status === "loading" ? (
            <></>
          ) : session ? (
            <button className={styles.loginButton} onClick={() => signOut()}>
              Olá {session?.user?.name}
            </button>
          ) : (
            <button
              className={styles.loginButton}
              onClick={() => signIn("google")}
            >
              Entrar
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}
