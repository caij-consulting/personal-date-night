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
        if(nextProps.user1choice !==prevState.eventName1){
            return {eventName1 : nextProps.user1choice};
            
        }
        else if (nextProps.user2choice !== prevState.eventName2){
            return { eventName2: nextProps.user2choice };
        }
        else return null;
    }

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
                <form action="">
                    <label htmlFor="selectedEvent"></label>
                    <input  type="radio" 
                            id={this.props.id} 
                            name={this.props.name}
                            onChange={(e) => this.props.handleEventSelectRadio(e, this.props.name)}
                            checked={this.props.name === this.state.eventName1 || this.props.name === this.state.eventName2}
                    />
                </form>
            </div>
            
        )
    }
}
export default ResultCard;