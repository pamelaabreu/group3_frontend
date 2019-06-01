import React, { Component } from "react";
import axios from "axios";
import BASEURL from "../../../services/backendUrlConnect";
import BagSelector from "../../../components/BagSelectorCard/BagSelectorCard";
import Bag from "../../../components/Bag/Bag";
import "./PackingPage.css";

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
    if (name !== "quantity") this.closeLastQuantity();
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
    axios({
      method: "put",
      url: BASEURL + "/items/" + items[index].id,
      data: {
        important: items[index].important
      }
    })
      .then(({ data }) => {
        console.log(data);
      })
      .catch(err => {
        console.log("ERROR PACKING ITEM IN THE BACK END!");
      });
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
    axios({
      method: "put",
      url: BASEURL + "/items/" + items[index].id,
      data: {
        packed: items[index].packed
      }
    })
      .then(({ data }) => {
        console.log(data);
      })
      .catch(err => {
        console.log("ERROR PACKING ITEM IN THE BACK END!");
      });
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
    } else {
      items[index].modifyQuant = !items[index].modifyQuant;
    }
    axios({
      method: "put",
      url: BASEURL + "/items/" + items[index].id,
      data: {
        quantity: items[index].quantity
      }
    })
      .then(({ data }) => {
        console.log(data);
      })
      .catch(err => {
        console.log("ERROR PACKING ITEM IN THE BACK END!");
      });
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
