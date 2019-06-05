import React, { Component } from "react";
import BagSelector from "../../../components/BagSelectorCard/BagSelectorCard";
import Bag from "../../../components/Bag/Bag";
import DeleteConfirm from "../../../components/DeleteConfirm/DeleteConfirm";
import ProgressBar from "../../../components/ProgressBar/ProgressBar";
import AddItemButton from "../RemindersPage/AddItemButton/AddItemButton";
import {
  addToDelete,
  closeLastQuantity,
  createItem,
  executeDelete,
  inputChange,
  markImportant,
  mountPacking,
  quantity,
  select,
  unpack
} from "../../../services/packingPage";
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
      lastInputIndex: null,
      deleteMode: false,
      toDelete: [],
      totalItems: 0,
      totalPacked: 0,
      itemInput: ""
    };
  }

  async componentDidMount() {
    const { bagTypes } = this.state;
    const { bags } = this.props;
    const mountState = await mountPacking(bagTypes, bags);
    if (mountState) this.setState(mountState);
    else console.log("Componenet Mount Error: ");
  }

  handleOnClick = (name, index) => e => {
    const { deleteMode } = this.state;
    if (name !== "endDelete" && deleteMode) {
      this.handleAddToDelete(name, index);
      return;
    }
    if (name !== "quantity") this.handleCloseLastQuantity();
    switch (name) {
      case "packing":
        this.setState({ page: name });
        break;
      case "reminders":
        this.setState({ page: name });
        break;
      case "bag":
        this.setState({ displayBag: index.key, bagName: index.bag_type });
        break;
      case "important":
        this.handleImportant(index, e);
        break;
      case "unpack":
        this.handleUnpack(index);
        break;
      case "select":
        this.handleSelect(index, e);
        break;
      case "quantity":
        this.handleQuantity(index, e);
        break;
      case "startDelete":
        this.setState({ deleteMode: true });
        break;
      case "endDelete":
        this.handleExecuteDelete();
        break;
      default:
        return;
    }
  };

  handleAddToDelete = (name, index) => {
    this.handleCloseLastQuantity();
    if (name === "bag") return;
    const newState = addToDelete(name, index, this.state);
    this.setState(newState);
    return;
  };

  handleExecuteDelete = async () => {
    // if toDelete is empty, set deleteMode to false, and exit method
    if (this.state.toDelete.length === 0) {
      this.setState({ deleteMode: false });
      return;
    }
    const newState = await executeDelete(this.state);
    this.setState(newState);
  };

  handleUnpack = index => {
    const newState = unpack(index, this.state);
    this.setState(newState);
    return;
  };

  handleImportant = (index, e) => {
    const newState = markImportant(index, this.state);
    if (newState) this.setState(newState);
    return;
  };

  handleSelect = (index, e) => {
    const newState = select(index, this.state);
    if (newState) this.setState(newState);
    return;
  };

  handleQuantity = (index, e, keyPress) => {
    this.handleCloseLastQuantity();
    const newState = quantity(index, e, keyPress, this.state);
    if (newState) this.setState(newState);
    return;
  };

  handleCloseLastQuantity = () => {
    const newState = closeLastQuantity(this.state);
    if (newState) this.setState(newState);
    return;
  };

  handleInputChange = (name, index) => e => {
    const newState = inputChange(name, index, e, this.state);
    if (newState) this.setState(newState);
    return;
  };

  handleOnChange = e => {
    // temporary
    this.setState({ itemInput: e.target.value });
  };

  handleCreateItem = async () => {
    const newState = await createItem(this.state);
    if (newState) this.setState(newState);
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
    // console.log(this.state);
  }

  render() {
    const { bags } = this.props;
    const {
      bagTypes,
      displayBag,
      deleteMode,
      totalItems,
      totalPacked,
      itemInput
    } = this.state;
    const bagContents = displayBag ? this.state[displayBag] : [];
    const total = Math.floor((totalPacked / totalItems) * 100);
    return (
      <div className="container">
        <div className="row justify-content-around ">
          {bags.map((e, i) => {
            return (
              <BagSelector
                {...e}
                bag_type={bagTypes[e.type_id]}
                key={i}
                countAndKey={this.getItemCountAndKey(
                  bagTypes[e.type_id],
                  e.trip_id,
                  e.bag_id
                )}
                displayBag={displayBag}
                handleOnClick={this.handleOnClick}
              />
            );
          })}
          <div className="mt-2 col-12">
            <ProgressBar total={total} />
            <div className="row">
              <div className="col-10">
                <Bag
                  items={bagContents}
                  handleOnClick={this.handleOnClick}
                  handleChange={this.handleInputChange}
                  onKeyPress={this.onKeyPress}
                />
              </div>
              <div className="col-2 p-0">
                <div>
                  <AddItemButton
                    itemInput={itemInput}
                    handleOnChange={this.handleOnChange}
                    handleCreateItem={this.handleCreateItem}
                  />
                </div>
                <DeleteConfirm
                  deleteMode={deleteMode}
                  handleOnClick={this.handleOnClick}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
