import React from "react";
import "./UnpackedItemV2.css";

export default props => {
  const {
    important,
    flag,
    handleChange,
    handleClick,
    image,
    modifyQuant,
    name,
    onKeyPress,
    selected,
    quantity,
    index,
    toBeDeleted
  } = props;
  const toBePacked = selected
    ? "justify-content-center  rounded-bottom item--text--selected"
    : "justify-content-center rounded-bottom item--text--unselected";
  const toDelete = toBeDeleted ? " bg-danger " : " ";
  const img = image
    ? image
    : "https://www.jcrew.com/s7-img-facade/L4012_PA6511?fmt=jpeg";

  return (
    <div className="col-6 col-md-3 my-2 p-2">
      <div className="row justify-content-center">
        <div
          className="uItem--unpacked my-2 border border-white uItem--content-main row no-gutters"
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
                className={"col uItem--button-right mali900 c-bundleBlue"}
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
