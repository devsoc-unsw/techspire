import styles from "./Arrow.module.css";

interface Props {
  onClick: () => void;
}
const Arrow = ({ onClick }: Props) => (
  <div className={styles["outer-container"]}>
    <div className={styles["capture-mouse"]} onClick={onClick} />
    <div className={styles.container}>
      <div className={styles.arrow} />
      <div className={`${styles.arrow} ${styles.small}`} />
    </div>
  </div>
);

export default Arrow;
