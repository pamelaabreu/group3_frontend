import React, { useEffect, useState, useContext } from "react";
import { withRouter } from "react-router-dom";
import { getSuggestions } from "../../services/suggestions";
import axios from "axios";
import { buildBundle } from "../../services/backendCalls";
import "./Suggestions.css";
import FirebaseAuthContext from "../../context/FirebaseAuth";
import Baseurl from "../../services/backendUrlConnect";
import { addTrip } from "../../services/homeLocalStorage";

export default withRouter(props => {
  const {
    destination,
    duration,
    departureDate,
    returnDate,
    changeLoadStatus
  } = props;

  const FirebaseUserAuth = useContext(FirebaseAuthContext);

  const [categories, setCategories] = useState(null);
  const [items, setItems] = useState(null);
  const [displayItems, setDisplayItems] = useState(null);
  const [currCategory, setCurrCategory] = useState(null);
  const [newDisplay, setNewDisplay] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const allTheItems = getSuggestions(duration);
    setItems(allTheItems);

    axios({
      method: "get",
      url: `${Baseurl}/categories/all`
    })
      .then(res => {
        setCategories(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [duration]);

  useEffect(() => {
    if (!items) return;
    if (!currCategory) setDisplayItems(items.clothing);
  }, [items, currCategory]);

  useEffect(() => {
    if (FirebaseUserAuth.user !== null) {
      setUser(FirebaseUserAuth.user.uid);
    }
  }, [FirebaseUserAuth, user]);

  useEffect(() => {
    if (newDisplay) {
      if (newDisplay.update) {
        setDisplayItems(newDisplay.items);
        setNewDisplay({ items: {}, update: false });
      }
      return;
    }
  }, [newDisplay]);

  const handleCategoryClick = category => e => {
    setCurrCategory(category);
    setDisplayItems(items[category]);
  };

  const handleItemClick = (itemName, i) => e => {
    const currentItem = displayItems[i];
    items[currentItem.category][i].pack = !items[currentItem.category][i].pack;
    setItems(items);
    setNewDisplay({ items: items[currentItem.category], update: true });
  };

  const handleBundle = () => {
    changeLoadStatus(true);
    buildBundle(items, destination, departureDate, returnDate, user)
      .then(tripId => {
        changeLoadStatus(false);
        if (tripId && destination && duration && departureDate && returnDate) {
          addTrip(tripId, destination, duration, departureDate, returnDate);
        }
        props.history.push("/pack/" + tripId);
      })
      .catch(err => {
        console.log(err);
        changeLoadStatus(true);
      });
  };

  return (
    <>
      <div className="modal-header bg-bundleBlue border-0">
        <div className="container-fluid">
          <h2 className="c-white h1">Remove items you don't need.</h2>
        </div>

        <button
          type="button"
          className="close c-white"
          data-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>

      <div className="modal-body m-0 p-0">
        <div className="container-fluid bg-huate">
          <div className="row sticky-top bg-bundleBlue p-3">
            {categories ? (
              <div className="suggestions-categories d-flex justify-content-between align-items-center overflow-auto pb-5">
                {categories.map(e => {
                  console.log(e.name);
                  const activeCatergoryStyle =
                    "c-bundleBlue ds-lightGrey b-radius9 bg-white";
                  const inactiveCategoryStyle =
                    "c-huate bg-transparent inactiveCategory-item";

                  if (e.name === "misc") return null;
                  if (e.name === "personal") return null;
                  if (e.name === "children") return null;
                  if (e.name === "essentials") return null;

                  let activeCatergoryClassname = null;
                  if (!currCategory) {
                    activeCatergoryClassname =
                      e.name.toLowerCase() === "clothing"
                        ? activeCatergoryStyle
                        : inactiveCategoryStyle;
                  } else {
                    activeCatergoryClassname =
                      e.name.toLowerCase() === currCategory.toLowerCase()
                        ? activeCatergoryStyle
                        : inactiveCategoryStyle;
                  }

                  return (
                    <button
                      key={e.id}
                      onClick={handleCategoryClick(e.name)}
                      className={
                        "mx-3 p-2 h4 capitalizeText border-0 " +
                        activeCatergoryClassname
                      }
                    >
                      {e.name}
                    </button>
                  );
                })}
              </div>
            ) : null}
          </div>
          <div className="row bg-babyBlue p-3 ">
            {displayItems
              ? displayItems.map((e, i) => {
                  const activeCardBorder = e.pack
                    ? "ds-lightGrey activeSuggestedItem-border"
                    : "border-0";
                  const activeCardText = e.pack ? "c-denimBlue" : "c-smokeGrey";
                  return (
                    <div
                      key={i}
                      onClick={handleItemClick(e.name, i)}
                      className="col-sm-4 col-m-6 col-lg-6 b-radius9 my-3 p-0"
                    >
                      <div
                        className={
                          "bg-white h-100 w-100 b-radius9 " + activeCardBorder
                        }
                      >
                        <div
                          className={
                            "pt-3 bg-white text-center mali700 b-radius9 h1 border-0" +
                            activeCardText
                          }
                        >
                          {e.name}
                        </div>
                        <div className="card-body b-radius9">
                          <div className="container-fluid px-5">
                            <div className="row">
                              <img
                                src={e.image}
                                alt={e.name}
                                className="col-12 p-0 m-0"
                                height="80%"
                              />
                            </div>
                            <div className="row justify-content-center pt-5 pb-2">
                              {e.pack ? (
                                <i className="far fa-check-circle activeSuggestedItem-color suggestions-checked-icon-size" />
                              ) : (
                                <i className="far fa-times-circle c-smokeGrey suggestions-checked-icon-size" />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              : null}
          </div>
        </div>
      </div>

      <div className="modal-footer">
        <button
          type="button"
          className="b-radius9 c-bundleBlue bundeBlue-border-1 p-3 h4 cancelBundleButton bg-transparent"
          data-dismiss="modal"
        >
          Cancel
        </button>
        <button
          className="bundleBlueButton border-0 p-3 h4 bundleItSubmitButton "
          data-dismiss="modal"
          onClick={handleBundle}
        >
          Bundle It!
        </button>
      </div>
    </>
  );
});
