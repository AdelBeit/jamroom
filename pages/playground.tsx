import { NextPage } from "next";
import styles from "./playground.module.css";
import cs from "classnames";
import { Keyboard } from "../src/components/Keyboard";

const Page: NextPage = () => {
  return (
    <div className="page_container">
      <div className={styles.cards}>
        <button className={styles.card}>1</button>
        <button className={styles.card}>2</button>
        <button className={styles.card}>3</button>
        <button className={styles.card}>4</button>
        <button className={styles.card}>5</button>
        <button className={styles.card}>6</button>
        <button className={styles.card}>7</button>
        <button className={styles.card}>8</button>
        <button className={styles.card}>9</button>
      </div>
      <Keyboard />
    </div>
  );
};

// <div className={cs(styles.container, styles.grid)}>
/* <div className={cs(styles.block, styles.one)}></div>
  <div className={cs(styles.block, styles.two)}></div>
  <div className={cs(styles.block, styles.three)}></div>
  <div className={cs(styles.block, styles.four)}></div>
  <div className={cs(styles.block, styles.a)}></div>
  <div className={cs(styles.block, styles.b)}></div>
  <div className={cs(styles.block, styles.c)}></div>
  <div className={cs(styles.block, styles.d)}></div>
// </div>*/
export default Page;
