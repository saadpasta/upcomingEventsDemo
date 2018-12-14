import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as firebase from "firebase";

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBrnQ1aPl0G9H_NhsAD3gWnsmMDW_LDtMw",
    authDomain: "test-f7380.firebaseapp.com",
    databaseURL: "https://test-f7380.firebaseio.com",
    projectId: "test-f7380",
    storageBucket: "test-f7380.appspot.com",
    messagingSenderId: "136627999162"
};
firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
