import React from "react";
import { Toolbar } from "../../components/Toolbar";
import styles from "../../../styles/Layout.module.css";
import cs from "classnames";
import { List, SoundClipItem, UserItem } from "../../components/List";
import { useStore } from "../../utils/useStore";

function DrumSelector() {
  const dropdown = useStore((state) => state.selectedDropDown);

  return (
    <div
      className={cs(
        "drop_down_container",
        dropdown == "drum_selector" && "drop",
        styles.drum_selector
      )}
    >
      <List variant="drum_selector">
        <SoundClipItem clipName="ShoeStore2321" />
        <SoundClipItem clipName="SprinkleDonut11" />
        <SoundClipItem clipName="SprinkleDonut11" />
        <SoundClipItem clipName="SprinkleDonut11" />
        <SoundClipItem clipName="PhoneBooth028" />
      </List>
      <Toolbar variant="drum_selector" />
    </div>
  );
}

export default DrumSelector;
