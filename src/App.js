import React, { Component } from 'react';
import axios from 'axios';
import Intro from "./components/Intro.js";
import SearchForm from "./components/SearchForm.js";
import DisplayResults from "./components/DisplayResults.js";
import Footer from "./components/Footer.js"
import "./styles/App.scss";
import { animateScroll as scroll, scroller } from 'react-scroll';

// font awesome library
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheckDouble, faCheck, faUser, faTimes, faSortDown } from '@fortawesome/free-solid-svg-icons'
library.add(fab, faCheckDouble, faCheck, faUser, faTimes);


class App extends Component {
  constructor() {
    super();
    this.state = {
      allEvents: [],
      timeStart: "12:00",
      timeEnd: "23:00",
      date: new Date(),
      location: "Toronto",
      filteredEvents: [],
      eventCategories: [],
      userCategory: "",
      eventVenues: [],
      userVenue: "",
      isLoading: true,
      displayResult: false,
      textFilter: "",
      categoryDropdown: "",
      venueDropdown: "",
      error: false,
    }
  }
  //Function that handles changes on form elements.
  handleChange = (e, name) => {
    // our location gets the object but for dateTimePicker we get the actual value 
    // if the item onChange has (name) tsParameterProperty, do the following:
    if (name) {
      this.setState({
        [name]: e
      })
    } else {
      // this is for location...
      this.setState({
        [e.target.name]: e.target.value
      })
    }
  }
  
  reset = () => {
    this.setState({
      displayResult: false,
    })
  }

  // convert time function to string so it can be passed as a number in template literals 
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
    let minutes = time.substr(3, 5);
    let dateString = `${year}-${month}-${day}T${hours}:${minutes}:00`;
    return dateString
  }

  //time input format localStartEndDateTime=2019-06-05T17:00:00,2019-06-05T20:00:00 
  getTicketmasterData = (location, startDate, endDate) => {
    axios.get(`https://app.ticketmaster.com/discovery/v2/events.json`, {
      params: {
        apikey: "cpqJuV2A3YqkXOJylkTrDzVGLRKZ5hp5",
        city: location,
        localStartEndDateTime: `${startDate}, ${endDate}`,
      }
      // in-case CORS error comes back
      // dataResponse: "jsonp",     
    }).then((response) => {
      if (response.data.page.totalElements > 0) {
        response = response.data._embedded.events;
        this.setState({
          // allEvents is the good return we never modify
          allEvents: response,
          // filteredEvents is the item we want to modify based on user input
          filteredEvents: response,
          isLoading: false,
        })
        this.getEventCategories();
        this.getEventVenues();
      }
      else {
        this.setState({
          error: true
        })

      }
    })
  }
  //go through all events that are returned from the API call and go through all the categories they belong to add all the unique categories in an array called categories.
  getEventCategories = () => {
    // loop through all events 
    let eventCategories = ["All Categories"];
    for (let i = 0; i < this.state.allEvents.length; i++) {
      let eventCategory = this.state.allEvents[i].classifications[0].segment.name;
      if (!eventCategories.includes(eventCategory)) {
        eventCategories.push(eventCategory)
      }
    }
    this.setState({
      // ... copies the items to the array
      eventCategories: [...eventCategories],
    })
  }
  //go through all events that are returned from the API call and go through all the venues they belong to add all the unique categories in an array called categories.
  getEventVenues = () => {
    // loop through all events 
    let eventVenues = ["All Venues"];
    for (let i = 0; i < this.state.allEvents.length; i++) {
      let eventVenue = this.state.allEvents[i]._embedded.venues[0].name;
      if (!eventVenues.includes(eventVenue)) {
        eventVenues.push(eventVenue)
      }
    }
    this.setState({
      // ... copies the items to the array
      eventVenues: [...eventVenues],
    })
  }

  //filter events based on text, category and venue.
  filterEvents = (e, textFilter, categoryDropdown, venueDropdown) => {
    e.preventDefault();
    let copyOfAllEvents = [...this.state.allEvents];

    const filteredEvents = copyOfAllEvents.filter((eventObj) => {
      if (textFilter.trim().length > 0) {
        return eventObj.name.toUpperCase().includes(textFilter.toUpperCase())
      } else {
        return true;
      }
    })
      .filter((eventObj) => {
        if (categoryDropdown === "All Categories") {
          return true;
        }
        else {
          return eventObj.classifications[0].segment.name.includes(categoryDropdown);
        }
      })
      .filter((eventObj) => {
        if (venueDropdown === "All Venues") {
          return true;
        }
        else {
          return eventObj._embedded.venues[0].name.includes(venueDropdown);
        }
      })
    this.setState({
      filteredEvents: [...filteredEvents],
    })
  }
  //reset all the filters and return the full list of events.
  resetFilters = (e) => {
    e.preventDefault();
    this.filterEvents(e, "", "All Categories", "All Venues")
    this.setState({
      textFilter: "",
      categoryDropdown: "All Categories",
      venueDropdown: "All Venues",
    })
  }
  
  scrollTo() {
    scroller.scrollTo("resultsTop", {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart"
    })
  }

  //when user submits their search form, format date and make the API call
  onSubmit = (e) => {
    e.preventDefault();
    this.scrollTo();

    if (this.state.timeStart && this.state.timeEnd && this.state.location &&
      Date.parse(`01/01/2011 ${this.state.timeEnd}:00`) > Date.parse(`01/01/2011 ${this.state.timeStart}:00`)) {
      this.setState({
        displayResult: true,
      })
      const startDateTime = this.formatDate(this.state.date, this.state.timeStart);
      const endDateTime = this.formatDate(this.state.date, this.state.timeEnd);
      const location = this.state.location;
      this.getTicketmasterData(location, startDateTime, endDateTime);
    }

  }

  render() {
    return (
      <div className="App">
        <header>
          <div className="hero wrapper">
            <div className="heroInnerContainer">
              <div className="heroBorderMiddle">
                <Intro />
                <SearchForm
                  timeStart={this.state.timeStart}
                  timeEnd={this.state.timeEnd}
                  date={this.state.date}
                  handleChange={this.handleChange}
                  onSubmit={this.onSubmit}
                  location={this.state.location}
                />
              </div>
            </div>
          </div>
        </header>

        <main className="resultsTop">
          <div>
            {this.state.error
              ? (
                <div className="error wrapper">
                  <p>Sorry, your search didn't return any events. Please adjust your search and try again.</p>
                </div>
              )
              : (
                (this.state.displayResult && (
                  this.state.isLoading
                    //display loading while api results being returned
                    ? <h1>Getting Your Events...</h1>
                    : <DisplayResults
                      date={this.state.date}
                      timeStart={this.state.timeStart}
                      timeEnd={this.state.timeEnd}
                      location={this.state.location}
                      eventVenues={this.state.eventVenues}
                      handleChange={this.handleChange}
                      textFilter={this.state.textFilter}
                      allEvents={this.state.allEvents}
                      filteredEvents={this.state.filteredEvents}
                      eventCategories={this.state.eventCategories}
                      categoryDropdown={this.state.categoryDropdown}
                      venueDropdown={this.state.venueDropdown}
                      filterEvents={this.filterEvents}
                      resetFilters={this.resetFilters}
                    />
                ))
              )
            }
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}

export default App;