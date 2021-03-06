import React, { Component } from "react";
// importing libraries
import DatePicker from "react-date-picker";
import TimePicker from "react-time-picker";

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
            <label className="heroFormLabelMain" htmlFor="location">Which city are you searching in?</label>
            <div className="HeroFormInputContainer">
              <input 
              type="text" 
              name="location"
              required pattern="[a-zA-Z\s]*"
              onChange={(e)=> {this.props.handleChange(e)}}
              value={this.props.location}
              />
            </div>
          </div>

          <div className="heroFormBlock">
            <label className="heroFormLabelMain">Which date?</label>
            <div className="HeroFormInputContainer">
              <DatePicker
                onChange={(e, name)=> {this.props.handleChange(e, "date")}}
                format="y-MM-dd"
                name="date"
                value={this.props.date}
                required={true}
                minDate={new Date()}
            />
            </div>
          </div>

          <div className="heroFormBlock">
            <label className="heroFormLabelMain">What time range?</label>
            <div>
              <div>
                <div className="heroFormBlockTime">
                  <div className="perTimeContainer">
                    <label htmlFor="time">From</label>
                    <TimePicker
                      format="h:mm a"
                      name="timeStart"
                      onChange={(e, name)=> {this.props.handleChange(e, "timeStart")}}
                      value={this.props.timeStart}
                      disableClock
                      required={true}
                    />
                  </div>
                  <div className="perTimeContainer">
                    <label htmlFor="time">Until</label>
                    <TimePicker
                      format="h:mm a"
                      name="timeEnd"
                      minTime={this.addOneHourToTime(this.props.timeStart)}
                      onChange={(e, name)=> {this.props.handleChange(e, "timeEnd")}}
                      value={this.props.timeEnd}
                      disableClock
                      required={true}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="heroFormBlock">
            <button onClick={this.props.onSubmit} className="resultsTop green large" to="resultsTop">find events</button>
          </div>
        </form>
        
      </div>
    )
  }
}

export default SearchForm;