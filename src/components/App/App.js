import "./App.css";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import PlanningPage from "../../pages/PlanningPages";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/planning-page">
          <PlanningPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
