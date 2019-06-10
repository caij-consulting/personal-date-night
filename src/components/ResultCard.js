import React, { Component } from 'react';

class ResultCard extends Component {
  constructor() {
    super();
    this.state = {
        eventName1: "",
        eventName2: ""
    }
  }

  static getDerivedStateFromProps(nextProps, prevState){
    if(nextProps.user1choice.name !==prevState.eventName1){
        return {eventName1 : nextProps.user1choice.name};
        
    }
    else if (nextProps.user2choice.name !== prevState.eventName2){
        return { eventName2: nextProps.user2choice.name };
    }
    else return null;
  }
  priceInfo = (event) => {
    let priceString = "";
    if (event.priceRanges){
      let minPrice = event.priceRanges[0].min;
      console.log(minPrice)
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

  render() {
    return (
        <div className="resultCard">
          <div className="resultCard-imgContainer">
            <img src={this.props.event.images[1].url} alt=""/>
          </div>
          <h3>{this.props.event.name}</h3>
          <p>{this.props.event.dates.start.localDate}, {this.props.event.dates.start.localTime}</p>
          <p className="location">{this.props.event._embedded.venues[0].name}, {this.props.event._embedded.venues[0].city.name}</p>
          <p className="priceString">{this.priceInfo(this.props.event)}</p>
          <form action="">
            <label htmlFor="selectedEvent"></label>
            <input 
              type="radio" 
              id={this.props.event.id} 
              name={this.props.name}
              onChange={(e) => this.props.handleEventSelectRadio(e, this.props.event)}
              checked={this.props.event.name === this.state.eventName1 || this.props.event.name === this.state.eventName2}
            />
          </form>
        </div>
        
    )
  }
}
export default ResultCard;