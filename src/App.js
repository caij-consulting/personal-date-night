import React, { Component } from 'react';
import axios from 'axios';
import Header from "./components/Header.js";
import SearchForm from "./components/SearchForm.js";
import DisplayResults from "./components/DisplayResults.js";
import IndividualResult from "./components/IndividualResult.js"
import EmailForm from "./components/EmailForm.js";
import Footer from "./components/Footer.js"
import './App.scss';

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

    }
  }
  //time input format localStartEndDateTime=2019-06-05T17:00:00,2019-06-05T20:00:00 
  getTicketmasterData = (city, startDate, endDate) => {
    axios({
      method: "GET",
      url: `https://app.ticketmaster.com/discovery/v2/events.json?apikey=cpqJuV2A3YqkXOJylkTrDzVGLRKZ5hp5&city=${city}&localStartEndDateTime=${startDate},${endDate}`,
      dataResponse: "jsonp",
    }).then((response) => {
      this.setState({
        data: response.data._embedded.events,
      })
      console.log("result of the API call", this.state.data)
      // console.log(this.parseDataToDisplay());
    })

  }
  parseDataToDisplay = () => {
  }

  componentDidMount() {
    this.getTicketmasterData("Toronto", "2019-06-05T18:00:00", "2019-06-05T19:00:00")

  }
  render() {
    return (
      <div className="App">
        <Header />
        <SearchForm />
        {this.state.data.length !== 0 ?
          <div className="display-events">
            <div className="display-content">
              {this.state.data.map((eventObject) => {
                return <IndividualResult name={eventObject.name} startDate={eventObject.dates.start.localDate}/>
              })}
            </div>
          </div> : ""}
        <EmailForm />
        {/* <EmailSent /> */}
        <Footer />
      </div>
    );
  }
}

export default App;
