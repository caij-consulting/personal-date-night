import React, { Component } from 'react';
import ResultCard from "./ResultCard.js";
import { animateScroll as scroll, scroller } from 'react-scroll';
import DisplayLinks from './DisplayLinks.js';

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
  handleEventSelectRadio = (e, eventName) =>{
    // e.preventDefault()
    console.log(e)
    if(this.state.currentUser==="1"){
      this.setState({
        user1choice: eventName,
      })
    }
    if (this.state.currentUser === "2") {
      this.setState({
        user2choice: eventName,
      })
    }
  }
  scrollLinks() {
    scroller.scrollTo('toLinks', {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart'
    })
  } 
  
  confirmClick = (e)=>{
    e.preventDefault();
    this.scrollLinks();
  }

  render() {
    return (
      <div className="displayEvents">
        <form action="" className="containerUserSelection">
          <div className="containerUsers">
            <div className="user">
                <label htmlFor="user1">user one</label>
                <input onChange={(e) => { this.handleUserChangeRadio(e) }}
                  type="radio"
                  name="currentUser"
                  id="user1"
                  value="1"
                  checked={this.state.currentUser === "1"}
                />
                <p>{this.state.user1choice.name}</p>
              </div>

              <div className="user">
                <label htmlFor="user2">user two</label>
                <input
                  onChange={(e) => { this.handleUserChangeRadio(e) }}
                  type="radio"
                  name="currentUser"
                  id="user2"
                  value="2"
                  checked={this.state.currentUser === "2"}
                />
                <p>{this.state.user2choice.name}</p>
              </div>
          </div>
          
          <div className="containerUsersButtons">
            {this.state.user1choice && this.state.user2choice
              ? <button className="navy med" onClick={e => this.confirmClick(e)}>Confirm Both Events</button>
              : ""} <button className="white med" reset={this.reset}>New Search</button>           
          </div>
        </form>

        <div className="displayContent">
          <div className="containerFilterEvents">
            <form action="submit">
              <label className="visuallyHidden" htmlFor="textFilter">Enter text to filter</label>
              <input
                type="text"
                onChange={(e) => { this.props.handleChange(e) }}
                name="textFilter"
                value={this.props.textFilter}
                placeholder="Enter text to filter" />
              <label className="visuallyHidden" htmlFor="allCategories">Event Categories</label>
              <select
                onChange={(e) => { this.props.handleChange(e) }}
                name="categoryDropdown" 
                value={this.props.categoryDropdown}
                id="">
                {this.props.eventCategories.map((category) => {
                  return (
                      <option value={category}> {category} </option>
                  )
                  }
                )}
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
              <button className="green small"
                onClick={(e) => this.props.filterEvents(e, this.props.textFilter, this.props.categoryDropdown, this.props.venueDropdown)}>Filter</button>  
              <button className="white small" onClick={(e)=>this.props.resetFilters(e)}>Reset Filter</button>          
            </form>
          </div>
        
          <div className="containerResultCard"> 
          {
          this.props.filteredEvents.map((eventObject) => {
            return (
              <ResultCard
                key={eventObject.id}
                event={eventObject}
                handleEventSelectRadio={this.handleEventSelectRadio}
                user1choice={this.state.user1choice}
                user2choice={this.state.user2choice}
              />
            )
          })}

          </div>
          <DisplayLinks 
            user1choice={this.state.user1choice}
            user2choice={this.state.user2choice}
          />

        </div>
      </div>
    )
  }
}
export default DisplayResults;