import type { NextPage } from "next";
import { ChangeEvent, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import { Toolbar } from "../../components/Toolbar";
import styles from "../../../styles/Layout.module.css";
import cs from "classnames";
import { List, SoundClipItem } from "../../components/List";
import { useStore } from "../../utils/useStore";

const SoundClips = ({ soundClips }: { soundClips: string[] }) => {
  const dropdown = useStore((state) => state.selectedDropDown);

  return (
    <div
      className={cs(
        "drop_down_container",
        dropdown == "soundclips" && "drop",
        styles.soundclips
      )}
    >
      <List variant="soundclips">
        {soundClips.map((soundClip) => (
          <SoundClipItem clipName={soundClip} button="play" />
        ))}
      </List>
      <Toolbar variant="soundclips" />
    </div>
  );
};

export default SoundClips;
