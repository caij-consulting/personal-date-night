import React, { Component } from './node_modules/react';

class IndividualResult extends Component {
    render() {
        return (
            <div>
                <h3>{this.props.name}</h3>
                <p>{this.props.startDate}</p>
            </div>
            
        )
    }
}
export default IndividualResult;