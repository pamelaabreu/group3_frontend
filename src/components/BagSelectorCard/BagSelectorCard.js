import React, { useState, useEffect } from "react";
import "./BagSelectorCard.css";

export default props => {
  const {
    bag_type,
    handleOnClick,
    countAndKey: { count, key },
    displayBag,
    width
  } = props;

  const dynamicSize = name => {
    if (width < 500) return `cbag--${name}`;
    if (width >= 500 && width < 990) return `cbag--${name}-md`;
    if (width >= 990 && width < 1200) return `cbag--${name}-lg`;
    if (width >= 1200 && width < 1300) return `cbag--${name}-xlg`;
    if (width > 1300) return `cbag--${name}-xxlg`;
  };
  const selected = key === displayBag ? " cbag--active " : " cbag--inactive ";
  return (
    <div className={" col pack--bag-width mx-1"}>
      <button
        className={dynamicSize("size") + " cbag--button"}
        onClick={handleOnClick("bag", { key, bag_type })}
      >
        <div className={selected + " p-1 text-left"}>
          <p className="">{bag_type}</p>
          <p className="">{count} Items unpacked</p>
        </div>
      </button>
    </div>
  );
};
