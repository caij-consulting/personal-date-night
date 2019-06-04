import React, { Component } from 'react';
import axios from 'axios';
import Header from "./Components/Header.js";
import SearchForm from "./Components/SearchForm.js";
import DisplayResults from "./Components/DisplayResults.js";
import IndividualResult from "./Components/IndividualResult.js"
import EmailForm from "./Components/EmailForm.js";
import EmailSent from "./Components/EmailSent.js";
import Footer from "./Components/Footer.js"
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
                return <IndividualResult name={eventObject.name}/>
              })}
            </div>
          </div> : ""}
        <EmailForm />
        <EmailSent />
        <Footer />
      </div>
    );
  }
}

export default App;
