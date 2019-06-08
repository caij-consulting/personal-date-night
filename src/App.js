import React, { Component } from 'react';
import axios from 'axios';
import Header from "./components/Header.js";
import SearchForm from "./components/SearchForm.js";
import DisplayResults from "./components/DisplayResults.js";
import Footer from "./components/Footer.js"
import "./styles/App.scss";

class App extends Component {
  constructor() {
    super();
    this.state = {
      allEvents: [],
      timeStart: "12:00",
      timeEnd: "12:00",
      date: new Date(),
      filteredEvents: [],
      eventCategories: [],
      userCategory: "",
      eventVenues: [],
      userVenue: "",
      isLoading: true,
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

  handleChange = (event, name) => {
    // when console.log event, our location gets the object but for dateTimePicker we get the actual value 
    // if the item onChange has (name) tsParameterProperty, do the following
    if (name) {
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

  // converting time function to string so it can be passed as a number in template literals 
  formatDate = (dateObject, time) => {
    let year = dateObject.getFullYear();
    let month = dateObject.getMonth() + 1;
    if (month < 10) {
        month = '0' + month;
    }
    let day = dateObject.getDate();
    if (day < 10) {
        day = '0' + day;
    }
    let hours = time.substr(0, 2);
    // console.log(hours);
    let minutes = time.substr(3, 5);
    // console.log(minutes);
    let dateString = `${year}-${month}-${day}T${hours}:${minutes}:00`;
    return dateString
}

//time input format localStartEndDateTime=2019-06-05T17:00:00,2019-06-05T20:00:00 
  getTicketmasterData = (location, startDate, endDate) => {
    // console.log('parameters that go to the API Call')
    // console.log("location: ", location)
    // console.log("Start Date: ", startDate);
    // console.log("End Date: ", endDate);

    axios({
        method: "GET",
        url: `https://app.ticketmaster.com/discovery/v2/events.json?apikey=cpqJuV2A3YqkXOJylkTrDzVGLRKZ5hp5&city=${location}&localStartEndDateTime=${startDate},${endDate}`,
        dataResponse: "jsonp",
    }).then((response) => {
        response = response.data._embedded.events;
        // console.log(response, allEvents)
        this.setState({
            // allEvents is the good return we never modify
            allEvents: response,
            // filteredEvents is the item we want to modify based on user input
            filteredEvents: response,
            isLoading: false,     
        })
        this.getEventCategories();
        this.getEventVenues();
    })
  }

  getEventCategories = () => {
    // loop through all events 
    let eventCategories = ["All Categories"];
    for (let i = 0; i < this.state.allEvents.length; i ++) {
        let eventCategory = this.state.allEvents[i].classifications[0].segment.name;
        console.log(eventCategory);
        if (!eventCategories.includes(eventCategory)) {
            eventCategories.push(eventCategory)
        }
    }
    console.log(eventCategories);
    this.setState({
        // ... copies the items to the array
        eventCategories: [...eventCategories],
    })
}

getEventVenues = () => {
    // loop through all events 
    let eventVenues = ["All Venues"];
    for (let i = 0; i < this.state.allEvents.length; i++) {
        let eventVenue = this.state.allEvents[i]._embedded.venues[0].name;
        if (!eventVenues.includes(eventVenue)) {
            eventVenues.push(eventVenue)
        }
    }
    console.log(eventVenues);
    this.setState({
        // ... copies the items to the array
        eventVenues: [...eventVenues],
    })
}

  componentDidMount() {
    console.log('COMPONENT MOUNT');
    const startDateTime = this.formatDate(this.state.date, this.state.timeStart);
    const endDateTime = this.formatDate(this.state.date, this.state.timeEnd);
    const location = this.state.location;
    this.getTicketmasterData(location, startDateTime, endDateTime);  
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
      <p>PAGE RENDERED</p>
        <Header />
        
        <SearchForm
          timeStart={this.state.timeStart}
          timeEnd={this.state.timeEnd}
          date={this.state.date}
          handleChange={this.handleChange}
          onSubmit={this.onSubmit}
          location={this.state.location}
        />

        {this.state.displayResult && (
          this.state.isLoading 
          ? <h1>Getting Your Events...</h1> 
          : <DisplayResults
              date={this.state.date}
              timeStart={this.state.timeStart}
              timeEnd={this.state.timeEnd}
              location={this.state.location}
              handleChange={this.handleChange}
              textFilter={this.state.textFilter}
              categoryDropdown={this.state.categoryDropdown}
              venueDropdown={this.state.venueDropdown}
            />
        )}
        <Footer />
      </div>
    );
  }
}

export default App;
