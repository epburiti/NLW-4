import styles from "../styles/components/Profile.module.css";
export function Profile() {
  return (
    <div className={styles.profileContainer}>
      <img src="https://github.com/epburiti.png" alt="Erick Buriti" />
      <div>
        <strong>Erick Buriti</strong>
        <p>
          <img src="icons/level.svg" alt="icone de level" />
          Level 1
        </p>
      </div>
    </div>
  );
}
