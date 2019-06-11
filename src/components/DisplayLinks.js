import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class DisplayLinks extends Component {

  render() {
    return(
      // <div className="toLinks" style={modalStyles}>
      <div className="toLinks modalStyles">
      <button
          className="modalCloseButtonStyles"
          onClick={this.props.closeModal}>

          {/*  put a font awesome close style here. using an X for now */}
          <FontAwesomeIcon aria-hidden="true" icon="times-circle" />
      </button>
        <div>{this.props.children}</div>

        <h2>Congratulations! You've successfully chosen your events!</h2>
        <p>You can buy your tickets here:</p>
        <p>User One: <a href={this.props.user1choice.url}>{this.props.user1choice.name}</a> Copy URL: <FontAwesomeIcon aria-hidden="true" icon="copy" /></p>
        <p>User Two: <a href={this.props.user2choice.url}>{this.props.user2choice.name}</a> Copy URL: <FontAwesomeIcon aria-hidden="true" icon="copy" /></p>
      </div>
    );
  }
}

export default DisplayLinks;