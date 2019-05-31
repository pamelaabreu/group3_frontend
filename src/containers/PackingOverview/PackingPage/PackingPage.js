import React, { Component } from "react";
// import axios from "axios";
import BASEURL from "../../../services/backendUrlConnect";
// import UnpackedItem from "../../../components/UnpackedItem/UnpackedItem";
import BagSelector from "../../../components/BagSelectorCard/BagSelectorCard";
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
      loading: true
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
    };
    const allBags = await Promise.all(allBagPromise);
    const addToState = {};
    // console.log(allBags)
    for (let i = 0; i < allBags.length; i++) {
        const {data: items} = allBags[i];
        const {trip_id, bag_id, type_id} = bags[i];
        addToState[`${trip_id}-${bag_id}-${bagTypes[type_id]}`] = items;
    }
    this.setState({...addToState})
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
      default:
        return;
    }
  };

  componentDidUpdate() {
      console.log('state updated')
      console.log(this.state)
  }

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
