import { NavLink } from "react-router";
import styles from "./Header.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <span className={styles.title}>Template Frontend React</span>
      <nav className={styles.nav}>
        <NavLink to="/" className={({ isActive }) => (isActive ? styles.active : "")} end>
          Home
        </NavLink>
        <NavLink to="/items" className={({ isActive }) => (isActive ? styles.active : "")}>
          Items
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
