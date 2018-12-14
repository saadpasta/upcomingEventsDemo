import React, { Component } from "react";
import "../../App.css";
import * as firebase from "firebase";
import swal from 'sweetalert';
import FileUploader from "react-firebase-file-uploader";


// const storageRef = firebase.storage().ref();
// const db = firebase.firestore();

class EventForm extends Component {
    constructor() {
        super();

        this.state = {
            filenames: [],
            downloadURLs: [],
            isUploading: false,
            uploadProgress: 0
        };


    }

    handleUploadStart = () =>
    this.setState({
      isUploading: true,
      uploadProgress: 0
    });

  handleProgress = progress =>
    this.setState({
      uploadProgress: progress
    });

  handleUploadError = error => {
    this.setState({
      isUploading: false
      // Todo: handle error
    });
    console.error(error);
  };

  handleUploadSuccess = async filename => {
    const downloadURL = await firebase
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL();

    this.setState(oldState => ({
      filenames: [...oldState.filenames, filename],
      downloadURLs: [...oldState.downloadURLs, downloadURL],
      uploadProgress: 100,
      isUploading: false
    }));

    console.log(this.state.downloadURLs)

    const db = firebase.firestore();

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const date = document.getElementById("date").value;

    db.collection("Events").doc().set({ 
        title, description, date , image:this.state.downloadURLs[0]
      })
      .then(() =>{
          swal("Event Registerd Successful", "", "success");
          this.props.history.push("/Dashboard");

      })
      .catch(function(error) {
        swal(error.message, "", "error");
      });
  };

    render() {
        return (
            <div className="row mt-5">
                <div className="col-md-2" />
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">
                            <h2 className="text-center" id="profile">
                                Add Event
              </h2>
                        </div>
                        <div className="card-body">
                            <label>Event Name:</label>
                            <input type="text" className="form-control" id="title" />
                            <label className="mt-5">Event Description:</label>
                            <input type="text" className="form-control" id="description" />
                            <label className="mt-5">Event Date:</label>
                            <input type="date" className="form-control" id="date" />
                            <label className="mt-5">Image:</label>
                            <br />
                            <FileUploader
                                accept="image/*"
                                name="image-uploader-multiple"
                                randomizeFilename
                                storageRef={firebase.storage().ref("images")}
                                onUploadStart={this.handleUploadStart}
                                onUploadError={this.handleUploadError}
                                onUploadSuccess={this.handleUploadSuccess}
                                onProgress={this.handleProgress}
                                multiple
                            />                            <br />
                            <button className="btn btn-primary" onClick={this.handleUploadSuccess}>Submit</button>
                        </div>
                    </div>
                </div>
                <div className="col-md-2" />
            </div>
        );
    }
}

export default EventForm;
