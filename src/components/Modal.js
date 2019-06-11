import React, { Component } from 'react';
import DisplayLinks from './DisplayLinks.js';


// need an overlay to have opacity and not allow clicking outside
let modalOverlay = {
  width: "100%",
  height: "100%",
  // background: "rgba(0, 0, 0, 0.3)",
  backgroundColor: "rgba(255, 255, 255, 0.3)",
  zIndex: "500",
  position: "absolute",
  top: "0",
  left: "0",
  right: "0",
  bottom: "0",
};

class Modal extends Component {
  render() {
    let modal = (
      <div aria-hidden="true"style={modalOverlay}>
        <DisplayLinks 
          user1choice={this.props.user1choice}
          user2choice={this.props.user2choice}
          closeModal={this.props.closeModal}
        />
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
