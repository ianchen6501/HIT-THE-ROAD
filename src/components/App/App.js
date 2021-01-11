/* eslint-disable react-hooks/exhaustive-deps */
import "./App.css";
import { useEffect, useState } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "../../pages/HomePages";
import LoginPage from "../../pages/LoginPages";
import RegisterPage from "../../pages/RegisterPages";
import ExpolorePage from "../../pages/ExplorePages";
import CreatePage from "../../pages/CreatePages";
import UserPage from "../../pages/UserPages";
import EditPage from "../../pages/EditPages";
import PlanningPage from "../../pages/PlanningPages";
import FinishPlanPage from "../../pages/FinishPlanPages";
import ExploreSinglePage from "../../pages/ExploreSinglePages";
import Footer from "../Footer";
import Header from "../Header";
import { checkIsLogin } from "../../redux/reducers/usersReducer";
import { useDispatch } from "react-redux";

function App({ FBstartApp, FBdeleteApp }) {
  const dispatch = useDispatch();
  const [isCheckedLogin, setIsCheckedLogin] = useState(false);

  useEffect(() => {
    dispatch(checkIsLogin()).then(() => setIsCheckedLogin(true));

    return async () => {
      await dispatch(checkIsLogin()).then(() => setIsCheckedLogin(true));
    };
  }, []);

  return (
    <Router>
      <Header isCheckedLogin={isCheckedLogin} />
      {isCheckedLogin && (
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/login">
            <LoginPage />
          </Route>
          <Route exact path="/register">
            <RegisterPage FBstartApp={FBstartApp} FBdeleteApp={FBdeleteApp} />
          </Route>
          <Route exact path="/create">
            <CreatePage />
          </Route>
          <Route exact path="/edit/:id">
            <EditPage />
          </Route>
          <Route exact path="/user">
            <UserPage />
          </Route>
          <Route exact path="/explore/:slug">
            <ExpolorePage />
          </Route>
          <Route path="/planning-page">
            <PlanningPage />
          </Route>
          <Route path="/finish-plan-page">
            <FinishPlanPage />
          </Route>
          <Route path="/explore/:slug">
            <ExploreSinglePage />
          </Route>
        </Switch>
      )}
      <Footer />
    </Router>
  );
}

export default App;
