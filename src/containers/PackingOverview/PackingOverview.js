import React, { Component } from "react";
import axios from "axios";
import BASEURL from "../../services/backendUrlConnect";
import PackingPage from "./PackingPage/PackingPage";
import "./PackingOverview.css";
import RemindersPage from "./RemindersPage/RemindersPage";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import BagSelector from "../../components/BagSelectorCard/BagSelectorCard";
import Tabs from "../../components/PackingTabs/PackingTabs";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import {
  addToDelete,
  addToShoppingCart,
  closeLastQuantity,
  createItem,
  executeDelete,
  findOrCreateShoppingCart,
  inputChange,
  markImportant,
  mountPacking,
  newQuantity,
  quantity,
  select,
  unpack
} from "../../services/packingPage";

export default (class PackingOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tripInfo: null,
      categories: null,
      page: "packing",
      bagTypes: { 1: "Personal", 2: "Carry-On", 3: "Checked" },
      bagName: "Personal",
      currentBag: null,
      currentCategory: null,
      bags: null,
      lists: null,
      list_id: null,
      loading: true,
      selectedList: null,
      lastInputIndex: null,
      toDelete: [],
      deleteMode: false,
      totalItems: 0,
      totalPacked: 0,
      itemInput: "",
      height: window.innerHeight,
      width: window.innerWidth
    };
  }

  async componentDidMount() {
    window.addEventListener("resize", this.handleResize);
    const { trip_id } = this.props.match.params;
    const tripBagsAndLists = axios({
      method: "get",
      url: BASEURL + "/trip/init/" + trip_id
    });
    const allCategories = axios({
      method: "get",
      url: BASEURL + "/categories/all"
    });
    try {
      const [{ data: tripDetails }, { data: categories }] = await Promise.all([
        tripBagsAndLists,
        allCategories
      ]);
      this.setState(
        {
          tripInfo: tripDetails.trip,
          categories,
          bags: tripDetails.bags,
          lists: tripDetails.lists,
          loading: false
        },
        async () => {
          const { bags, lists, bagTypes } = this.state;
          const mountState = await mountPacking(bagTypes, bags, lists);
          if (mountState) this.setState(mountState);
        }
      );
    } catch (err) {
      console.log("ERROR: ", err);
      this.setState({ loading: true });
    }
  }

  handleResize = () => {
    this.setState({
      height: window.innerHeight,
      width: window.innerWidth
    });
  };

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  handleSelectList = e => {
    this.setState({ selectedList: e.target.value });
  };

  updateLists = () => {
    const { trip_id } = this.props.match.params;

    axios({
      method: "get",
      url: BASEURL + "/trip/init/" + trip_id
    }).then(({ data: trip }) => {
      console.log("trip.list", trip.lists);
      this.setState({ lists: trip.lists });
    });
  };

  moveToTrip = () => {
    const { trip_id } = this.props.match.params;
    this.props.history.push("/trip/" + trip_id);
  };

  getItemCountAndKey = (type, trip_id, bag_id) => {
    const bagKey = `${type.slice(0, 2)}${trip_id}${bag_id}`;
    if (!this.state[bagKey]) return "loading";
    let packedCount = 0;
    for (let item of this.state[bagKey]) {
      if (item.packed) packedCount += 1;
    }
    const newCount = Math.floor(
      (packedCount / this.state[bagKey].length) * 100
    );
    return { count: newCount, key: bagKey };
  };

  handleOnClick = (name, index) => e => {
    e.preventDefault();
    e.stopPropagation();
    const { deleteMode } = this.state;
    if (deleteMode && (name === "packing" || name === "reminders")) return;
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
      case "shopping-cart":
        this.handleShoppingCart(index, e);
        break;
      case "increaseQuantity":
        this.handleNewQuantity("increase", index);
        break;
      case "decreaseQuantity":
        this.handleNewQuantity("decrease", index);
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

  handleShoppingCart = async (index, e) => {
    const list_id = await findOrCreateShoppingCart(
      index,
      this.state,
      this.props.lists
    );
    if (list_id === null) return;
    const result = await addToShoppingCart(index, this.state, list_id);
    const { newState, updateParent } = result;
    if (updateParent) {
      this.props.updateLists();
      if (newState) this.setState(newState);
    } else {
      if (newState) this.setState(newState);
    }
    return;
  };

  handleQuantity = (index, e, keyPress) => {
    this.handleCloseLastQuantity();
    const newState = quantity(index, e, keyPress, this.state);
    if (newState) this.setState(newState);
    return;
  };

  handleNewQuantity = (method, index, e, keyPress) => {
    const newState = newQuantity(method, index, e, keyPress, this.state);
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

  componentDidUpdate() {
    console.log(this.state);
  }

  render() {
    const {
      loading,
      page,
      bags,
      lists,
      tripInfo,
      selectedList,
      height,
      width
    } = this.state;

    const {
      bagTypes,
      displayBag,
      deleteMode,
      totalItems,
      totalPacked,
      itemInput,
      bagName
    } = this.state;
    const city = tripInfo ? tripInfo.city.replace(/\s/g, "%20") : "";
    const bagContents = displayBag ? this.state[displayBag] : [];
    const total = Math.floor((totalPacked / totalItems) * 100);
    const infoBarHeight = Math.floor(height * 0.17);
    return (
      <>
        {loading ? (
          <LoadingScreen />
        ) : (
          <>
            <div
              className="packingoverview--content-main shadow"
              style={{
                height: infoBarHeight + "px"
              }}
            >
              <img
                className="packing--img-cover"
                src={`https://source.unsplash.com/weekly?${city}`}
                alt={`cover of ${city}`}
              />
              <Tabs
                page={page}
                handleOnClick={this.handleOnClick}
                moveToTrip={this.moveToTrip}
                windowHeight={height}
              />
              <div className="row mt-1 no-gutters">
                <div className="col-2 offset-2 pt-2">
                  <ProgressBar total={total} width={width} />
                </div>
                <div className="col-8 ">
                  <div className="row justify-content-around no-gutters">
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
                          width={width}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            {page === "packing" ? (
              <div className="packingoverview--main-background">
                <PackingPage
                  bags={bags}
                  lists={lists}
                  updateLists={this.updateLists}
                  windowHeight={height}
                  width={width}
                  bagContents={bagContents}
                  deleteMode={deleteMode}
                  itemInput={itemInput}
                  handleOnClick={this.handleOnClick}
                  handleChange={this.handleInputChange}
                  onKeyPress={this.onKeyPress}
                  handleOnChange={this.handleOnChange}
                  handleCreateItem={this.handleCreateItem}
                  height={height}
                  bagName={bagName}
                />
              </div>
            ) : (
              <RemindersPage
                lists={lists}
                updateLists={this.updateLists}
                trip_id={tripInfo.id}
                selectedList={selectedList}
                handleSelectList={this.handleSelectList}
                bag_id={bags[1].bag_id}
                windowHeight={height}
              />
            )}
          </>
        )}
      </>
    );
  }
});
