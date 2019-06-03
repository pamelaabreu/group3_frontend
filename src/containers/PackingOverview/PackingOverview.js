import React, { Component } from "react";
import axios from "axios";
import BASEURL from "../../services/backendUrlConnect";
import PackingPage from "./PackingPage/PackingPage";
import "./PackingOverview.css";
import RemindersPage from "./RemindersPage/RemindersPage";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";

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

  tabs = page => {
    return (
      <div className="container">
        <div className="row">
          <div className="col-10">
            <button className="btn" onClick={this.handleOnClick("packing")}>
              <span className={page === "packing" ? "" : "text-muted"}>
                Packing
              </span>
            </button>
            <button className="btn " onClick={this.handleOnClick("reminders")}>
              <span className={page === "packing" ? "text-muted" : ""}>
                Reminders
              </span>
            </button>
          </div>
          <div className="col-2">
            <button className="row" onClick={this.moveToTrip}>
              <span className="col-12 text-center">Trip</span>
              <i className="col-12 fas fa-long-arrow-alt-left text-center pack--arrow-transform" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  render() {
    const { loading, page, bags, lists, tripInfo, selectedList } = this.state;

    return (
      <>
        {loading ? (
          <LoadingScreen />
        ) : (
          <>
            {this.tabs(page)}
            {page === "packing" ? (
              <PackingPage bags={bags} />
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
          </>
        )}
      </>
    );
  }
});
