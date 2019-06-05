import React, { Component } from 'react';
import DateTimePicker from 'react-datetime-picker';

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
                    <label htmlFor="">Datetime Range Start</label>
                    <DateTimePicker
                    onChange={this.props.handleChange1}
                    required={true}
                    format="y-MM-dd HH:mm"
                    value={this.props.dateTimeStart}/>
                </div>
                <div>
                    <label htmlFor="time">Datetime Range End</label>
                    <DateTimePicker
                    onChange={this.props.handleChange2}
                    required={true}
                    format="y-MM-dd HH:mm"
                    value={this.props.dateTimeEnd}/>
                </div>
                <button 
                onClick={this.props.onSubmit}>Submit</button>
            </form>
            </div>

        )
    }
}

export default SearchForm;