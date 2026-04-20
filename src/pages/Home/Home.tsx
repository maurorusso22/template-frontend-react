import styles from "./Home.module.css";

function Home() {
  return (
    <div className={styles.home}>
      <h1>Welcome</h1>
      <p>
        This is a React frontend template with TypeScript, Vite, and React Router. It includes a
        CI/CD pipeline, Docker setup, and pre-commit hooks — ready to use out of the box.
      </p>
    </div>
  );
}

export default Home;
