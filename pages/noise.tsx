import { Players, start } from "tone";
import React, { MutableRefObject, useEffect, useRef } from "react";

let baseUrl = "./samples/drums/";

const Noise = () => {
  const players: MutableRefObject<null | Players> = useRef(null);

  useEffect(() => {
    players.current = new Players(
      {
        kick: baseUrl + "kicks/acoustic_kick.ogg",
        snare: baseUrl + "snares/acoustic_snare.ogg",
      },
      () => {
        console.log("samples load");
      }
    ).toDestination();
  }, []);

  const drumHandler = (instrument) => {
    players.current?.player(instrument).start();
  };

  return (
    <div
      style={{
        width: "100%",
        height: "400px",

        border: "1px solid black",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      id="wrapper"
    >
      <button
        style={{ height: "20px", width: "100px" }}
        id="button"
        onClick={() => start()}
      >
        start context
      </button>
      <button
        style={{ height: "20px", width: "100px" }}
        id="button"
        onClick={() => drumHandler("snare")}
      >
        snare
      </button>
      <button
        style={{ height: "20px", width: "100px" }}
        id="button"
        onClick={() => drumHandler("kick")}
      >
        kick
      </button>
    </div>
  );
};

export default Noise;
