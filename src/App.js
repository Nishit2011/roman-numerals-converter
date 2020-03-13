import React from "react";
import { Switch, Route, Router } from "react-router-dom";

import Home from "./components/Home";
import history from "./history/history";

const App = () => {
  return (
    <div>
      <Router history={history}>
        <div className='container'>
          <Switch>
            <Route exact path='/' component={Home}></Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
