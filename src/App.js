import React, { Component } from "react";
import { Switch, Route, HashRouter } from "react-router-dom";

// Pages
import Trip from "./containers/Trip/Trip";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Pack from "./containers/PackingOverview/PackingOverview";

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div className="App">
          <div id="outer-container">
            <Route path="/" component={Navbar} />
            <main id="page-wrap">
              <div>
                <Switch>
                  <Route path="/trip/:trip_id" exact component={Trip} />
                  <Route path="/" exact component={Home} />
                </Switch>
              </div>
            </main>
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default App;
