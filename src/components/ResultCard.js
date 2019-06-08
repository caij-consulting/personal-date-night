import React, { Component } from 'react';

class ResultCard extends Component {
    
    render() {
        return (
            <div className="resultCard">
                <h3>{this.props.name}</h3>
                <h3>{this.props.location}</h3>
                <p>{this.props.startDate}</p>
                <p>{this.props.startTime}</p>
                <div className="resultCard-imgContainer">
                    <img src={this.props.image} alt=""/>
                </div>
                <label htmlFor="selectedEvent"></label>
                <input type="radio" id="selectedEvent" name="selectedEvent" />
            </div>
            
        )
    }
}
export default ResultCard;