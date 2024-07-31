import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./Layout.module.css";

const Layout = ({ children, title }) => {
  const router = useRouter();

  return (
    <div className="page">
      <header className={styles.header}>
        <p>RagLab</p>
        <p style={{ fontWeight: 500, textAlign: "center" }}>{title}</p>
        <div className="user-container"></div>
      </header>
      <nav className={styles.nav}>
        <Link href="/rag">
          <a className={router.asPath === "/rag" ? styles.active : ""}>
            Rag
          </a>
        </Link>
        <Link href="/integrations">
          <a className={router.asPath === "/integrations" ? styles.active : ""}>
            Integrations
          </a>
        </Link>
      </nav>
      {children}
    </div>
  );
};

export default Layout;
