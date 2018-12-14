import React, { Component } from "react";
import "../../App.css";
import * as firebase from "firebase";
import swal from "sweetalert";
// import background from "../../images";
import pic from "../../images/logo1.png"
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, CardGroup
} from 'reactstrap';
class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [],
        };

    }


    componentDidMount() {
        const db = firebase.firestore();
        var self = this;

        db.collection("Events").get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                self.setState(oldState => ({

                    events: [...oldState.events, doc.data()],
                }));
            })
        })

    }

    postevents=()=>{
        this.props.history.push("/vendor/eventform");

    }

    render() {
        const events = this.state.events
        return (
            <div>
                <Button color="info" size="lg" onClick={this.postevents} className='buttonEvent'>Post Events</Button>{' '}
                <div className='cardsDeck'>
                    {this.state.events.map((data, i) => {
                        return <Card className='card1'>
                            <CardImg src={data.image} alt="Card image cap" className='image' />
                            <CardBody>
                                <CardTitle>{data.title}</CardTitle>
                                <CardText>{data.description}</CardText>
                                <CardText>Event Data :{data.date}</CardText>
                                <Button>Enquiry</Button>
                            </CardBody>
                        </Card>;
                    })}



                </div>
            </div>
        );
    }
}

export default Dashboard;



