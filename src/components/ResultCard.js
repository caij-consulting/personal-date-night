import React, { Component } from 'react';

class ResultCard extends Component {
    
    render() {
        return (
            <div>
                <h3>{this.props.name}</h3>
                <h3>{this.props.location}</h3>
                <p>{this.props.startDate}</p>
                <p>{this.props.startTime}</p>
                <img src={this.props.image} alt=""/>
                <label htmlFor="selectedEvent"></label>
                <input type="radio" id="selectedEvent" name="selectedEvent" />
            </div>
            
        )
    }
}
export default ResultCard;