import './App.css';
import { createContext, useContext, useEffect } from 'react'
import {
  HashRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import styled from 'styled-components';
import HomePage from '../../pages/HomePages';
import LoginPage from '../../pages/LoginPages';
import RegisterPage from '../../pages/RegisterPages';
import ExpolorePage from '../../pages/ExplorePages';
import UserPage from '../../pages/UserPages';
import Footer from '../Footer'
import Header from '../Header'
import { getAuthTokenFromLocalStorage } from '../../utils'

function App({FBstartApp, FBdeleteApp}) {
  useEffect(() => {
    if(getAuthTokenFromLocalStorage()) {
      //dispatch(getUserData)
    }
    
  })

  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path='/'> 
          <HomePage/>
        </Route>
        <Route exact path='/login'> 
          <LoginPage/>
        </Route>
        <Route exact path='/register'> 
          <RegisterPage FBstartApp={FBstartApp} FBdeleteApp={FBdeleteApp}/>
        </Route>
        <Route exact path='/user/:id'> 
          <UserPage/>
        </Route>
        <Route exact path='/explore'> 
          <ExpolorePage/>
        </Route>
      </Switch>
      <Footer>Made by ...</Footer>
    </Router>
  );
}

export default App;
