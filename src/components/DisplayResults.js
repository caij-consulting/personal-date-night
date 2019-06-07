import React, { Component } from 'react';
import axios from 'axios';
import ResultCard from "./ResultCard.js";

class DisplayResults extends Component {
    constructor() {
        super();
        this.state = {
            allEvents: [],
            filteredEvents: [],
            isLoading: true,
            user1: {},
            user2: {},
            currentUser: 1,
            checked:'checked'

            // current user has been selected in App.js
            // App.js passes info to DisplayResults
            //match value to user1 or 

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
        console.log(hours);
        let minutes = time.substr(3, 5);
        console.log(minutes);
        let dateString = `${year}-${month}-${day}T${hours}:${minutes}:00`;
        return dateString
    }

    //time input format localStartEndDateTime=2019-06-05T17:00:00,2019-06-05T20:00:00 
    getTicketmasterData = (location, startDate, endDate) => {
        console.log('parameters that go to the API Call')
        console.log("location: ", location)
        console.log("Start Date: ", startDate);
        console.log("End Date: ", endDate);
        axios({
            method: "GET",
            url: `https://app.ticketmaster.com/discovery/v2/events.json?apikey=cpqJuV2A3YqkXOJylkTrDzVGLRKZ5hp5&city=${location}&localStartEndDateTime=${startDate},${endDate}`,
            dataResponse: "jsonp",
        }).then((response) => {
            // console.log(response);
            response = response.data._embedded.events;
            console.log(response)
            this.setState({
                allEvents: response,
                filteredEvents: response,
                isLoading: false,
            })
        })
    }
    filterEventName = (name) => {
        if(!name){
            this.setState({
                filteredEvents: [...this.state.allEvents],
            })
        }
        let copyOfAllEvents = [...this.state.allEvents];
        let filteredEvents = copyOfAllEvents.filter((eventObject) => {
            return eventObject.name.toUpperCase().includes(name.toUpperCase());
        })
        this.setState({
            filteredEvents: [...filteredEvents],
        })
        
    }
    // default is user one
    // which is the selected
    // current user will = user1


    handleChangeRadio = (event, selected) => {
            this.setState({
                [event.target.name]: event.target.value
            },
                (selected) =>{
                 
                }
            )
        }
   


    componentDidMount() {
        let date = this.props.date;
        let timeStart = this.props.timeStart;
        let timeEnd = this.props.timeEnd;
        let startDateTime = this.formatDate(date, timeStart);
        let endDateTime = this.formatDate(date, timeEnd);
        let location = this.props.location;
        this.getTicketmasterData(location, startDateTime, endDateTime);
    }
    render() {
        return (
            this.state.isLoading ? <h1>Getting Your Events...</h1> :

                <div className="display-events">
                    <div className="display-content">
                        {/* errorhandling here : write a condition if city name is found in API, do below. else "Please enter a valid city name and date/time range*/}
                        <label htmlFor="textFilter">Enter Text to Filter</label>
                        <input
                            type="text"
                            name="textFilter"
                            onChange={(event) => { this.props.handleChange(event) }}
                            required={true}
                            value={this.props.textFilter} />
                        <button onClick={() => this.filterEventName(this.props.textFilter)}>Filter</button>
                        {
                        this.state.filteredEvents.map((eventObject) => {
                            return (
                                <div>
                                    <form action="">
                                        <div className="user">
                                            <label htmlFor="user1">User 1</label>
                                            <input onChange ={(event,name)=>{this.handleChangeRadio(event,name)}}  
                                            type="radio" 
                                            name="currentUser" 
                                            id="user1" 
                                            // checked={}
                                            value = "1" />
                                        </div>
                                        <div className="user">
                                            <label htmlFor="user2">User 2</label>
                                            <input onChange={(event,name) => { this.handleChangeRadio(event,name) }} 
                                            type="radio" 
                                            name="currentUser" 
                                            id="user2" 
                                            value = "2"/>
                                        </div>
                                    </form> 

                                    <ResultCard
                                        key={eventObject.id}
                                        name={eventObject.name}
                                        startDate={eventObject.dates.start.localDate}
                                        startTime={eventObject.dates.start.localTime}
                                        image={eventObject.images[1].url}
                                        location={eventObject._embedded.venues[0].city.name}
                                    />
                                </div>
                               
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