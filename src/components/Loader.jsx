import React from "react";
import styles from "../css/loader.module.css";
import { BounceLoader } from "react-spinners";

export default function Loader() {
  return (
    <div className={styles.container}>
      <BounceLoader color="#ffffff" />
      <div className={styles.pro__text}>
        <span>Processing</span>
        <div className={styles.bouncing_loader}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
