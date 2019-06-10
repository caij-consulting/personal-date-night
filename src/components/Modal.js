import React, { Component } from 'react';
// import DisplayLinks from './DisplayLinks.js'
// import EmailForm from './EmailForm.js'


let modalStyles = {
  width: "500px",
  maxWidth: "100%",
  margin: "0 auto",
  position: "fixed",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%",
  zIndex: "999",
  backgroundColor: "#eee",
  padding: "10px 20px 40px",
  borderRadius: "8px",
  display: "flex",
  flexDirection: "column",
}


let modalCloseButtonStyles = {
  marginBottom: "15px",
  padding: "3px 8px",
  cursor: "pointer",
  borderRadius: "50%",
  border: "1px black solid",
  width: "30px",
  height: "30px",
  fontWeight: "bold",
  alignSelf: "flex-end"
};

class Modal extends Component {
  // constructor(){
  //   super();
  //   this.state {
      
  //   }
  // }


  
  render() {
    let modal = (
      <div style={modalStyles}>
        <button 
          style={modalCloseButtonStyles}
          onClick={this.props.onClose}>X</button>
        <div>{this.props.children}</div>

        <p>Great! You've both selected your events!</p>
        <form action="">
          {/* closes the popup */}
          <button>Change Selection</button>
          {/* moves to next "screen" */}
          <button>Confirm Selection</button>
        </form>
        {/*         
        <DisplayLinks />
        <EmailForm />
*/}
      </div>
    );

    // if (!this.props.modalIsOpen) {
    //   modal = null;
    // }

    return(
      <div>
        {modal}
      </div>
    ) 
  }
}

export default Modal;