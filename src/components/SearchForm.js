import React, { Component } from 'react';
import DateTimePicker from 'react-datetime-picker';

class SearchForm extends Component{

    
    render(){
        return (
            <div>
            <form action="#">
                <h1>SearchForm</h1>
                <div>
                    <label htmlFor="Location">Please Enter a City Name:</label>
                    <input 
                    type="text" 
                    name="Location"
                    onChange={this.props.handleLocationChange}
                    required={true}
                    value={this.props.location}/>
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