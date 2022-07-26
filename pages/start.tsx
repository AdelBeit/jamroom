import styles from "../styles/Layout.module.css";
import cs from "classnames";
import { useScreenStore } from "../src/utils/stores";
import { useEffect, useRef } from "react";

const Start = () => {
  const handler = () => {
    useScreenStore.getState().setScreen("keys");
  };

  const ref = useRef(null);

  useEffect(() => {
    // @ts-ignore
    ref.current?.click();
  });

  return (
    <div className={cs("page_container", styles.start)}>
      <button ref={ref} onClick={handler}>
        start
      </button>
    </div>
  );
};

export default Start;
