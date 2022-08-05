import { NextPage } from "next";
import styles from "./playground.module.css";
import cs from "classnames";
import { Keyboard } from "../src/components/Keyboard";
import {
  connectSocket,
  initSocket,
  socket,
  socketCleanup,
} from "../src/utils/socketClient";
import { useEffect, useState } from "react";

const Page: NextPage = () => {
  // const roomID = "22";
  const userID = "wolf";
  const [roomID, setRoomID] = useState("22");
  const [text, setText] = useState("haven't connected");

  useEffect(() => {
    connectSocket(userID, roomID);
    initSocket();
    setText(`${userID} connected to ${roomID}`);

    return socketCleanup;
  }, [roomID]);

  return (
    <div className="page_container">
      <input
        value={roomID}
        type="input"
        onChange={(e) => setRoomID(e.target.value)}
      />
      <p>{text}</p>
      {/* <div className={styles.cards}>
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
      <Keyboard /> */}
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
