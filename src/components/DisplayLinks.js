import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class DisplayLinks extends Component {
  constructor() {
    super();
    this.modalRef = React.createRef();
  }
  
  componentDidMount() {
    this.modalRef.current.focus();
  }

loopFocus= () => {
  this.modalRef.current.focus();
}

  render() {
    return(
      // keep empty anchor tags for keeping tab within modal
      <div className="toLinks modalContent" tabIndex="-1" >
      {/* must put a space after "# " for removing warning error */}
        <a href="# " className="keepFocusModal" onTransitionEnd={this.loopFocus} aria-hidden="true">.</a>

      <button ref={this.modalRef}
          onClick={this.props.closeModal}
          aria-label="click to close the modal">
          <FontAwesomeIcon aria-hidden="true" aria-label="close the box" icon="times" />
      </button>
        <div>{this.props.children}</div>

        <h2><span>Congratulations!</span> You've both successfully chosen your events!</h2>
        <p>You can buy your tickets here:</p>
        <div className="userLink">
          <FontAwesomeIcon icon="user" aria-hidden="true" /><p className="userText">User One: <a href={this.props.user1choice.url} target="_blank" rel="noopener noreferrer" aria-label="Click to get your tickets here!">{this.props.user1choice.name}</a></p>
        </div>
      
        <div className="userLink">
          <FontAwesomeIcon icon="user" aria-hidden="true" /><p className="userText">User Two: <a href={this.props.user2choice.url} target="_blank" rel="noopener noreferrer" aria-label="Click to get your tickets here!">{this.props.user2choice.name}</a></p>
          <a href="# " className="keepFocusModal" onTransitionEnd={this.loopFocus} aria-hidden="true">.</a>
        </div>
      </div>
    );
  }
}

export default DisplayLinks;