import React, { Component } from 'react';
import DatePicker from 'react-date-picker';
import TimePicker from 'react-time-picker';

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
            <div className="heroRight">
                <form action="#" className="heroRightForm">
                    <div className="heroRightFormComponent">
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
                    <div className="heroRightFormComponent">
                        <label htmlFor="">Which date?</label>
                        <DatePicker
                            onChange={(event, name)=> {this.props.handleChange(event, "date")}}
                            required={true}
                            format="y-MM-dd"
                            name="date"
                            value={this.props.date}
                        />
                    </div>
                    <div className="heroRightFormComponent">
                        <label>What time range?</label>
                        <div class="times">
                            <div className="time">
                                <label htmlFor="time">From</label>
                                <TimePicker
                                    onChange={(event, name)=> {this.props.handleChange(event, "timeStart")}}
                                    required={true}
                                    format="h:mm a"
                                    disableClock
                                    name="timeStart"
                                    value={this.props.timeStart}
                                />
                            </div>
                            <div className="time">
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
                    </div>
                    <div className="heroRightFormComponent">
                        <button onClick={this.props.onSubmit} className="toResults" to="toResults">Find Events</button>
                    </div>
                </form>
            </div>

        )
    }
}

export default SearchForm;