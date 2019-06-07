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
      timeStart: "12:00",
      timeEnd: "12:00",
      date: new Date(),
      location: "",
      displayResult: false,
      textFilter: "",
      categoryDropdown: "",
      venueDropdown: "",
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
    // when console.log event, our location gets the object but for dateTimePicker we get the actual value 
    // if the item onChange has (name) tsParameterProperty, do the following
    if (name) {
      console.log(name, event)
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
    if (this.state.timeStart && this.state.timeEnd && this.state.location &&
      Date.parse(`01/01/2011 ${this.state.timeEnd}:00`) > Date.parse(`01/01/2011 ${this.state.timeStart}:00`)) {
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
          timeStart={this.state.timeStart}
          timeEnd={this.state.timeEnd}
          date={this.state.date}
          handleChange={this.handleChange}
          onSubmit={this.onSubmit}
          location={this.state.location}
        />
        {this.state.displayResult &&
          <DisplayResults
            date={this.state.date}
            timeStart={this.state.timeStart}
            timeEnd={this.state.timeEnd}
            location={this.state.location}
            handleChange={this.handleChange}
            textFilter={this.state.textFilter}
            categoryDropdown={this.state.categoryDropdown}
            venueDropdown={this.state.venueDropdown}
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
