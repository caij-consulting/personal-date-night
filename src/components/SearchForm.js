import React, { Component } from 'react';
import DateTimePicker from 'react-datetime-picker';

class SearchForm extends Component{
    // constructor() {
    //     super();
    //     this.state = {
    //         dateTimeStart: new Date(),
    //         dateTimeEnd: new Date(),
    //     }
    // }
    
    // onChange = date => this.setState({ date })


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
                    onChange={(event)=> {this.props.handleChange(event)}}
                    required={true}
                    value={this.props.location}/>
                </div>
                <div>
                    <label htmlFor="">Datetime Range Start</label>
                    <DateTimePicker
                    // onChange={this.props.handleChange1}
                    // onChange={(event)=> {this.props.handleChange(event)}}
                    onChange={(event)=> {this.props.handleChange(event)}}
                    // onChange={this.onChange}
                    // value={this.state.date}

                    required={true}
                    format="y-MM-dd HH:mm"

                    name="dateTimeStart"
                    value={this.props.dateTimeStart}/>
                </div>
                <div>
                    <label htmlFor="time">Datetime Range End</label>
                    <DateTimePicker
                    // onChange={this.props.handleChange2}

                    onChange={(event)=> {this.props.handleChange(event)}}
// SHOULD WORK BC NAME: value but upon selection of datetimepicker it refreshes?

                    // onChange={this.onChange}
                    // value={this.state.date}


                    required={true}
                    format="y-MM-dd HH:mm"
                    name="dateTimeEnd"
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