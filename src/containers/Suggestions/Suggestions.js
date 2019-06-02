import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { getSuggestions } from "../../services/suggestions";
import axios from "axios";
import { buildBundle } from "../../services/backendCalls";
import "./Suggestions.css";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";

export default withRouter(props => {
  const { destination, duration, departureDate, returnDate } = props;

  const [categories, setCategories] = useState(null);
  const [items, setItems] = useState(null);
  const [displayItems, setDisplayItems] = useState(null);
  const [currCategory, setCurrCategory] = useState(null);
  const [newDisplay, setNewDisplay] = useState(null);
  const [loading, setLoadStatus] = useState(false);

  useEffect(() => {
    const allTheItems = getSuggestions(duration);
    setItems(allTheItems);

    axios({
      method: "get",
      url: "http://localhost:5000/categories/all"
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
    if (newDisplay) {
      if (newDisplay.update) {
        setDisplayItems(newDisplay.items);
        setNewDisplay({ items: {}, update: false });
      }
      return;
    }
  }, [newDisplay]);

  useEffect(() => {
    if (loading) {
      buildBundle(items, destination, departureDate, returnDate)
        .then(tripId => {
          props.history.push("/pack/" + tripId);
          setLoadStatus(false);
        })
        .catch(err => {
          console.log(err);
          setLoadStatus(true);
        });
    }
  }, [loading]);

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
    setLoadStatus(true);
  };

  return (
    <>
      <h2>Here's what we recommend taking for your {duration} day trip:</h2>
      <h4>De-select any items you won't need</h4>
      {categories ? (
        <>
          <div className="suggestions-categories my-2">
            {categories.map(e => {
              return (
                <button
                  key={e.id}
                  onClick={handleCategoryClick(e.name)}
                  className="mx-2 btn border btn-info rounded"
                >
                  {e.name}
                </button>
              );
            })}
          </div>
        </>
      ) : null}
      <div className="suggestions-items">
        {displayItems
          ? displayItems.map((e, i) => {
              const color = e.pack ? " btn-primary " : " btn-secondary ";
              return (
                <div
                  className={"m-1 btn " + color}
                  key={i}
                  onClick={handleItemClick(e.name, i)}
                >
                  <h6>{e.name}</h6>
                </div>
              );
            })
          : null}
      </div>
      <button className="btn btn-secondary rounded" onClick={handleBundle}>
        Bundle It!
      </button>
      {!loading ? null : <LoadingScreen />}
    </>
  );
});
