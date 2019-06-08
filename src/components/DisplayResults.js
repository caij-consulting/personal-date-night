import React, { Component } from 'react';
import axios from 'axios';
import ResultCard from "./ResultCard.js";

class DisplayResults extends Component {
    constructor() {
        super();
        this.state = {
            allEvents: [],
            user1: {},
            user2: {},
            currentUser: "1",
            // current user has been selected in App.js
            // App.js passes info to DisplayResults
            //match value to user1 or 
        }
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


    handleChangeRadio = (event) => {
            this.setState({
                //sets currentUser to be either User1 or User2 on toggle
                currentUser: event.target.value
            })
        }

    render() {
        return (
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