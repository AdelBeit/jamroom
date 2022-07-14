import type { NextPage } from "next";
import { ChangeEvent, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import { Toolbar } from "../src/components/Toolbar";
import styles from "../styles/Layout.module.css";
import cs from "classnames";
import { List, UserItem } from "../src/components/List";

// let socket: Socket;

const Page: NextPage = () => {
  //   useEffect(() => {
  //     socketInitializer();
  //   }, []);

  //   const [input, setInput] = useState("");

  //   const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
  //     setInput(e.target.value);
  //     socket.emit("input-change", e.target.value);
  //   };

  //   const socketInitializer = async () => {
  //     await fetch("/api/socket");
  //     socket = io();

  //     socket.on("connect", () => {
  //       console.log("connected");
  //     });

  //     socket.on("update-input", (msg) => {
  //       setInput(msg);
  //     });
  //   };

  return (
    // <input
    //   placeholder="Type Something"
    //   value={input}
    //   onChange={onChangeHandler}
    // />
    <div className={cs("page_container", styles.users)}>
      <List variant="users">
        <UserItem username="ShoeStore2321" instrument="keyboard" />
        <UserItem username="SprinkleDonut11" instrument="drums" />
        <UserItem username="SprinkleDonut11" instrument="drums" />
        <UserItem username="SprinkleDonut11" instrument="drums" />
        <UserItem username="PhoneBooth028" instrument="keyboard" />
      </List>
      <Toolbar variant="users" />
    </div>
  );
};

export default Page;
