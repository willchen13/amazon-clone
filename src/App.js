import React, {useEffect} from 'react';
import './App.css';
import Header from './components/Header.js';
import Home from './components/Home.js';
import Checkout from './components/Checkout.js';
import Login from './components/Login.js';
import Payment from './components/Payment.js';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {auth} from './firebase.js';
import {useStateValue} from './components/StateProvider.js';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import Orders from './components/Orders.js';

const promise = loadStripe('pk_test_51IVBtzLEZylG4GoOPo4lJBeRW2XiwdZV3DGN1riJJMwjBCIdEU2jYLzOmh176JAsYpUC7340XI2qZXbK7qmMjyBS00I6dGNeKQ');
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

          <Route path="/Orders">
            <Header/>
            <Orders/>
          </Route>

          <Route path="/Login">
            <Login/>
          </Route>

          <Route path="/checkout">
            <Header/>
            <Checkout/>
          </Route>

          <Route path="/payment">
            <Header/>
            
            <Elements stripe={promise}>
              <Payment/>
            </Elements>
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
