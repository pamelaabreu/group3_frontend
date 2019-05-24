import React from "react";
import "./UnpackedItem.css";

export default props => {
  const { fav, flag, handleChange, handleClick, image, modifyQuant, name, onKeyPress, selected, quantity, index, } = props;
  const toBePacked = selected
    ? "row align-items-center justify-content-center  rounded-bottom item--text--selected"
    : "row align-items-center justify-content-center rounded-bottom item--text--unselected";
  return (
    <div className="item--unpacked p-0 m-1 border border-white rounded">
      <div className="container">
        <div className={"row align-items-center justify-content-center"}>
          <div>
            {/* ITEM IMAGE */}
            <img src={image} className="item--image--size rounded" alt={name} />
          </div>
          <div className="item--icon align-items-center">
            {/* ICONS */}
            <div>
              <i className="fas fa-shopping-cart item--icon--size" />
            </div>
            <div>
              {fav ? (
                <i className="fas fa-star item--icon--size" onClick={handleClick('fav', index)} />
              ) : (
                <i className="far fa-star item--icon--size" onClick={handleClick('fav', index)} />
              )}
            </div>
            <div>
              {flag ? (
                <i className="far fa-question-circle item--icon--size" />
              ) : (
                /* needs work */
                <div className='item--icon-filler'> </div>
              )
              /* needs work */
              }
            </div>
          </div>
        </div>
      </div>
      <div className="col-12">
        {/* Item Name */}
        <div className={"row align-items-center justify-content-center"}>
          <span className="item--title--font item--title--color">
            {name} <i className="fas fa-times item--count--size" /> 
            {
                (modifyQuant)?
                <input className='item--input--count' min='1' max='25' type='number' onChange={handleChange('quantity', index)} onKeyDown={onKeyPress('quantity', index)} value={quantity} />
                :
                <span onClick={handleClick('quantity', index)}> {quantity}</span>
            }
          </span>
        </div>
      </div>
      <div className="col-12" onClick={handleClick('select', index)}>
        {/* Item Pack On / Off */}
        <div className={toBePacked}  >
          <span className="item--pack--font">Pack</span>
        </div>
      </div>
    </div>
  );
};