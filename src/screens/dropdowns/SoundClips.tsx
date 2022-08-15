import { Toolbar } from "../../components/Toolbar";
import styles from "./DropDown.module.css";
import cs from "classnames";
import { List, SoundClipItem } from "../../components/List";
import { useScreenStore } from "../../utils/stores";
import { nanoid } from "nanoid";

// TODO: overhaul
const SoundClips = ({ soundClips }: { soundClips: string[] }) => {
  const dropdown = useScreenStore((state) => state.selectedDropDown);
  const variant = "soundclips";

  return (
    <div
      className={cs(
        "dropdown_container",
        dropdown == variant && "drop",
        styles.soundclips,
        styles.container
      )}
    >
      <List variant={variant}>
        {soundClips.map((soundClip) => (
          <SoundClipItem key={nanoid()} clipName={soundClip} />
        ))}
      </List>
      <Toolbar variant="dropdown" />
    </div>
  );
};

export default SoundClips;
