import React from "react";
import { Toolbar } from "../../components/Toolbar";
import styles from "../../../styles/Layout.module.css";
import cs from "classnames";
import { List, SoundClipItem } from "../../components/List";
import { useStore } from "../../utils/useStore";
import soundFiles from "../../utils/data/soundFiles";


function DrumSelector() {
  const dropdown = useStore((state) => state.selectedDropDown);
  const selectedDrum = useStore((state) => state.selectedDrumToEdit);
  const variant = "drum_selector";

  return (
    <div
      className={cs(
        "drop_down_container",
        dropdown == variant && "drop",
        styles.drum_selector
      )}
    >
      <List variant={variant}>
       {soundFiles[selectedDrum].map((sound) => (<SoundClipItem clipName={sound} />))}
      </List>
      <Toolbar variant={variant} />
    </div>
  );
}

export default DrumSelector;
