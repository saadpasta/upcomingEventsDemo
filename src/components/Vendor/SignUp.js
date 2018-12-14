import React, { Component } from "react";
import "../../App.css";
import * as firebase from "firebase";
import swal from 'sweetalert';


// const storageRef = firebase.storage().ref();
// const db = firebase.firestore();

class VendorSignUp extends Component {
  constructor() {
    super();

    this.state = {
      user: false,
      uid: "",
      map: false,
      first: true,
      second: false,
      third: false
    };

    this.signUp = this.signUp.bind(this);
    this.signIn = this.signIn.bind(this);
  }

  signUp() {
    const db = firebase.firestore();

    const email = document.getElementById("email").value;
    const name = document.getElementById("name").value;
    const password = document.getElementById("password").value;


     if (!email || !name || !password) {
      swal("Fill all the fields", "", "warning");
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(res => {
          db.collection("Users").doc(res.user.uid).set({ 
              email, name, role: "Vendor" 
            })
            .then(() =>{
                swal("Registration Successful", "", "success");
                this.props.history.push("/vendor/eventform");
            })
            .catch(function(error) {
              swal(error.message, "", "error");
            });
        })
        .catch(function(error) {
          swal(error.message, "", "error");
        });
    } 
  }

  signIn(){
      this.props.history.push("/Dashboard");
  }

  render() {
    return (
      <div className="row mt-5">
        <div className="col-md-2" />
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h2 className="text-center" id="profile">
                Vendor Sign Up
              </h2>
            </div>
            <div className="card-body">
              <label>Name:</label>
              <input type="text" className="form-control" id="name" />
              <label className="mt-5">Email:</label>
              <input type="text" className="form-control" id="email" />
              <label className="mt-5">Password:</label>
              <input type="password" className="form-control" id="password" /><br />
              <button className="btn btn-primary" onClick={this.signUp}>Submit</button> Already had a account click 
              <a onClick={this.signIn} id="pointer"> here</a>
            </div>
          </div>
        </div>
        <div className="col-md-2" />
      </div>
    );
  }
}

export default VendorSignUp;
