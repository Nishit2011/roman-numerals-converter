import React from "react";
import { Switch, Route, Router } from "react-router-dom";

import RomanNumerals from "./components/RomanNumerals";
import history from "./history/history";

const App = () => {
  return (
    <div>
      <Router history={history}>
        <div className='container'>
          <Switch>
            <Route exact path='/' component={RomanNumerals}></Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
