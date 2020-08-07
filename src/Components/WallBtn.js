// @ts-nocheck
import React from "react";

const WallBtn = ({ active, title, onSetActive }) => {
  return (
    <span
      className={active ? "wall-button this-btn" : "wall-button"}
      onClick={onSetActive}
    >
      {title}
    </span>
  );
};

export default WallBtn;