import React, { useState, useEffect } from "react";
import "./UnpackedItemV2.css";

export default props => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  const {
    // flag,
    handleClick,
    image,
    name,
    quantity,
    index,
    toBeDeleted
  } = props;

  const toDelete = toBeDeleted ? " bg-danger text-white" : " ";
  const img = image
    ? image
    : "https://www.jcrew.com/s7-img-facade/L4012_PA6511?fmt=jpeg";

  const itemWidth = () => {
    if (width < 500) return "uItem--unpacked";
    if (width > 500 && width < 990) return "uItem--unpacked-md";
    if (width > 990 && width < 1200) return "uItem--unpacked-lg";
    if (width > 1150 && width < 1300) return "uItem--unpacked-xlg";
    if (width > 1300) return "uItem--unpacked-xxlg";
  };

  return (
    <div className="col-6 col-sm-6 col-md-4 col-lg-4 my-2 p-2">
      <div
        className="row justify-content-center"
        onClick={handleClick("item", index)}
      >
        <div
          className={
            itemWidth() +
            "  uItem my-2 border border-white uItem--content-main row no-gutters"
          }
          style={{ backgroundImage: `url(${img})` }}
        >
          <div className="col-12 uItem--title text-center p-0 rounded">
            <span className="uItem--title--font c-denimBlue">{name}</span>
          </div>
          <div className="col-12 uItem--buttons rounded">
            <div className="row px-2 no-gutters">
              <span className="col uItem--button-left align-center">
                <div className="row justify-content-center no-gutters align-center">
                  <div className="col text-center align-center">
                    <button
                      className="uItem--quantity bg-bundleBlue"
                      type="button"
                      aria-label="reduce quantity"
                      onClick={handleClick("decreaseQuantity", index)}
                    >
                      <i className="fas fa-minus c-white" />
                    </button>
                  </div>
                  <div className="col text-center align-bottom">
                    <span className="uItem--quantity-size c-white align-bottom">
                      {quantity}
                    </span>
                  </div>
                  <div className="col text-center align-center">
                    <button
                      className="uItem--quantity bg-bundleBlue"
                      type="button"
                      aria-label="incrase quantity"
                      onClick={handleClick("increaseQuantity", index)}
                    >
                      <i className="fas fa-plus c-white" />
                    </button>
                  </div>
                </div>
              </span>
              <button
                type="button"
                className={
                  "col uItem--button-right mali900 c-bundleBlue" + toDelete
                }
                aria-label={`select ${name}`}
                onClick={handleClick("select", index)}
              >
                Check
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
