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
import CreatePage from '../../pages/CreatePages';
import UserPage from '../../pages/UserPages'
import EditPage from '../../pages/EditPages'
import Footer from '../Footer'
import Header from '../Header'
import { getAuthTokenFromLocalStorage } from '../../utils'
import { handleLoginByToken } from '../../redux/reducers/usersReducer'
import { useDispatch } from 'react-redux';

function App({FBstartApp, FBdeleteApp}) {
  const dispatch = useDispatch()

  useEffect(() => {
    const token = getAuthTokenFromLocalStorage()
    if(token) {
      dispatch(handleLoginByToken(token))
    }
  }, [])

  return (
    <Router>
      <Header/>
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
        <Route exact path='/create'>
          <CreatePage/>
        </Route>
        <Route exact path='/edit/:id'>
          <EditPage/>
        </Route>
        <Route exact path='/user/:id'> 
          <UserPage/>
        </Route>
        <Route exact path='/explore'> 
          <ExpolorePage/>
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
