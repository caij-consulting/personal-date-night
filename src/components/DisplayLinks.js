import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class DisplayLinks extends Component {

  render() {
    return(

      <div className="toLinks modalContent" tabIndex="-1">
      <button
          onClick={this.props.closeModal}
          aria-label="click to close the modal">
          <FontAwesomeIcon aria-hidden="true" aria-label="close the box" icon="times" />
      </button>
        <div>{this.props.children}</div>

        <h2>Congratulations! You've both successfully chosen your events!</h2>
        <p>You can buy your tickets here:</p>
        <p>User One: <a href={this.props.user1choice.url}>{this.props.user1choice.name}</a>
        <span>Copy URL: <FontAwesomeIcon aria-hidden="true" icon="copy" aria-label="click to copy event link" /></span></p>
        
        <p>User Two: <a href={this.props.user2choice.url}>{this.props.user2choice.name}</a>
        <span>Copy URL: <FontAwesomeIcon aria-hidden="true" icon="copy" aria-label="click to copy event link" /></span></p>
      </div>
    );
  }
}

export default DisplayLinks;