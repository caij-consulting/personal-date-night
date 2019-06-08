import React, { Component } from 'react';
import DatePicker from 'react-date-picker';
import TimePicker from 'react-time-picker'
import DateTimePicker from 'react-datetime-picker';

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
                    <label htmlFor="">Date</label>
                    <DatePicker
                    onChange={(event, name)=> {this.props.handleChange(event, "date")}}
                    required={true}
                    format="y-MM-dd"
                    name="date"
                    value={this.props.date}
                    />
                </div>
                <div>
                    <label htmlFor="time">Time Range Start</label>
                    <TimePicker
                    onChange={(event, name)=> {this.props.handleChange(event, "timeStart")}}
                    required={true}
                    // format="HH:mm"
                    format="h:mm a"
                    disableClock

                    name="timeStart"
                    value={this.props.timeStart}
                    />
                </div>
                <div>
                    <label htmlFor="time">Time Range End</label>
                    <TimePicker
                    onChange={(event, name)=> {this.props.handleChange(event, "timeEnd")}}
                    required={true}
                    // format="HH:mm"

                    format="h:mm a"
                    disableClock
                    name="timeEnd"
                    value={this.props.timeEnd}
                    minTime={this.addOneHourToTime(this.props.timeStart)}
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