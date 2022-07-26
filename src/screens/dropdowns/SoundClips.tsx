import { Toolbar } from "../../components/Toolbar";
import styles from "../../../styles/Layout.module.css";
import cs from "classnames";
import { List, SoundClipItem } from "../../components/List";
import { useScreenStore } from "../../utils/stores";
import { nanoid } from "nanoid";

const SoundClips = ({ soundClips }: { soundClips: string[] }) => {
  const dropdown = useScreenStore((state) => state.selectedDropDown);

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
          <SoundClipItem key={nanoid()} clipName={soundClip} />
        ))}
      </List>
      <Toolbar variant="soundclips" />
    </div>
  );
};

export default SoundClips;
