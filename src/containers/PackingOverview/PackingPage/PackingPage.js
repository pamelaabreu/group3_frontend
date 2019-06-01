import React, { Component } from "react";
// import axios from "axios";
import BASEURL from "../../../services/backendUrlConnect";
// import UnpackedItem from "../../../components/UnpackedItem/UnpackedItem";
import BagSelector from "../../../components/BagSelectorCard/BagSelectorCard";
import Bag from "../../../components/Bag/Bag";
import UnpackedItem from "../../../components/UnpackedItem/UnpackedItem";
import PackedItem from "../../../components/PackedItem/PackedItem";
import "./PackingPage.css";
import axios from "axios";

// const bag = (items = []) => {
//   return (
//     <div>
//       <div className="row px-3 col-6 col-md-4">
//         {items.map((e, i) => {
//           return (
//             <div className="col-6 col-sm-6 col-md-4 p-0" key={i}>
//               {/* <UnpackedItem /> */}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// onComponentMount
// gets all bag ids from parent
// get ALL bag items for ALL bags
// insertSort bag items by their item_id
// check localStorage

// if it doesnt exist in localStorage, store it
// key: tripid-bagid / value: [{item}, {item}, {item}]
// else ~*~*~*~*~*~*~*~

// Clicking on bag
// check localStorage
// if exist in localStorage, use that array
// else
// get ALL bag items for bag in DB
// insertSort bag items by their item_id
// check localStorage

// save to localStorage
// compare to localStorage
// save to localStorage
//
// key: tripid-bagid / value: [{item}, {item}, {item}]
// update/check localStorage,
// class will process this
// store it in localStorage
// any changes save to localStorage,

// TODO
// bag route to get all of its items
// item route to read item
// function that splits a bag.
/* 
BAG STRUCTURE:
bag_id: {
name: type_id
items_unpacked: #,
items:[]

maybe make a bag class??
sort: this will clean up the
}


State: {
    currentBag: bag_id,
    bags:[], all bag ids
    bag_id: bag class
    ... 

}


 */
export default (class PackPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tripInfo: null,
      categories: null,
      page: "packing",
      bags: null,
      bagTypes: { 1: "Personal", 2: "Carry-On", 3: "Checked" },
      currentBag: null,
      currentCategory: null,
      lists: null,
      loading: true,
      lastInputIndex: null
    };
  }

  async componentDidMount() {
    console.log(this.props);
    const { bagTypes } = this.state;
    const { bags } = this.props;
    const allBagPromise = [];
    for (let bag of bags) {
      allBagPromise.push(
        axios({
          method: "get",
          url: `${BASEURL}/bag/${bag.bag_id}/all`
        })
      );
    }
    try {
      const allBags = await Promise.all(allBagPromise);
      const addToState = {};
      let displayBag = "";
      // console.log(allBags)
      for (let i = 0; i < allBags.length; i++) {
        const { data: items } = allBags[i];
        const { trip_id, bag_id, type_id } = bags[i];
        const key = `${bagTypes[type_id].slice(0, 2)}${trip_id}${bag_id}`;
        if (bagTypes[type_id] === "Personal") displayBag = key;
        addToState[key] = items;
      }
      this.setState({ ...addToState, displayBag });
    } catch (err) {
      console.log("Componenet Mount Error: ", err);
    }
  }

  handleOnClick = (name, index) => e => {
    console.log(name, index);

    switch (name) {
      case "packing":
        this.setState({ page: name });
        break;
      case "reminders":
        this.setState({ page: name });
        break;
      case "bag":
        this.setState({ displayBag: index });
        break;
      case "important":
        this.handleImportant(index, e);
        break;
      case "select":
        this.handleSelect(index, e);
        break;
      case "quantity":
        this.handleQuantity(index, e);
        break;
      default:
        return;
    }
  };

  handleImportant = (index, e) => {
    const { displayBag } = this.state;
    const items = this.state[displayBag];
    if (!items || items.length === 0) return;
    items[index].important = !items[index].important;
    this.setState({
      [displayBag]: items
    });
  };

  handleSelect = (index, e) => {
    const { displayBag } = this.state;
    const items = this.state[displayBag];
    if (!items || items.length === 0) return;
    items[index].selected = !items[index].selected;
    items[index].packed = !items[index].packed;
    this.setState({
      [displayBag]: items
    });
  };

  handleQuantity = (index, e, keyPress) => {
    this.closeLastQuantity();
    const { displayBag } = this.state;
    const items = this.state[displayBag];
    // const { items } = this.state;
    if (!items || items.length === 0) return;
    if (keyPress) {
      const val = e.target.value < 1 ? 1 : e.target.value;
      items[index].quantity = val;
      items[index].modifyQuant = false;
      // this.handleQuantity(index, e);
    } else {
      items[index].modifyQuant = !items[index].modifyQuant;
    }
    this.setState({
      [displayBag]: items,
      lastInputIndex: index
    });
  };

  closeLastQuantity = () => {
    const { displayBag, lastInputIndex } = this.state;
    const items = this.state[displayBag];
    if (!items || items.length === 0) return;
    if (lastInputIndex !== null) {
      const val =
        items[lastInputIndex].quantity < 1 ||
        items[lastInputIndex].quantity === ""
          ? 1
          : items[lastInputIndex].quantity;
      items[lastInputIndex].quantity = val;
      items[lastInputIndex].modifyQuant = false;
      this.setState({
        [displayBag]: items
      });
    }
    return;
  };

  handleChange = (name, index) => e => {
    if (name === "quantity") {
      const { displayBag } = this.state;
      const items = this.state[displayBag];
      const val = e.target.value < 1 ? "" : e.target.value;
      items[index].quantity = val;
      this.setState({
        [displayBag]: items
      });
    }
    return;
  };

  onKeyPress = (name, index) => e => {
    if (name === "quantity") {
      if (e.key === "Enter") {
        this.handleQuantity(index, e, true);
      }
    }
  };

  getItemCountAndKey = (type, trip_id, bag_id) => {
    const bagKey = `${type.slice(0, 2)}${trip_id}${bag_id}`;
    if (!this.state[bagKey]) return "loading";
    let packedCount = 0;
    for (let item of this.state[bagKey]) {
      if (item.packed) packedCount += 1;
    }
    return { count: this.state[bagKey].length - packedCount, key: bagKey };
  };

  componentDidUpdate() {
    console.log("state updated");
    console.log(this.state);
  }

  render() {
    const { bags } = this.props;
    const { bagTypes, displayBag } = this.state;
    const bagContents = displayBag ? this.state[displayBag] : [];
    return (
      <div className="container">
        {/*  BAG SELECTOR  */}
        <div className="row justify-content-around ">
          {bags.map((e, i) => {
            return (
              <BagSelector
                {...e}
                bag_type={bagTypes[e.type_id]}
                //   key={bagTypes[e.bag_type]}
                key={i}
                countAndKey={this.getItemCountAndKey(
                  bagTypes[e.type_id],
                  e.trip_id,
                  e.bag_id
                )}
                handleOnClick={this.handleOnClick}
                item_count={12}
              />
            );
          })}
          <Bag
            items={bagContents}
            handleOnClick={this.handleOnClick}
            handleChange={this.handleChange}
            onKeyPress={this.onKeyPress}
          />

          {/* */}
        </div>
      </div>
    );
  }
});
