import React, { Component } from 'react';

class DisplayResults extends Component{
    constructor() {
        super();
        this.state = {
            allEvents: [],
        }
    }
    
    componentDidMount(){
        this.setState({
            allEvents: this.props.events
        })
        console.log(this.state.allEvents)
    }

    render(){
        return (
            <h2>Here are the results:</h2>            
        )
    }
}
export default DisplayResults;