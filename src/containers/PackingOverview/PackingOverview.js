import React, { Component } from "react";
import axios from "axios";
import BASEURL from "../../services/backendUrlConnect";
import PackingPage from "./PackingPage/PackingPage";
import "./PackingOverview.css";
import RemindersPage from "./RemindersPage/RemindersPage";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import Tabs from "../../components/PackingTabs/PackingTabs";

export default (class PackingOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tripInfo: null,
      categories: null,
      page: "packing",
      bags: null,
      lists: null,
      selectedList: null,
      loading: true
    };
  }

  async componentDidMount() {
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
      this.setState({
        tripInfo: tripDetails.trip,
        categories,
        bags: tripDetails.bags,
        lists: tripDetails.lists,
        loading: false
      });
    } catch (err) {
      console.log("ERROR: ", err);
      this.setState({ loading: true });
    }
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

  render() {
    const { loading, page, bags, lists, tripInfo, selectedList } = this.state;

    return (
      <>
        {loading ? (
          <LoadingScreen />
        ) : (
          <div
            className="packingoverview--content-main"
            style={{
              backgroundImage: `url(https://source.unsplash.com/weekly?${
                tripInfo.city
              })`
            }}
          >
            <Tabs
              page={page}
              handleOnClick={this.handleOnClick}
              moveToTrip={this.moveToTrip}
            />
            {page === "packing" ? (
              <PackingPage
                bags={bags}
                lists={lists}
                updateLists={this.updateLists}
              />
            ) : (
              <RemindersPage
                lists={lists}
                updateLists={this.updateLists}
                trip_id={tripInfo.id}
                selectedList={selectedList}
                handleSelectList={this.handleSelectList}
                bag_id={bags[1].bag_id}
              />
            )}
          </div>
        )}
      </>
    );
  }
});
