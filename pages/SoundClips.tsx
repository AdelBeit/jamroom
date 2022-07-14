import type { NextPage } from "next";
import { ChangeEvent, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import { Toolbar } from "../src/components/Toolbar";
import styles from "../styles/Layout.module.css";
import cs from "classnames";
import { List, SoundClipItem } from "../src/components/List";

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
    <div className={cs("page_container", styles.soundclips)}>
      <List variant="soundclips">
        <SoundClipItem clipName="Egyptian Drum" button="stop" />
        <SoundClipItem clipName="Tuba" button="play" />
        <SoundClipItem clipName="French Horn" button="play" />
        <SoundClipItem clipName="Gothic Atmospheric" button="play" />
        <SoundClipItem clipName="Space Drum" button="play" />
      </List>
      <Toolbar variant="soundclips" />
    </div>
  );
};

export default Page;
