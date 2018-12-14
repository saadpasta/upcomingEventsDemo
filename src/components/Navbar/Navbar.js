import React, { Component } from "react";
import "../../App.css";
import * as firebase from "firebase";
import { NavLink } from "react-router-dom";
import swal from "sweetalert";
import { updateUser } from "../../Redux/actions/authActions";
import { connect } from "react-redux";

class Navbar extends Component {

    constructor() {
        super();

        this.state = {
            user: false,
            request: []
        }

        this.logOut = this.logOut.bind(this);
    }


    componentDidMount() {
        const db = firebase.firestore();
        var a = this;
        var res1 = {};

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                console.log(user);
                
                // res1 = { name: user.uid }
                // a.props.updateUser(res1)

                // db.collection('users').where('uid', '==', user.uid).get().then(querySnapshot => {

                //     if (querySnapshot.size) {
                //         this.setState({ data: true })
                //     }

                // })
                // db.collection("meeting")
                //     .where("reciever", "==", user.uid)
                //     .where("request", "==", false)
                //     .onSnapshot(querySnapshot => {
                //         if (querySnapshot.size) {
                //             document.getElementById("request").innerHTML = `Request (${querySnapshot.size})`;
                //         }
                //     })
                // this.setState({ user: true });
            }
            else {
                console.log('no user');
                this.setState({ user: false });
            }
        });

    }

    componentWillReceiveProps(nextProps) {
        console.log("componentWillReceiveProps", nextProps);

    }

    logOut() {

        firebase.auth().signOut().then(() => {
            debugger
            swal("Logged Out successfully", "", "success");
            // this.props.history.replace("/SignIn");
            // this.setState({ user: false });            
        }).catch(function (error) {
            swal(error.message, '', 'error');
        });
    }

    render() {
        const { user, data } = this.state;

        return <div>

            <nav className="navbar navbar-expand-sm navbar-dark flex-row bg-primary" id="color">
                <a className="navbar-brand" href="/" id="navHeading">
                    UpComingTrips
                </a>
                <button className="navbar-toggler ml-lg-0" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>

                {user ? <div className="collapse navbar-collapse float-right" id="navbarSupportedContent">
                    <ul className="nav navbar-nav ml-auto" id="navbar">
                        <li className="nav-item">
                            {data ?
                                <NavLink exact activeClassName="active" to="/Profile">
                                    <span className="nav-link">
                                        Profile <span className="sr-only" />
                                    </span>
                                </NavLink>
                                :
                                <NavLink exact activeClassName="active" to="/">
                                    <span className="nav-link">
                                        Home <span className="sr-only" />
                                    </span>
                                </NavLink>
                            }
                        </li>

                        <li className="nav-item">
                            <NavLink activeClassName="active" to="/Requests">
                                <span className="nav-link" id="request">
                                    Requests <span className="sr-only" />
                                </span>
                            </NavLink>
                        </li>

                        <li className="nav-item dropdown" id="drop">
                            <a className="nav-link dropdown-toggle mr-3 mr-lg-0" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Dashboard
                        <span className="caret" />
                            </a>
                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                                <NavLink activeClassName="active" to="/Dashboard">
                                    <span className="dropdown-item">
                                        Set meetings
                          </span>
                                </NavLink>
                                <NavLink activeClassName="active" to="/Meetings">
                                    <span className="dropdown-item">
                                        My meetings
                          </span>
                                </NavLink>
                            </div>
                        </li>


                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle mr-3 mr-lg-0" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="fa fa-user" />
                                <span className="caret" />
                            </a>
                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                                <span className="dropdown-item" onClick={this.logOut}>
                                    LogOut
                        </span>
                            </div>
                        </li>
                    </ul>
                </div> : <div className="collapse navbar-collapse float-right" id="navbarSupportedContent">
                        <ul className="nav navbar-nav ml-auto">
                            <li className="nav-item">
                                <NavLink exact activeClassName="active" to="/">
                                    <span className="nav-link">
                                        Home <span className="sr-only" />
                                    </span>
                                </NavLink>
                            </li>
                        </ul>
                    </div>}
            </nav>
        </div>;
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.authReducers.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateUser: (user) => dispatch(updateUser(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);