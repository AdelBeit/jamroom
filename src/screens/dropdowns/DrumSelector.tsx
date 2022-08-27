import React from "react";
import { Toolbar } from "../../components/Toolbar";
import styles from "./DropDown.module.css";
import cs from "classnames";
import { List, SoundClipItem } from "../../components/List";
import { useScreenStore, useSoundStore } from "../../utils/stores";
import { nanoid } from "nanoid";
import { usePlayers } from "../../utils/PlayersContext";

const DrumSelector = () => {
  const dropdown = useScreenStore((state) => state.selectedDropDown);
  const [selectedDrum, selectedSample] = useSoundStore((state) => [
    state.selectedDrumToEdit,
    state.drumSounds[state.selectedDrumToEdit],
  ]);
  const variant = "drum_selector";
  const { samples } = usePlayers();

  const sampleFiles = {
    tom: samples.toms,
    kick: samples.kicks,
    snare: samples.snares,
    hi_hat: samples.hi_hats,
    closed_hat: samples.closed_hats,
  };

  return (
    <div
      className={cs(
        "dropdown_container",
        dropdown == variant && "drop",
        styles.drum_selector,
        styles.container
      )}
    >
      <List variant={variant}>
        {Object.keys(samples).length > 0 &&
          Object.keys(sampleFiles[selectedDrum]).map((name) => (
            <SoundClipItem
              key={nanoid()}
              variant={name == selectedSample ? "drum_selected" : "drum_sample"}
              clipName={name}
            />
          ))}
      </List>
      <Toolbar variant="dropdown" />
    </div>
  );
};

export default DrumSelector;
