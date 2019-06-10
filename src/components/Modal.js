import React, { Component } from 'react';
import DisplayLinks from './DisplayLinks.js'
import EmailForm from './EmailForm.js'

class Popup extends Component {
  constructor(){
    super();
    this.state {
      
    }
  }
  
  render() {
    return(
      <div>
        <p>Great! You've both selected your events!</p>
        <form action="">
          {/* closes the popup */}
          <button>Change Selection</button>
          {/* moves to next "screen" */}
          <button>Confirm Selection</button>
        </form>

        <DisplayLinks />
        <EmailForm />

      </div>
    ) 
  }
}

export default Popup