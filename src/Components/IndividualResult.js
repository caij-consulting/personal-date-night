import React, { Component } from 'react';

class IndividualResult extends Component {
    render() {
        return (
            <div>
                <h3>{this.props.name}</h3>
                <p>{this.props.dates.start.localDate}</p>
            </div>
            
        )
    }
}
export default IndividualResult;