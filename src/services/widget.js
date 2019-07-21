import React, { Component } from "react";
import places from "places.js";
import connect from "./connector";
import "../containers/CreateTripForm/CreateTripForm.css";

class Places extends Component {
  createRef = c => (this.element = c);

  componentDidMount() {
    const { refine, defaultRefinement } = this.props;

    const autocomplete = places({
      container: this.element
      // Algolia Places options
    });

    autocomplete.on("change", event => {
      this.props.destinationHandler(
        `${event.suggestion.name}, ${
          (event.suggestion.administrative || event.suggestion.country) ===
          "United States of America"
            ? "United States"
            : event.suggestion.administrative || event.suggestion.country
        }`
      );
      refine(event.suggestion.latlng);
    });

    autocomplete.on("clear", () => {
      refine(defaultRefinement);
    });
  }

  render() {
    return (
      <div style={{ marginBottom: 20 }}>
        <input
          ref={this.createRef}
          type="search"
          id="address-input"
          className="createTripform-input c-smokeBlack mali400 border-0 p-3 w-100 placeholder-destination"
          name="destination"
          placeholder="Destination"
          aria-label="Destination by City, Country"
          aria-describedby="basic-addon1"
          required
        />
      </div>
    );
  }
}

export default connect(Places);
