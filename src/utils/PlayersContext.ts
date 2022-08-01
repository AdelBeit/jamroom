import React, { useEffect, useRef, MutableRefObject } from "react";
import { useScreenStore } from "./stores";
import { Players } from "tone";
import soundFiles from "./data/soundFiles";
import { NextPage } from "next";
import io, { Socket } from "socket.io-client";
import { useRouter } from "next/router";

// QUESTION: why doesn't this work?
// TODO: extract players context into its own file
export let socket: Socket;
export const usePlayers = () => React.useContext(PlayersContext);
const PlayersContext = React.createContext<Players | null>(null);
const PlayersContextProvider = (props: React.PropsWithChildren<{}>) => {
   const players: MutableRefObject<null | Players> = useRef(null);
   const router = useRouter();
   const { roomID } = router.query;
   const screen = useScreenStore((state) => state.selectedScreen);
   const startButton = useRef(null);

   const handler = () => {
      useScreenStore.getState().setScreen("keys");
   };

   const startAudioContext = () => {
      // @ts-ignore
      startButton.current?.click();
   };

   const loadSamples = () => {
      // TODO: persist loaded samples
      players.current = new Players(soundFiles, () => {
         initializeSocket();
      }).toDestination();
   };

   const initializeSocket = async () => {
      await fetch("/api/socket");
      socket = io();

      socket.emit("create-room", roomID);

      socket.on("connect", () => {
         console.log(socket.id, "connected");
      });

      socket.on("sound-played", (clipName) => {
         console.log("received event", clipName);
         players?.current?.player(clipName).start();
      });
   };

   // TODO: handle opening closing sockets for switching rooms
   useEffect(() => {
      // create room if it doesn't exist
      if (!roomID && router.isReady) {
         router.replace(`/home?roomID=${Date.now()}`);
      }

      if (!roomID) return;

      startAudioContext();
      loadSamples();
   }, [roomID]);

   return (
      <PlayersContext.Provider value= { players.current } >
      { props.children }
   {
      screen == "start" && (
         <button
          style={ { visibility: "hidden" } }
      ref = { startButton }
      onClick = { handler }
         > </button>
      )}
</PlayersContext.Provider>
  );
};

const Page: NextPage = () => {
   const screen = useScreenStore((state) => state.selectedScreen);
   const soundClips = [
      "Egyptian Drum",
      "Tuba",
      "French Horn",
      "Gothic Atmospheric",
      "Space Drum",
   ];

   return (
      <PlayersContextProvider>
      { screen == "keys" && <Keys />}
      {
      screen == "drums" && <Drums />}
         < Users />
         <SoundClips soundClips={ soundClips } />
            < DrumSelector />
            </PlayersContextProvider>
  );
};

export default Page;
