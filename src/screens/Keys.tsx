import type { NextPage } from "next";
import { ChangeEvent, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import { Toolbar } from "../components/Toolbar";
import { Keyboard } from "../components/Keyboard";
import styles from "../../styles/Layout.module.css";
import cs from "classnames";

// let socket: Socket;

// how do i type a handler function
const Keys = () => {
  // useEffect(() => {
  //   socketInitializer();
  // }, []);

  // const [input, setInput] = useState("");

  // const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
  //   setInput(e.target.value);
  //   socket.emit("input-change", e.target.value);
  // };

  // const socketInitializer = async () => {
  //   await fetch("/api/socket");
  //   socket = io();

  //   socket.on("connect", () => {
  //     console.log("connected");
  //   });

  //   socket.on("update-input", (msg) => {
  //     setInput(msg);
  //   });
  // };

  return (
    // <input
    //   placeholder="Type Something"
    //   value={input}
    //   onChange={onChangeHandler}
    // />
    <div className={cs("page_container", styles.keys)}>
      <Toolbar variant="keys" />
      <Keyboard />
    </div>
  );
};

export default Keys;
