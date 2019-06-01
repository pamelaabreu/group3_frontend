import React, { Component } from "react";
// import axios from "axios";
// import BASEURL from "../../../services/backendUrlConnect";
// import UnpackedItem from "../../../components/UnpackedItem/UnpackedItem";
import BagSelector from "../../../components/BagSelectorCard/BagSelectorCard";
import "./PackingPage.css";

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
      loading: true
    };
  }

  componentDidMount() {}

  handleOnClick = (name, index) => e => {
    console.log(name, index);

    switch (name) {
      case "packing":
        this.setState({ page: name });
        break;
      case "reminders":
        this.setState({ page: name });
        break;
      default:
        return;
    }
  };

  render() {
    const { bags } = this.props;
    const { bagTypes } = this.state;
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
                handleOnClick={this.handleOnClick}
                item_count={12}
              />
            );
          })}

          {/* PACKED ITEMS */}
          {/* <div className="my-2 container">
              <div className="row">
                <div className="col-12 btn btn-primary">
                  <span className="">Packed Items</span>
                </div>
              </div>
            </div> */}

          <div className="accordion" id="accordionExample">
            <div className="card">
              <div className="card-header " id="headingOne">
                <h2 className="mb-0">
                  <button
                    className="col-12 btn btn-link collapsed"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    Packed Items
                  </button>
                </h2>
              </div>

              <div
                id="collapseOne"
                className="collapse"
                aria-labelledby="headingOne"
                data-parent="#accordionExample"
              >
                <div className="card-body">PACKED ITEMS</div>
              </div>
            </div>
            <div className="card">
              <div className="card-header" id="headingTwo">
                <h2 className="mb-0">
                  <button
                    className="col-12 btn btn-link"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                  >
                    UNPACKED ITEMS
                  </button>
                </h2>
              </div>
              <div
                id="collapseTwo"
                className="collapse show"
                aria-labelledby="headingTwo"
                data-parent="#accordionExample"
              >
                <div className="card-body">UNPACKED ITEMS</div>
              </div>
            </div>
          </div>

          {/* */}
        </div>
      </div>
    );
  }
});
