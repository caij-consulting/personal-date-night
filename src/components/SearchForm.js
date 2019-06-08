import React, { Component } from 'react';
import DatePicker from 'react-date-picker';
import TimePicker from 'react-time-picker'
// import DateTimePicker from 'react-datetime-picker';

class SearchForm extends Component{
    //error handling function. if startTime is "10:00", make sure the endTime is atleast "11:00"
    addOneHourToTime = (time) => {
        if(time){
            let hour = parseInt(time.substr(0,2),10)
            if (hour >= 23){
                hour = "00"
            }
            else{
                hour = hour+1;
                if (hour<10){
                    hour = `0`+hour;
                }
            }
            let minute=parseInt(time.substr(3,5),10);
            if (minute<10){
                minute = `0`+ minute;
            }
            
            let newTime=`${hour}:${minute}`;
            
            return newTime
        }
    }

    render(){
        return (
            <div>
            <form action="#">
                <h2>Search Form</h2>
                <div>
                    <label htmlFor="location">Which city are you searching in?</label>
                    <input 
                    type="text" 
                    name="location"
                    required pattern="[a-zA-Z]*"
                    onChange={(event)=> {this.props.handleChange(event)}}
                    required={true}
                    value={this.props.location}
                    />
                </div>
                <div>
                    <label htmlFor="">Which date?</label>
                    <DatePicker
                        onChange={(event, name)=> {this.props.handleChange(event, "date")}}
                        required={true}
                        format="y-MM-dd"
                        name="date"
                        value={this.props.date}
                    />
                </div>
                <div>
                    <legend>What time range?</legend>
                    <div>
                        <label htmlFor="time">From</label>
                        <TimePicker
                            onChange={(event, name)=> {this.props.handleChange(event, "timeStart")}}
                            required={true}
                            format="h:mm a"
                            disableClock
                            name="timeStart"
                            value={this.props.timeStart}
                        />
                        <label htmlFor="time">Until</label>
                        <TimePicker
                            onChange={(event, name)=> {this.props.handleChange(event, "timeEnd")}}
                            required={true}
                            format="h:mm a"
                            disableClock
                            name="timeEnd"
                            value={this.props.timeEnd}
                            minTime={this.addOneHourToTime(this.props.timeStart)}
                        />
                    </div>
                </div>
                <button onClick={this.props.onSubmit}>Find Events</button>
            </form>
            </div>

        )
    }
}

export default SearchForm;