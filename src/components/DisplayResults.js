import React, { Component } from 'react';
import ResultCard from "./ResultCard.js";

class DisplayResults extends Component {
    constructor() {
        super();
        this.state = {
            allEvents: [],
            user1choice: "",
            user2choice: "",
            currentUser: "1",
        }
    }

    handleUserChangeRadio = (e) => {
        this.setState({
            //sets currentUser to be either User1 or User2 on toggle
            currentUser: e.target.value
        })
    }
    handleEventSelectRadio = (e, eventID) =>{
        e.preventDefault()
        console.log(e)
        if(this.state.currentUser==="1"){
            this.setState({
                user1choice: eventID,
            })
        }
        if (this.state.currentUser === "2") {
            this.setState({
                user2choice: eventID,
            })
        }
    }

    render() {
        return (
                <div className="displayEvents">
                    <div className="displayContent wrapper">
                        {/* errorhandling here : write a condition if city name is found in API, do below. else "Please enter a valid city name and date/time range*/}
                        <form action="submit">
                        {/*wrote submit bc this attribute usually works with backend*/}
                            <label htmlFor="textFilter">Enter Text to Filter</label>
                            <input
                                type="text"
                                onChange={(e) => { this.props.handleChange(e) }}
                                name="textFilter"
                                value={this.props.textFilter} />
                            <label htmlFor="allCategories">Event Categories</label>
                            <select
                                onChange={(e) => { this.props.handleChange(e) }}
                                name="categoryDropdown" 
                                value={this.props.categoryDropdown}
                                id="">
                                {this.props.eventCategories.map((category) => {
                                    return (
                                        <option value={category}> {category} </option>
                                    )
                                })}
                            </select>

                            <select
                                onChange={(e) => { this.props.handleChange(e) }}
                                name="venueDropdown"
                                value={this.props.venueDropdown}
                                id="">
                                {this.props.eventVenues.map((venue) => {
                                    return (
                                        <option value={venue}> {venue} </option>
                                    )
                                })}
                            </select>
                            <button
                                onClick={(e) => this.filterEvents(e, this.props.textFilter, this.props.categoryDropdown, this.props.venueDropdown)}>Filter</button>  
                            <button
                                reset={this.reset}>Reset</button>          
                        </form>
                        <form action="">
                            <div className="user">
                                <label htmlFor="user1">User 1</label>
                                <input onChange={(e) => { this.handleUserChangeRadio(e) }}
                                    type="radio"
                                    name="currentUser"
                                    id="user1"
                                    value="1"
                                    checked={this.state.currentUser === "1"}
                                    />
                            </div>
                            <div className="user">
                                <label htmlFor="user2">User 2</label>
                                <input 
                                    onChange={(e) => { this.handleUserChangeRadio(e) }}
                                    type="radio"
                                    name="currentUser"
                                    id="user2"
                                    value="2"
                                    checked={this.state.currentUser === "2"}
                                    />
                            </div>
                        </form> 
                        {
                        this.props.filteredEvents.map((eventObject) => {
                            return (
                                    <ResultCard
                                        key={eventObject.id}
                                        name={eventObject.name}
                                        startDate={eventObject.dates.start.localDate}
                                        startTime={eventObject.dates.start.localTime}
                                        image={eventObject.images[1].url}
                                        location={eventObject._embedded.venues[0].city.name}
                                        id={eventObject.id}
                                        handleEventSelectRadio={this.handleEventSelectRadio}
                                        user1Choice={this.state.user1Choice}
                                        user2Choice={this.state.user2Choice}
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