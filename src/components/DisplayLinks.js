import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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

class DisplayLinks extends Component {

  render() {
    return(
      <div className="toLinks" style={modalStyles} tabIndex="-1">

      <button
          style={modalCloseButtonStyles}
          onClick={this.props.closeModal}
          aria-label="click to close the modal">

          {/*  put a font awesome close style here. using an X for now */}
          <FontAwesomeIcon aria-hidden="true" aria-label="close the box" icon="times-circle" />
      </button>
        <div>{this.props.children}</div>

        <h2>Congratulations! You've successfully chosen your events!</h2>
        <p>You can buy your tickets here:</p>
        <p>User One: <a href={this.props.user1choice.url}>{this.props.user1choice.name}</a> Copy URL: <FontAwesomeIcon aria-hidden="true" icon="copy" aria-label="click to copy event link" /></p>
        <p>User Two: <a href={this.props.user2choice.url}>{this.props.user2choice.name}</a> Copy URL: <FontAwesomeIcon aria-hidden="true" icon="copy" aria-label="click to copy event link" /></p>
      </div>
    );
  }
}

export default DisplayLinks;