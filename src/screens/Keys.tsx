import { Toolbar } from "../components/Toolbar";
import { Keyboard } from "../components/Keyboard";
import styles from "./Screens.module.css";
import cs from "classnames";

const Keys = () => {
  return (
    <div className={cs("page_container", styles.keys)}>
      <Toolbar variant="keys" />
      <Keyboard />
    </div>
  );
};

export default Keys;
