import * as Tone from "tone";
import React from "react";

const Noise = () => {
  function playSynth() {
    const synth = new Tone.MembraneSynth().toDestination();
    synth.triggerAttackRelease("C2", "8n");

    const synthA = new Tone.FMSynth().toDestination();
    const synthB = new Tone.AMSynth().toDestination();

    const loopA = new Tone.Loop((time) => {
      synthA.triggerAttackRelease("C2", "8n", time);
    }, "4n").start(0);

    //  const loopB = new Tone.Loop((time) => {
    //    synthB.triggerAttackRelease("C4", "8n", time);
    //  }, "4n").start("8n");

    Tone.Transport.start();
    console.log(Tone.Transport.bpm.value);
    Tone.Transport.bpm.rampTo(200, 10);
  }

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
        onClick={playSynth}
      >
        click me
      </button>
    </div>
  );
};

export default Noise;

// let loopBeat;
// let bassSynth;

// function setup(){

//    bassSynth = new Tone.MembraneSynth().toDestination();

//    Tone.Transport.bpm.value = 140;

//    loopBeat = new Tone.Loop(song, '4n');
//    Tone.Transport.start();
//    loopBeat.start(0);
// }

// function song(time){
//    bassSynth.triggerAttackRelease('c1', '8n', time);
//    console.log(time)
// }
