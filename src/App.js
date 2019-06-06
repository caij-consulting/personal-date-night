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
      // eventsJSX: "",
      // eventName: "",
      // eventStartTime: "",
      // eventStartDate: "",
      // eventVenue: "",
      // eventImage: "",

    }
  }
  //time input format localStartEndDateTime=2019-06-05T17:00:00,2019-06-05T20:00:00 


  getTicketmasterData = (city, startDate, endDate) => {

    axios({
      method: "GET",
      url: `https://app.ticketmaster.com/discovery/v2/events.json?apikey=cpqJuV2A3YqkXOJylkTrDzVGLRKZ5hp5&city=${city}&localStartEndDateTime=${startDate},${endDate}`,
      dataResponse: "jsonp",
    }).then((response) => {
      // console.log(response);
      response = response.data._embedded.events;
      console.log(response)
      this.setState({
        // data: response.data._embedded.events,
        data: response,
      })
    })
  }

  //handle change for the first dateTime picker (for dateTimeStart)
  // handleChange1 = (time) => {
  //   console.log(time);
  //   this.setState({ dateTimeStart: time })
  // }
  // //handle change for the second dateTime picker (for dateTimeEnd)
  handleChange2 = (time) => {
    this.setState({ dateTimeEnd: time })
  }

  // handleLocationChange = (event) => {
  //   this.setState({
  //     location: event.target.value
  //   })
  // }
// for location change
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.dateTimeStart && this.state.dateTimeEnd) {
      let dateStart = this.formatDate(this.state.dateTimeStart);
      let dateEnd = this.formatDate(this.state.dateTimeEnd);
      let location = this.state.location;
      this.getTicketmasterData(location, dateStart, dateEnd);
    } 
  }





  // converting time function to string so it can be passed as a number in template literals 
  formatDate = (dateObject) => {
    let year = dateObject.getFullYear();
    let month = dateObject.getMonth() + 1;
    if (month < 10) {
      month = '0' + month;
    }
    let day = dateObject.getDate();
    if (day < 10) {
      day = '0' + day;
    }
    let hours = dateObject.getHours();
    if (hours < 10) {
      hours = '0' + hours;
    }
    let minutes = dateObject.getMinutes();
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    let dateString = `${year}-${month}-${day}T${hours}:${minutes}:00`;
    return dateString
  }
 //time input format localStartEndDateTime=2019-06-05T17:00:00,2019-06-05T20:00:00 
  

  

  componentDidMount() {
    
  }
  render() {
    return (
      <div className="App">
        <Header />
        <SearchForm 
          dateTimeStart={this.state.dateTimeStart}
          dateTimeEnd={this.state.dateTimeEnd}
          // handleChange1={this.handleChange1}
          // handleChange2={this.handleChange2}
          handleChange={this.handleChange}

          onSubmit={this.onSubmit}
          // handleLocationChange={this.handleLocationChange}
          location={this.state.location}
        />
        {this.state.data.length !== 0 &&
          <div className="display-events">
            <div className="display-content">
              {this.state.data.map((eventObject) => {
                return (
                <ResultCard 
                key={eventObject.id}
                name={eventObject.name} 
                startDate={eventObject.dates.start.localDate}
                startTime={eventObject.dates.start.localTime}
                image={eventObject.images[1].url}
                location={eventObject._embedded.venues[0].city.name}
                />
                )
              })}
            </div>
          </div>}
        <EmailForm />
        {/* <EmailSent /> */}
        <Footer />
      </div>
    );
  }
}

export default App;
