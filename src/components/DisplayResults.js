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
            eventCategories: [],
            userCategory: "",
            eventVenues: [],
            userVenue: "",
            user1: {},
            user2: {},
            currentUser: "1",
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
        this.setState({
            allEvents: [],
            filteredEvents: [],
            isLoading: true,
            eventCategories: [],
            userCategory: "",
            eventVenues: [],
            userVenue: "",
        })
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
            // console.log(allEvents)
            this.setState({
                // allEvents is the good return we never modify
                allEvents: response,
                // filteredEvents is it item we want to modify based on user input
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
                if (categoryDropdown==="All Categories"){
                    return true;
                }
                else{
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
    // default is user one
    // which is the selected
    // current user will = user1
    handleChangeRadio = (event) => {
            this.setState({
                currentUser: event.target.value
            })
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

    // trying to clear field
    // reset = (e) => {
    //     e.preventDefault();
    //     this.setState({ 
    //         allEvents: [],
    //         filteredEvents: [],
    //         isLoading: true,
    //         eventCategories: [],
    //         userCategory: "",
    //         eventVenues: [],
    //         userVenue: "",
    //     })
    //     this.getTicketmasterData(location, startDateTime, endDateTime);  
    // }



    render() {
        return (
            this.state.isLoading ? <h1>Getting Your Events...</h1> :

                <div className="display-events">
                    <div className="display-content">
                        {/* errorhandling here : write a condition if city name is found in API, do below. else "Please enter a valid city name and date/time range*/}
                        <form action="submit">
                        {/*wrote submit bc this attribute usually works with backend*/}
                            <label htmlFor="textFilter">Enter Text to Filter</label>
                            <input
                                type="text"
                                required={true}

                                onChange={(event) => { this.props.handleChange(event) }}
                                name="textFilter"
                                value={this.props.textFilter} />


                            <label htmlFor="allCategories">Event Categories</label>
                            <select
                                onChange={(event) => { this.props.handleChange(event) }}
                                name="categoryDropdown" 
                                value={this.props.categoryDropdown}
                                id="">
                                {this.state.eventCategories.map((category) => {
                                    return (
                                        <option value={category}> {category} </option>
                                    )
                                })}
                            </select>

                            <select
                                onChange={(event) => { this.props.handleChange(event) }}
                                name="venueDropdown"
                                value={this.props.venueDropdown}
                                id="">
                                {this.state.eventVenues.map((venue) => {
                                    return (
                                        <option value={venue}> {venue} </option>
                                    )
                                })}
                            </select>
                            <button
                                onClick={(e) => this.filterEvents(e, this.props.textFilter, this.props.categoryDropdown, this.props.venueDropdown)}>Filter</button>     
                                
                            <button 
                                reset={this.reset}>Clear</button>
                        </form>
                        <form action="">
                            <div className="user">
                                <label htmlFor="user1">User 1</label>
                                <input onChange={(event) => { this.handleChangeRadio(event) }}
                                    type="radio"
                                    name="currentUser"
                                    id="user1"
                                    checked={this.state.currentUser === "1"}
                                    value="1" />
                            </div>
                            <div className="user">
                                <label htmlFor="user2">User 2</label>
                                <input onChange={(event) => { this.handleChangeRadio(event) }}
                                    type="radio"
                                    name="currentUser"
                                    id="user2"
                                    checked={this.state.currentUser === "2"}
                                    value="2" />
                            </div>
                        </form> 
                        {
                        this.state.filteredEvents.map((eventObject) => {
                            return (
                                <div>
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