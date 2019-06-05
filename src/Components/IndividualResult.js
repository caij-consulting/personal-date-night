import React, { Component } from 'react';

class IndividualResult extends Component {
    render() {
        return (
            <div>
                <h3>{this.props.name}</h3>
                <p>{this.props.startDate}</p>
                <p>{this.props.startTime}</p>
                <img src={this.props.image} alt=""/>
            </div>
            
        )
    }
}
export default IndividualResult;