import React, { Component } from './node_modules/react';

class SearchForm extends Component{

    
    render(){
        return (
            <div>
            <form action="#">
                <h1>SearchForm</h1>
                <div>
                    <label htmlFor="location"></label>
                    <select name="location" id="location">
                        <option disabled defaultValue> -- Select a Location -- </option>
                        <option value="toronto">Toronto</option>
                        {/* can add more locations if needed */}
                    </select>
                </div>
                <div>
                    <label htmlFor="date"></label>
                    <select name="date" id="date">
                        <option disabled defaultValue> -- Select a Date -- </option>
                        {/* calendar here */}
                    </select>
                </div>
                <div>
                    <label htmlFor="time"></label>
                    <select name="time" id="time">
                        <option disabled defaultValue> -- Select a Time -- </option>
                        {/* this can be a clock */}
                    </select>
                </div>
                <button>Submit</button>
            </form>
            </div>

        )
    }
}

export default SearchForm;