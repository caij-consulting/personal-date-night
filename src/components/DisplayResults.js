import React, { Component } from 'react';
import axios from 'axios';
import ResultCard from "./ResultCard.js";

class DisplayResults extends Component{
    constructor() {
        super();
        this.state = {
            data: [],
            isLoading: true,
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
        let hours = time.substr(0,2);
        console.log(hours);
        let minutes = time.substr(3, 5);
        console.log(minutes);
        let dateString = `${year}-${month}-${day}T${hours}:${minutes}:00`;
        return dateString
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
                isLoading: false,
            })
        })
    }
    componentDidMount(){
        let date = this.props.date;
        let timeStart = this.props.timeStart;
        let timeEnd = this.props.timeEnd;
        let startDateTime = this.formatDate(date, timeStart);
        let endDateTime = this.formatDate(date, timeEnd);
        let location = this.props.location;
        this.getTicketmasterData(location, startDateTime, endDateTime);
    }
    render(){
        return(
            this.state.isLoading ? <h1>Getting Your Events...</h1>:

            <div className="display-events">
                <div className="display-content">
{/* errorhandling here : write a condition if city name is found in API, do below. else "Please enter a valid city name and date/time range*/}
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
            </div>
            // Page populated with search result
            // User one makes choice and event handler listening for choice
            // choice contains : event state details
            // pushes choice to userOneChoice
            // when switched to userTwo, same as above

            // in app.js
            // eventUrl: "",
            // userOneChoice: {},
            // userTwoChoice: {}

        )
    }
}
export default DisplayResults;