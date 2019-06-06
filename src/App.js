import React, { Component } from 'react';
import axios from 'axios';
import Header from "./components/Header.js";
import SearchForm from "./components/SearchForm.js";
import DisplayResults from "./components/DisplayResults.js";
import ResultCard from "./components/ResultCard.js"
import EmailForm from "./components/EmailForm.js";
import Footer from "./components/Footer.js"
import "./styles/App.scss";

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      dateTimeStart: new Date(),
      dateTimeEnd: new Date(),
      location: "",
      displayResult: false,
      // eventsJSX: "",
      // eventName: "",
      // eventStartTime: "",
      // eventStartDate: "",
      // eventVenue: "",
      // eventImage: "",

    }
  }

  //handle change function
  handleChange = (event, name) => {
    console.log(event);
    // when console.log event, our location gets the object but for dateTimePicker we get the actual value 
    // if the item onChange has (name) tsParameterProperty, do the following
    if(name) {
      this.setState({
        [name]: event
      })
    } else {
      // which is for location...
      this.setState({
        [event.target.name]: event.target.value
      })
    }
  }


 //time input format localStartEndDateTime=2019-06-05T17:00:00,2019-06-05T20:00:00 
  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.dateTimeStart && this.state.dateTimeEnd &&this.state.location) {
      this.setState({
        displayResult: true,
      })
    }
  }
  render() {
    return (
      <div className="App">
        <Header />
        <SearchForm 
          dateTimeStart={this.state.dateTimeStart}
          dateTimeEnd={this.state.dateTimeEnd}
          handleChange={this.handleChange}
          onSubmit={this.onSubmit}
          location={this.state.location}
        />
        {this.state.displayResult &&
        <DisplayResults
          dateTimeStart={this.state.dateTimeStart}
          dateTimeEnd={this.state.dateTimeEnd}
          location={this.state.location}
        />
        }
        <EmailForm />
        {/* <EmailSent /> */}
        <Footer />
      </div>
    );
  }
}

export default App;
