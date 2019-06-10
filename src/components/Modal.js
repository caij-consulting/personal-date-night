import React, { Component } from 'react';
// import DisplayLinks from './DisplayLinks.js'
// import EmailForm from './EmailForm.js'


// styles for modal inspired from https://www.youtube.com/watch?v=liF7puGjYA8
let modalStyles = {
  width: "500px",
  maxWidth: "100%",
  margin: "0 auto",
  position: "fixed",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%",
  zIndex: "999",
  backgroundColor: "green",
  padding: "10px 20px 40px",
  borderRadius: "8px",
  display: "flex",
  flexDirection: "column",
};


// need an overlay to have opacity and not allow clicking outside
let modalOverlay = {
  width: "100%",
  height: "100%",
  // background: "rgba(0, 0, 0, 0.3)",
  backgroundColor: "rgba(255, 255, 255, 0.3)",
  zIndex: "500"
};


let modalCloseButtonStyles = {
  marginBottom: "15px",
  padding: "3px 8px",
  cursor: "pointer",
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
          onClick={this.props.closeModal}>

          {/*  put a font awesome close style here. using an X for now */}
          X
          </button>
        <div>{this.props.children}</div>

        <div className="toLinks">

          <h2>Congratulations! You've successfully chosen your events!</h2>
          <p>You can buy your tickets here:</p>
          <p>User One: <a href={this.props.user1choice.url}>{this.props.user1choice.name}</a></p>
          <p>User Two: <a href={this.props.user2choice.url}>{this.props.user2choice.name}</a></p>
        </div>
        {/*    
          
        
        <DisplayLinks />
        <EmailForm />
*/}
      </div>
    );

    if (!this.props.modalIsOpen) {
      modal = null;
    }

    return (
      <div>
        {modal}
      </div>
    )
  }
}

export default Modal;


// <form action="">
//   {/* closes the popup */}
//   <button>Change Selection</button>
//   {/* moves to next "screen" */}
//   <button>Confirm Selection</button>
// </form>
