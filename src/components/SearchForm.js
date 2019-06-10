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
      <div className="heroForm">

        <form action="#">
          <div className="heroFormBlock">
            <label htmlFor="location">Which city are you searching in?</label>
            <div className="HeroFormInputContainer">
              <input 
              type="text" 
              name="location"
              required pattern="[a-zA-Z]*"
              onChange={(e)=> {this.props.handleChange(e)}}
              value={this.props.location}
              required
              />
            </div>
          </div>

          <div className="heroFormBlock">
            <label htmlFor="">Which date?</label>
            <div className="HeroFormInputContainer">
              <DatePicker
                onChange={(e, name)=> {this.props.handleChange(e, "date")}}
                format="y-MM-dd"
                name="date"
                value={this.props.date}
                required
              />
            </div>
          </div>

          <div className="heroFormBlock">
            <label>What time range?</label>
            <div>
              <div className="HeroFormInputContainer">
                <div className="heroFormBlockTime">
                  <div>
                    <label htmlFor="time">From</label>
                    <TimePicker
                      format="h:mm a"
                      name="timeStart"
                      onChange={(e, name)=> {this.props.handleChange(e, "timeStart")}}
                      value={this.props.timeStart}
                      disableClock
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="time">Until</label>
                    <TimePicker
                      format="h:mm a"
                      name="timeEnd"
                      minTime={this.addOneHourToTime(this.props.timeStart)}
                      onChange={(e, name)=> {this.props.handleChange(e, "timeEnd")}}
                      value={this.props.timeEnd}
                      disableClock
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="heroFormBlock">
            <button onClick={this.props.onSubmit} className="resultsTop btn" to="resultsTop">find events</button>
          </div>
        </form>
        
      </div>
    )
  }
}

export default SearchForm;