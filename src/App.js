import React, { Component } from 'react';
import './App.css';
import { Router, Route } from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory";
import { Provider } from "react-redux";
import store from "./Redux/store";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import VendorSignUp from "./components/Vendor/SignUp";
import EventForm from './components/Vendor/EventForm'
import Dashboard from './components/Dasboard/dashboard'
import VendorSignIn from "./components/Vendor/SignIn";

const customHistory = createBrowserHistory();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={customHistory}>
          <div>
            <Navbar />
            <Route exact path="/" component={Home} />
            <Route exact path="/Vendor/SignUp" component={VendorSignUp} />
            <Route exact path="/Vendor/SignIn" component={VendorSignIn} />

            <Route exact path="/vendor/eventform" component={EventForm} />
            <Route exact path="/Dashboard" component={Dashboard} />
            <Route exact path="/Dashboard" component={Dashboard} />

          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
