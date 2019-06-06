import React, { Component } from 'react';
import DateTimePicker from 'react-datetime-picker';

class SearchForm extends Component{



    render(){
        return (
            <div>
            <form action="#">
                <h1>SearchForm</h1>
                <div>
                    <label htmlFor="location">Please Enter a City Name:</label>
                    <input 
                    type="text" 
                    name="location"

                    // this onChange will not need name parameter bc it functions like js should
                    onChange={(event)=> {this.props.handleChange(event)}}
                    required={true}
                    value={this.props.location}/>
                </div>
                <div>
                    <label htmlFor="">Datetime Range Start</label>
                    <DateTimePicker
                  
                    // "dateTimeStart" is [name] and event returns the value for dateTimePicker
                    onChange={(event, name)=> {this.props.handleChange(event, "dateTimeStart")}}


                    required={true}
                    format="y-MM-dd HH:mm"

                    // name="dateTimeStart"
                    
                    // value is so this item will SHOW on screen
                    value={this.props.dateTimeStart}
                    />
                </div>
                <div>
                    <label htmlFor="time">Datetime Range End</label>
                    <DateTimePicker
 
                    onChange={(event, name)=> {this.props.handleChange(event, "dateTimeEnd")}}

                    required={true}
                    format="y-MM-dd HH:mm"
                    // name="dateTimeEnd"

                    
                    value={this.props.dateTimeEnd}
                    />
                </div>
                <button 
                onClick={this.props.onSubmit}>Submit</button>
            </form>
            </div>

        )
    }
}

export default SearchForm;