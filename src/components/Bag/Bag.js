import React from "react";
import UnpackedItem from "../UnpackedItem/UnpackedItem";
import PackedItem from "../PackedItem/PackedItem";

export default props => {
  const { items, handleOnClick, handleChange, onKeyPress } = props;
  console.log("IN BAG COMPONENT: ", items);
  if (!items) {
    return <p>EMPTY</p>;
  } else {
    let packedCount = 0;
    const packed = items.map((e, i) => {
        if (e.packed) {
            packedCount += 1;
          return (
            <div className="col-6 col-sm-6 col-md-4 p-0" key={i}>
              <PackedItem
                {...e}
                index={i}
                Î
                handleClick={handleOnClick}
                handleChange={handleChange}
                onKeyPress={onKeyPress}
              />
            </div>
          );
        }
    })

    const unPacked = items.map((e, i) => {
        if (!e.packed) {
          return (
            <div className="col-6 col-sm-6 col-md-4 p-0" key={i}>
              <UnpackedItem
                {...e}
                index={i}
                Î
                handleClick={handleOnClick}
                handleChange={handleChange}
                onKeyPress={onKeyPress}
              />
            </div>
          );
        }
      })
    return (
      <div className="accordion" id="accordionExample">
        <div className="card">
          <div className="card-header " id="headingOne">
            <h2 className="mb-0">
              <button
                className="col-12 btn btn-link collapsed"
                type="button"
                data-toggle="collapse"
                data-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                Packed Items {packedCount + " of " + items.length}
              </button>
            </h2>
          </div>
            {packed}
          <div
            id="collapseOne"
            className="collapse"
            aria-labelledby="headingOne"
            data-parent="#accordionExample"
          >
            <div className="card-body row">
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header" id="headingTwo">
            <h2 className="mb-0">
              <button
                className="col-12 btn btn-link"
                type="button"
                data-toggle="collapse"
                data-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                UNPACKED ITEMS {(items.length - packedCount)   + " left" }
              </button>
            </h2>
          </div>
          <div
            id="collapseTwo"
            className="collapse show"
            aria-labelledby="headingTwo"
            data-parent="#accordionExample"
          >
            <div className="card-body row">
           {unPacked}
            </div>
          </div>
        </div>
      </div>
    );
  }
}