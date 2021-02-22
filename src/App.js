import './App.css';
import Header from './components/Header.js';
import Home from './components/Home.js';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';


function App() {
  return (
    <Router>
      <div className="app">
        <Switch>

          <Route path="/checkout">
            <Header/>
            <h1> i am the checkout page </h1>
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
