import React, { useState, useEffect } from "react";
import "./PackedItem.css";

export default props => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  const {
    // flag,
    deleteMode,
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

  const rightButton = deleteMode
    ? "pItem--button-rightDelete"
    : "pItem--button-right";

  const dynamicSize = name => {
    if (width < 500) return `pItem--${name}`;
    if (width >= 500 && width < 990) return `pItem--${name}-md`;
    if (width >= 990 && width < 1200) return `pItem--${name}-lg`;
    if (width >= 1200 && width < 1300) return `pItem--${name}-xlg`;
    if (width > 1300) return `pItem--${name}-xxlg`;
  };

  return (
    <div className="col-6 col-sm-6 col-md-4 col-lg-4 my-2 p-2">
      <div
        className="row justify-content-center"
        onClick={handleClick("item", index)}
      >
        <div
          className={
            dynamicSize("unpacked") +
            "  pItem my-2 border border-white pItem--content-main row no-gutters"
          }
          style={{ backgroundImage: `url(${img})` }}
        >
          <div
            className={
              dynamicSize("header") +
              " col-12 pItem--head text-center p-0 rounded"
            }
          >
            <span className="pItem--title--font c-denimBlue">{name}</span>
          </div>
          <div className="col-12 pItem--buttons rounded">
            <div className="row px-2 no-gutters">
              {/* <span
                className={
                  dynamicSize("button") + " col pItem--button-left align-center"
                }
              >
                <div
                  className={
                    " row justify-content-center no-gutters align-center"
                  }
                >
                  <div
                    className={
                      dynamicSize("btnrow") + " col text-center align-center"
                    }
                  >
                    <button
                      className="pItem--quantity-button bg-bundleBlue"
                      type="button"
                      aria-label="reduce quantity"
                      onClick={handleClick("decreaseQuantity", index)}
                    >
                      <i className="fas fa-minus c-white" />
                    </button>
                  </div>
                  <div
                    className={
                      dynamicSize("quantity") + " col text-center align-bottom"
                    }
                  >
                    <span className=" pItem--quantity-weight c-white align-bottom">
                      {quantity}
                    </span>
                  </div>
                  <div
                    className={
                      dynamicSize("btnrow") + " col text-center align-center"
                    }
                  >
                    <button
                      className="pItem--quantity-button bg-bundleBlue"
                      type="button"
                      aria-label="incrase quantity"
                      onClick={handleClick("increaseQuantity", index)}
                    >
                      <i className="fas fa-plus c-white" />
                    </button>
                  </div>
                </div>
              </span> */}
              <button
                type="button"
                className={
                  dynamicSize("button") +
                  " col  mali900 " +
                  rightButton +
                  " " +
                  toDelete
                }
                aria-label={`unpack ${name}`}
                onClick={handleClick("unpack", index)}
              >
                <span className={dynamicSize("unpack")}>Unpack</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
