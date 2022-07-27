import { Toolbar } from "../components/Toolbar";
import { Drumkit } from "../components/Drumkit";
import styles from "./Screens.module.css";
import cs from "classnames";

const Drums = () => {
  return (
    <div className={cs("page_container", styles.drums)}>
      <Toolbar variant="drums" />
      <Drumkit />
    </div>
  );
};

export default Drums;
