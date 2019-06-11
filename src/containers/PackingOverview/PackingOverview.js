import React, { Component } from "react";
import axios from "axios";
import BASEURL from "../../services/backendUrlConnect";
import PackingPage from "./PackingPage/PackingPage";
import "./PackingOverview.css";
import RemindersPage from "./RemindersPage/RemindersPage";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import Tabs from "../../components/PackingTabs/PackingTabs";
import { mountPacking } from "../../services/packingPage";

export default (class PackingOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tripInfo: null,
      categories: null,
      page: "packing",
      bagTypes: { 1: "Personal", 2: "Carry-On", 3: "Checked" },
      bags: null,
      lists: null,
      selectedList: null,
      loading: true,
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
          const { bagTypes } = this.state;
          const { bags, lists } = this.props;
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

  handleOnClick = (name, index) => e => {
    switch (name) {
      case "packing":
        this.setState({ page: name });
        break;
      case "reminders":
        this.setState({ page: name });
        break;
      default:
        break;
    }
  };

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

  componentDidUpdate() {
    const { height, width } = this.state;
    console.log("height:", height);
    console.log("width:", width);
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
    const city = tripInfo ? tripInfo.city.replace(/\s/g, "%20") : "";
    return (
      <>
        {loading ? (
          <LoadingScreen />
        ) : (
          <div
            className="packingoverview--content-main"
            style={{
              height: height,
              backgroundImage: `url(https://source.unsplash.com/weekly?${city})`
            }}
          >
            <Tabs
              page={page}
              handleOnClick={this.handleOnClick}
              moveToTrip={this.moveToTrip}
              windowHeight={height}
            />
            {page === "packing" ? (
              <PackingPage
                bags={bags}
                lists={lists}
                updateLists={this.updateLists}
                windowHeight={height}
                width={width}
              />
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
          </div>
        )}
      </>
    );
  }
});
