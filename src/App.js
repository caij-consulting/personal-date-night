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
      eventsJSX: "",
      eventName: "",
      eventStartTime: "",
      eventStartDate: "",
      eventVenue: "",
      eventImage: "",
      dateTimeStart: new Date(),
      dateTimeEnd: new Date(),

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
  handleChange1 = (time) => {
    console.log(time);
    this.setState({ dateTimeStart: time })
  }
  //handle change for the second dateTime picker (for dateTimeEnd)
  handleChange2 = (time) => {
    this.setState({ dateTimeEnd: time })
  }

  componentDidMount() {
    this.getTicketmasterData("Toronto", "2019-06-05T18:00:00", "2019-06-05T19:00:00")

  }
  render() {
    return (
      <div className="App">
        <Header />
        <SearchForm 
          dateTimeStart={this.state.dateTimeStart}
          dateTimeEnd={this.state.dateTimeEnd}
          handleChange1={this.handleChange1}
          handleChange2={this.handleChange2}
        />
        {this.state.data.length !== 0 &&
          <div className="display-events">
            <div className="display-content">
              {this.state.data.map((eventObject) => {
                return <ResultCard 
                name={eventObject.name} 
                startDate={eventObject.dates.start.localDate}
                startTime={eventObject.dates.start.localTime}
                key={eventObject.id}
                image={eventObject.images[1].url}/>
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
