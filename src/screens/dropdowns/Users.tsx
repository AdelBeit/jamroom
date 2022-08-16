import { Toolbar } from "../../components/Toolbar";
import styles from "./DropDown.module.css";
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

// TODO: overhaul
// leave button socket
// CHECK: player joined
// CHECK: player changed instrument
// CHECK: show list of players
// add players by inviting them, copy invite code with button
// kick players

const UserItem = ({
  userID,
  instrument,
}: {
  userID: User["id"];
  instrument: User["instrument"];
}) => {
  const primaryUser = useUserStore((state) => state.userID) == userID;
  const [viewSlider, setViewSlider] = useState(false);
  const [changeVolume, userVolumes] = useVolumeStore((state) => [
    state.changeVolume,
    state.userVolumes,
  ]);
  const handler = () => setViewSlider(!viewSlider);
  const setVolume = (e) => {
    changeVolume(userID, e.target.value);
  };
  const value = userVolumes[userID];

  return (
    <ListItem
      classes={cs(primaryUser ? listStyles.primary : "", listStyles.user)}
      handler={handler}
    >
      {!viewSlider && (
        <>
          {/* <LoadImage
          placeholder={placeholder}
          className={cs(buttonStyles.leave, buttonStyles.icon, listStyles.icon)}
          src={icons["leave"]}
        /> */}
          <span
            className={cs(primaryUser && listStyles.primary, "neumorphic_text")}
          >
            {userID}
          </span>
          <LoadImage
            placeholder={placeholder}
            className={listStyles.icon}
            src={icons[instrument]}
          />
        </>
      )}
      {viewSlider && (
        <VolumeSlider
          onChange={setVolume}
          value={value}
          id="volume"
          name="volume"
          min={-20}
          max={20}
          step="0.1"
        />
      )}
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
    <ListItem classes={cs(listStyles.add_user)} handler={handler}>
      <LoadImage
        placeholder={placeholder}
        className={cs(
          buttonStyles.add_user,
          buttonStyles.icon,
          listStyles.icon
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
        styles.users,
        styles.container
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
