import React from "react";
import "./UnpackedItem.css";

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

  const versionTwo = () => {
    return (
      <div className="col-6 col-md-3 my-2 p-2">
        <div className="row justify-content-center">
          <div
            className="item--unpacked my-2 border border-white uItem--content-main"
            style={{ backgroundImage: `url(${img})` }}
          >
            <div className="col-12 uItem--title text-center p-0 rounded">
              <span className="uItem--title--font item--title--color">
                {name}
              </span>
            </div>
            <div className="uItem--buttons">
              <button>Counter</button>
              <button>Select</button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  if (true) {
    return versionTwo();
  } else
    return (
      <div className="col-6 col-md-3">
        <div className="my-2 border border-white rounded">
          <button
            className={"item--unpacked p-0 rounded" + toDelete}
            onClick={handleClick("item", index)}
          >
            {/* <div className="col-12"> */}
            <span className="col-12 item--title--font item--title--color">
              {name}
            </span>
            {/* </div> */}
            <div className="container">
              <div className={"row align-items-center justify-content-center"}>
                <div>
                  {/* ITEM IMAGE */}
                  <img
                    src={img}
                    className="item--image--size rounded"
                    alt={name}
                  />
                </div>
                <div className="item--icon align-items-center">
                  {/* ICONS */}
                  <div>
                    <i
                      className="fas fa-shopping-cart item--icon--size"
                      onClick={handleClick("shopping-cart", index)}
                    />
                  </div>
                  <div>
                    {important ? (
                      <i
                        className="fas fa-star item--icon--size"
                        onClick={handleClick("important", index)}
                      />
                    ) : (
                      <i
                        className="far fa-star item--icon--size"
                        onClick={handleClick("important", index)}
                      />
                    )}
                  </div>
                  <div>
                    {flag ? (
                      <i className="far fa-question-circle item--icon--size" />
                    ) : (
                      /* needs work */
                      <div className="item--icon-filler"> </div>
                    )
                    /* needs work */
                    }
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12">
              {/* Item Name */}
              <div
                className={
                  "row align-items-center justify-content-center item--description-flow"
                }
              >
                <span className="item--title--font item--title--color">
                  <i className="fas fa-times item--count--size" />
                  {modifyQuant ? (
                    <input
                      className="item--input--count"
                      min="1"
                      max="25"
                      type="number"
                      onChange={handleChange("quantity", index)}
                      onKeyDown={onKeyPress("quantity", index)}
                      value={quantity}
                    />
                  ) : (
                    <span onClick={handleClick("quantity", index)}>
                      {" "}
                      {quantity}
                    </span>
                  )}
                </span>
              </div>
            </div>
            <div className="col-12" onClick={handleClick("select", index)}>
              {/* Item Pack On / Off */}
              <div className={toBePacked}>
                <span className="item--pack--font">Pack</span>
              </div>
            </div>
          </button>
        </div>
      </div>
    );
};
