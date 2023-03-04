import React from "react";
import styles from "./styles.module.css";

const Footer = () => {
  const d = new Date();
  return (
    <>
      <div className={styles.footermain}>
        &copy;{d.getFullYear()}
        <span className="text-gray">&nbsp; ComfySloth &nbsp;</span> All rights
        reserved
      </div>
    </>
  );
};
export default Footer;
