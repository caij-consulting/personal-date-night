import React, { Component } from 'react';
import DisplayLinks from './DisplayLinks.js';

class Modal extends Component {
  render() {
    let modal = (
      <div className="modalOverlay">
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
