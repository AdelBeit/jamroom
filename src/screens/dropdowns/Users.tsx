import { Toolbar } from "../../components/Toolbar";
import styles from "./DropDown.module.css";
import cs from "classnames";
import { List, UserItem } from "../../components/List";
import { useScreenStore, useUserStore } from "../../utils/stores";
import users from "../../utils/data/users";
import { nanoid } from "nanoid";

// TODO: overhaul
// leave button socket
// player joined
// CHECK: player changed instrument
// show list of players
// add players by inviting them, copy invite code with button
// kick players
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
        {Object.keys(users).map((user) => (
          <UserItem
            key={nanoid()}
            userID={users[user][0]}
            instrument={users[user][1]}
          />
        ))}
      </List>
      <Toolbar variant="dropdown" />
    </div>
  );
};

export default Users;
