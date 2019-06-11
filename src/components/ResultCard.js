import React, { Component } from 'react';

class ResultCard extends Component {
  constructor() {
    super();
    this.state = {
        eventId1: "",
        eventId2: ""
    }
  }
  priceInfo = (event) => {
    let priceString = "";
    if (event.priceRanges){
      let minPrice = event.priceRanges[0].min;
      let maxPrice = event.priceRanges[0].max;
      let currency = event.priceRanges[0].currency;
      if (minPrice === maxPrice){
        priceString = `Price: ${minPrice} ${currency}`
      }
      else{
        priceString = `Price Range: ${minPrice} - ${maxPrice} ${currency}`
      }
    }
    else{
      priceString = `Price: N/A`
    }
    return priceString
  }
  displayDate = (event) =>{
    let daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    let monthsOfYear =['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    if (event.dates.start.localTime){
      let dateObj = new Date(`${event.dates.start.localDate}T${event.dates.start.localTime}`)
      let day = dateObj.getDay();
      let date = dateObj.getDate();
      let month = dateObj.getMonth();
      let hour = dateObj.getHours();
      let minute = dateObj.getMinutes();
      if (minute < 10){
        minute = '0' + minute;
      }
      let ampm = "";
      if (hour < 12){
        ampm = "AM";
      }
      if(hour = 12){
        ampm = "PM";
        hour = 12
      }
      else{
        ampm = "PM";
        hour = hour - 12
      }
      let dateToDisplay = `${daysOfWeek[day]}, ${monthsOfYear[month]} ${date}, ${hour}:${minute} ${ampm}`
      return dateToDisplay;

    }
    else{
      let dateObj = new Date(`${event.dates.start.localDate}T00:00:00`);
      let day = dateObj.getDay();
      let date = dateObj.getDate();
      let month = dateObj.getMonth();
      let dateToDisplay = `${daysOfWeek[day]}, ${monthsOfYear[month]} ${date}`
      return dateToDisplay;
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.user1choice.id !== prevState.eventId1) {
      return { eventId1: nextProps.user1choice.id };

    }
    else if (nextProps.user2choice.name !== prevState.eventName2) {
      return { eventId2: nextProps.user2choice.id };
    }
    else return null;
  }
  render() {
    this.displayDate(this.props.event)
    return (
      <form action="" className="resultCard">
        <label htmlFor="selectedEvent"></label>
        <input 
          type="radio"
          tabIndex="0" 
          id={this.props.event.id} 
          name={this.props.name}
          onChange={(e) => this.props.handleEventSelectRadio(e, this.props.event)}
          checked={this.props.event.id === this.state.eventId1 || this.props.event.id === this.state.eventId2}
        />
        <div>
          <div className="resultCard-imgContainer">
            <img src={this.props.event.images[1].url} alt={`image for ${this.props.event.name}`}/>
          </div>
          <div className="eventDetails">
            <h3>{this.props.event.name}</h3>
            <p>{this.displayDate(this.props.event)}</p>
            <p className="location">{this.props.event._embedded.venues[0].name}, {this.props.event._embedded.venues[0].city.name}</p>
            <p className="priceString">{this.priceInfo(this.props.event)}</p>
          </div>
        </div>
      </form>

        
    )
  }
}
export default ResultCard;