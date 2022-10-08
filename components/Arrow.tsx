import styles from "./Arrow.module.css";

const Arrow = () => (
  <div className={styles["outer-container"]}>
    <div
      className={styles["capture-mouse"]}
      onClick={() => {
        document.getElementById("info-section")?.scrollIntoView({
          behavior: "smooth",
        });
      }}
    />
    <div className={styles.container}>
      <div className={styles.arrow} />
      <div className={`${styles.arrow} ${styles.small}`} />
    </div>
  </div>
);

export default Arrow;
