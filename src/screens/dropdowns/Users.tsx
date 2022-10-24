import { Toolbar } from "../../components/Toolbar";
import dropDownStyles from "./DropDown.module.css";
import styles from "./Users.module.css";
import listStyles from "./../../components/List.module.css";
import buttonStyles from "./../../components/Button.module.css";
import cs from "classnames";
import { List, ListItem } from "../../components/List";
import {
  useScreenStore,
  useUserStore,
  useVolumeStore,
} from "../../utils/stores";
import { nanoid } from "nanoid";
import { User } from "../../types";
import icons from "../../utils/data/icons";
import LoadImage, { placeholder } from "../../utils/LoadImage";
import { useEffect, useState } from "react";
import VolumeSlider from "../../components/VolumeSlider";

// (maybe) TODO: leave button socket, kick players
// TODO: join a random room
const UserItem = ({
  userID,
  instrument,
}: {
  userID: User["id"];
  instrument: User["instrument"];
}) => {
  const primaryUser = useUserStore((state) => state.userID) == userID;
  const [changeVolume, userVolumes] = useVolumeStore((state) => [
    state.changeVolume,
    state.userVolumes,
  ]);
  const setVolume = (e) => {
    let volume = e.target.valueAsNumber;
    if (volume == -25) volume = -100;
    changeVolume(userID, volume);
  };
  const value = userVolumes[userID];

  return (
    <ListItem classes={cs(primaryUser ? listStyles.primary : "", styles.user)}>
      <>
        <LoadImage
          placeholder={placeholder}
          className={cs(listStyles.icon, styles.instrument_icon)}
          src={icons[instrument]}
        />
        <span className={cs(styles.id, primaryUser && listStyles.primary)}>
          {userID}
        </span>
        <VolumeSlider
          onChange={setVolume}
          value={value}
          id="volume"
          name="volume"
          min={-25}
          max={-10}
          step="0.1"
          classes={styles.slider}
        />
      </>
    </ListItem>
  );
};

const AddUserItem = () => {
  const handler = () => {
    const url = window.location.href;
    if (!navigator.share) {
      //fallback
      navigator.clipboard
        .writeText(url)
        .then(() => alert("Copied to clipboard"))
        .catch(console.error);
      return;
    }

    navigator
      .share({
        title: document.title,
        url: url,
      })
      .then(() => {
        console.log("Thanks for sharing!");
      })
      .catch(console.error);
  };
  return (
    <ListItem classes={cs(styles.add_user)} handler={handler}>
      <LoadImage
        placeholder={placeholder}
        className={cs(
          buttonStyles.add_user,
          buttonStyles.icon,
          listStyles.icon,
          styles.icon
        )}
        src={icons["add_user"]}
      />
    </ListItem>
  );
};

const Users = () => {
  const dropdown = useScreenStore((state) => state.selectedDropDown);
  const users = useUserStore((state) => state.users);
  const variant = "users";

  return (
    <div
      className={cs(
        "dropdown_container",
        dropdown == variant && "drop",
        dropDownStyles.users,
        dropDownStyles.container
      )}
    >
      <List variant={variant}>
        <>
          {Object.keys(users).map((user) => (
            <UserItem
              key={nanoid()}
              userID={users[user][0]}
              instrument={users[user][1]}
            />
          ))}
        </>
        <AddUserItem />
      </List>
      <Toolbar variant="dropdown" />
    </div>
  );
};

export default Users;
