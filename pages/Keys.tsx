import type { NextPage } from "next";
import { ChangeEvent, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import { Button } from "../src/components/Button";
import { Toolbar } from "../src/components/Toolbar";

import { Keyboard } from "../src/components/Keyboard";
import styles from "../styles/Keys.module.css";

let socket: Socket;

const Page: NextPage = () => {
  useEffect(() => {
    socketInitializer();
  }, []);

  const [input, setInput] = useState("");

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    socket.emit("input-change", e.target.value);
  };

  const socketInitializer = async () => {
    await fetch("/api/socket");
    socket = io();

    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on("update-input", (msg) => {
      setInput(msg);
    });
  };

  return (
    // <input
    //   placeholder="Type Something"
    //   value={input}
    //   onChange={onChangeHandler}
    // />
    <div className="page_container">
      <div>
        <Toolbar variant="keyboard" />
      </div>
      <div>
        <Keyboard />
      </div>
    </div>
  );
};

export default Page;
