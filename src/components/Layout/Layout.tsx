import { Outlet } from "react-router";
import Header from "@/components/Header/Header";
import styles from "./Layout.module.css";

function Layout() {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
