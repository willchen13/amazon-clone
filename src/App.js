import React, {useEffect} from 'react';
import './App.css';
import Header from './components/Header.js';
import Home from './components/Home.js';
import Checkout from './components/Checkout.js';
import Login from './components/Login.js';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {auth} from './firebase.js';
import {useStateValue} from './components/StateProvider.js';

function App() {
  
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      console.log('the auth user is', authUser)
      //connect user
      if(authUser) {
        dispatch({
            type: "SET_USER",
            user: authUser
          }
        )
      }
      //disconnect
      else {
        dispatch({
          type: "SET_USER",
          user: null
        })
      }
      })
  }, []);

  return (
    <Router>
      <div className="app">
        
        <Switch>

          <Route path="/Login">
            <Login/>
          </Route>

          <Route path="/checkout">
            <Header/>
            <Checkout/>
          </Route>

          <Route path="/">
            <Header/>
            <Home/>
          </Route>

        </Switch>
      </div> 
    </Router>
  );
}

export default App;
