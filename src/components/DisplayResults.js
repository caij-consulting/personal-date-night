import React, { Component } from "react";
import ResultCard from "./ResultCard.js";
import Modal from "./Modal.js";
// Importing libraries
import { animateScroll as scroll, scroller } from "react-scroll";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

class DisplayResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allEvents: [],
      user1choice: "",
      user2choice: "",
      currentUser: "1",
      modalIsOpen: false,
      activeUser: false,
    }
    
    this.handleScroll = this.handleScroll.bind(this);
  }
  //function to fix the userSelection tab
  handleScroll() {
    this.setState({ scroll:
      window.scrollY 
      })
  }

  handleUserChangeRadio = (e) => {
    this.setState({
      //sets currentUser to be either User1 or User2 on toggle
      currentUser: e.target.value
    })
  }

  handleEventSelectRadio = (e, event) =>{
    if(this.state.currentUser==="1"){
      this.setState({
        user1choice: event,
      })
    }
    if (this.state.currentUser === "2") {
      this.setState({
        user2choice: event,
      })
    }
  }

  scrollLinks() {
    scroller.scrollTo("toLinks", {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart"
    })
  } 
  
  confirmBothUsersChoices = (e)=>{
    e.preventDefault();
    this.setState({
      modalIsOpen: true
    })
  }

  closeModal = (e) => {
    e.preventDefault();
    this.setState({
      modalIsOpen:false
    })
  }
  //code taken from https://mattgaskey.com/blog/sticky-nav-in-react/ to achieve scroll then fix
  componentDidMount(){
    const barToFix = document.querySelector(".containerUserSelectionBackground");
    this.setState({ top: barToFix.offsetTop, height: barToFix.offsetHeight });
    window.addEventListener("scroll", this.handleScroll);
  }
  //code taken from https://mattgaskey.com/blog/sticky-nav-in-react/ to achieve scroll then fix
  componentDidUpdate() {
    this.state.scroll > this.state.top ?
      document.body.style.paddingTop = `${this.state.height}px` :
      document.body.style.paddingTop = 0;
  }

  render() {
    return (
      <div className="displayEvents">
        <div className={this.state.scroll > this.state.top ? "containerUserSelectionBackground fixed-nav" : "containerUserSelectionBackground"}>
          <div className="wrapper">
            <form action="" className="containerUserSelection">
          
              <div className="containerUsers">
                <div className="user">
                  <div>
                    <input onChange={(e) => { this.handleUserChangeRadio(e) }}
                      type="radio"
                      className="selectedUser"
                      name="currentUser"
                      id="user1"
                      value="1"
                      aria-label="select for user one"
                      aria-required="true"
                      checked={this.state.currentUser === "1"}
                    />
                    <div className="perUserContents">
                      <FontAwesomeIcon icon="user" aria-hidden="true" />
                      <div>
                        <label htmlFor="user1">user one</label>
                        {this.state.user1choice ? <p>{this.state.user1choice.name} </p>: <p>Please choose an event from the list below</p>}
                      </div>
                    </div>
                  </div>
                </div>     

                <div className="user">
                  <div>
                    <input
                      onChange={(e) => { this.handleUserChangeRadio(e) }}
                      type="radio"
                      // tabIndex="0"
                      className="selectedUser"
                      name="currentUser"
                      id="user2"
                      value="2"
                      aria-label="select for user two"
                      aria-required="true"
                      checked={this.state.currentUser === "2"}
                    />

                    <div className="perUserContents">
                      <FontAwesomeIcon icon="user" aria-hidden="true" />
                      <div>
                        <label htmlFor="user2">user two</label>
                        {this.state.user2choice ? <p>{this.state.user2choice.name} </p> : <p>Please choose an event from the list below</p>}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="containerUsersButtons">
                {this.state.user1choice && this.state.user2choice
                ? <div>
                  <div className="containerButton">
                    <button className="navy med"
                      onClick={(e) => {
                        this.confirmBothUsersChoices(e)
                      }}
                      aria-label="Confirm choices of user one and user two"
                      >Confirm Both Events
                      <FontAwesomeIcon icon="check-double" aria-hidden="true" /> 
                    </button>
                  </div>

                    <Modal
                      user1choice={this.state.user1choice}
                      user2choice={this.state.user2choice}
                      modalIsOpen={this.state.modalIsOpen}
                      closeModal={(e) => this.closeModal(e)}
                    ></Modal>
                  </div>
                : ""}
                <div className="containerButton">
                  <button className="white med" aria-label="Reloads the page to start a new search" reset={this.reset}>New Search</button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="displayContent wrapper">
          <form action="submit">
            <div className="containerFilterEvents">
              <div className="filterFields">
                <label className="visuallyHidden" htmlFor="textFilter">Enter text to filter</label>
                <input
                  type="text"
                  onChange={(e) => { this.props.handleChange(e) }}
                  name="textFilter"
                  value={this.props.textFilter}
                  placeholder="Enter text to filter"
                  aria-label="Enter text to filter events"
                  />
                <label className="visuallyHidden" htmlFor="allCategories">Event Categories</label>
                <select
                  onChange={(e) => { this.props.handleChange(e) }}
                  name="categoryDropdown" 
                  value={this.props.categoryDropdown}
                  id="allCategories">
                  {this.props.eventCategories.map((category, i) => {
                    return (
                        <option value={category} key={i}> {category} </option>
                    )
                    }
                  )}
                </select>
                
                <label className="visuallyHidden" htmlFor="allVenues">All Venues</label>
                <select
                  onChange={(e) => { this.props.handleChange(e) }}
                  name="venueDropdown"
                  value={this.props.venueDropdown}
                  id="allVenues">
                  {this.props.eventVenues.map((venue, i) => {
                    return (
                      <option value={venue} key={i}> {venue} </option>
                    )
                  })}
                </select>
              </div>

              <div className="filterButtons">
                <button className="green small"
                  onClick={(e) => this.props.filterEvents(e, this.props.textFilter, this.props.categoryDropdown, this.props.venueDropdown)}>Filter</button>  
                <button className="white small" onClick={(e)=>this.props.resetFilters(e)}>Reset Filter</button>
              </div>
            </div>
          </form>
        
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
                tabIndex="0"
                currentUser={this.state.currentUser}
              />
            )
          })}

          </div>
        </div>
      </div>
    )
  }
}

export default DisplayResults;