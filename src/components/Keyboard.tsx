import { MutableRefObject, useEffect, useRef, useState } from "react";
import styles from "./Keyboard.module.css";
import cs from "classnames";
import { KeyboardTemplateProps, KeyProps, Note, Octave } from "../types";
import { useSoundStore, useUserStore, useVolumeStore } from "../utils/stores";
import { usePlayers } from "../utils/PlayersContext";
import { socket } from "../utils/socketClient";
import { playWithVolume } from "../utils/utils";
// @ts-ignore
import useDraggableScroll from "use-draggable-scroll";
import React from "react";

const Key = (props: KeyProps) => {
  const { note, observer } = { ...props };
  let { octave } = { ...props };
  const currentOctave = useSoundStore((state) => state.currentOctave);
  const ref = useRef<HTMLButtonElement>(null);

  if (!octave) octave = currentOctave;

  const { players } = usePlayers();
  const [roomID, userID] = useUserStore((state) => [
    state.roomID,
    state.userID,
  ]);

  const keyHandler = () => {
    if (players) {
      const clipName = note + octave;
      const player = players.player(clipName);
      const volume = useVolumeStore.getState().userVolumes[userID] ?? -10;
      playWithVolume(player, volume);
      socket.emit("play-sound", clipName, roomID);
    }
  };

  useEffect(() => {
    if (!ref.current || !observer) return;

    observer.observe(ref.current);
  }, [observer]);

  return (
    <button
      ref={ref}
      onTouchStart={keyHandler}
      onMouseDown={keyHandler}
      id={note + octave}
      className={cs(
        props.classes && props.classes,
        "UNSTYLE_BUTTON",
        "neumorphic_mold_raisedUp",
        styles[note],
        styles[octave],
        note.includes("s") && styles.black,
        !note.includes("s") && styles.white,
        styles.key
      )}
    >
      {note == "C" && (
        <span className={styles.key_text}>
          {note}
          {octave}
        </span>
      )}
    </button>
  );
};

const KeyboardTemplate = (props: KeyboardTemplateProps) => {
  const NOTES = [
    "C",
    "Cs",
    "D",
    "Ds",
    "E",
    "F",
    "Fs",
    "G",
    "Gs",
    "A",
    "As",
    "B",
  ] as Note[];

  return (
    <div className={styles.keyboard_template_container}>
      {NOTES.map((note, index) => (
        <Key {...props} key={index} note={note} />
      ))}
    </div>
  );
};

const Keyboard = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { onMouseDown } = useDraggableScroll(containerRef, {
    direction: "horizontal",
  });
  const [childRef, setChildRef] = useState<
    MutableRefObject<HTMLButtonElement | null>
  >(useRef(null));
  const [observer, setObserver] = useState<IntersectionObserver | null>(null);

  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.6,
  };

  const observerCallBack = (
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver
  ) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.setAttribute("data-visible", "");
      } else {
        entry.target.removeAttribute("data-visible");
      }
    });
  };

  useEffect(() => {
    setObserver(new IntersectionObserver(observerCallBack, options));
  }, []);

  // TODO: make a custom scroll bar for the keyboard
  // CHECK: hide elements partially overflowing in the keyboard
  // CHECK: animate keys as they enter and leave viewport of parent
  return (
    <div
      ref={containerRef}
      onMouseDown={onMouseDown}
      className={styles.keyboard_container}
      id="keyboard_viewbox"
    >
      {[...Array(7)].map((v, index) => (
        <KeyboardTemplate
          observer={observer}
          key={index}
          octave={(index + 1) as Octave}
          setChildRef={setChildRef}
        />
      ))}
    </div>
  );
};

export { Keyboard };
