import React from "react";
import { Toolbar } from "../../components/Toolbar";
import styles from "../../../styles/Layout.module.css";
import cs from "classnames";
import { List, SoundClipItem } from "../../components/List";
import { useScreenStore, useSoundStore } from "../../utils/stores";
import soundFiles from "../../utils/data/soundFiles";

function DrumSelector() {
  const dropdown = useScreenStore((state) => state.selectedDropDown);
  const [selectedDrum, selectedSample] = useSoundStore((state) => [
    state.selectedDrumToEdit,
    state.drumSounds[state.selectedDrumToEdit],
  ]);
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
        {soundFiles[selectedDrum].map((sound) => (
          <SoundClipItem
            variant={
              sound[0] == selectedSample ? "drum_selected" : "drum_sample"
            }
            clipName={sound[0]}
          />
        ))}
      </List>
      <Toolbar variant={variant} />
    </div>
  );
}

export default DrumSelector;
