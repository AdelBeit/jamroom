import { Toolbar } from "../../components/Toolbar";
import styles from "./DropDown.module.css";
import cs from "classnames";
import { List, UserItem } from "../../components/List";
import { useScreenStore } from "../../utils/stores";
import users from "../../utils/data/users";
import { nanoid } from "nanoid";

// TODO: overhaul
const Users = () => {
  const dropdown = useScreenStore((state) => state.selectedDropDown);

  const variant = "users";

  return (
    <div
      className={cs(
        "drop_down_container",
        dropdown == variant && "drop",
        styles.users
      )}
    >
      <List variant={variant}>
        {users.map((user) => (
          <UserItem
            key={nanoid()}
            username={user.username}
            instrument={user.instrument}
          />
        ))}
      </List>
      <Toolbar variant={variant} />
    </div>
  );
};

export default Users;
