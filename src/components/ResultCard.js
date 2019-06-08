import React, { Component } from 'react';

class ResultCard extends Component {
    constructor() {
        super();
        this.state = {
            eventID : ""
        }
    }

    // componentWillUpdate(prevProps){
    //     // console.log(prevProps.user1Choice)
    //     // console.log(this.props.user1Choice)
    //     if(prevProps.user1Choice !== this.props.user1Choice){
    //         console.log(prevProps)
    //         this.setState({
    //             eventID: this.props.user1Choice
    //         })
    //     }
    //     else if (prevProps.user2Choice !== this.props.user2Choice) {
    //         this.setState({
    //             eventID: this.props.user2Choice
    //         })
    //     }
    // }

    radioChoiceChange = (prevProps) => {
        // console.log(prevProps.user1Choice)
        // console.log(this.props.user1Choice)
        if (prevProps.user1Choice !== this.props.user1Choice) {
            console.log(prevProps)
            this.setState({
                eventID: this.props.user1Choice
            })
        }
        else if (prevProps.user2Choice !== this.props.user2Choice) {
            this.setState({
                eventID: this.props.user2Choice
            })
        }
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
                <label htmlFor="selectedEvent"></label>
                <input  type="radio" 
                        id={this.props.id} 
                        name={this.props.name}
                        // onChange={(e) => this.props.handleEventSelectRadio(e, this.props.id)}

                        radioChoiceChange={this.radioChoiceChange}

                        onChange={(e) => this.props.handleEventSelectRadio(e, this.props.id)}
                        // checked={this.props.id === this.props.user1Choice || this.props.id === this.props.user2Choice}
                />
            </div>
            
        )
    }
}
export default ResultCard;