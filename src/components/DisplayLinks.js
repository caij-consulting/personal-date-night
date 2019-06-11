import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class DisplayLinks extends Component {
  constructor() {
    super();
    this.modalRef = React.createRef();
  }
  
  componentDidMount() {
    console.log(this.modalRef);
    this.modalRef.current.focus();
  }

 loopFocus= () => {
  this.modalRef.current.focus();
 }

  render() {
    return(

      <div className="toLinks modalContent" tabIndex="-1" onTransitionEnd={this.loopFocus}>
      <button
          ref={this.modalRef}
          onClick={this.props.closeModal}
          aria-label="click to close the modal">
          <FontAwesomeIcon aria-hidden="true" aria-label="close the box" icon="times" />
      </button>
        <div>{this.props.children}</div>

        <h2>Congratulations! You've both successfully chosen your events!</h2>
        <p>You can buy your tickets here:</p>
        <p>User One: <a href={this.props.user1choice.url} target="_blank" aria-label="Click to get your tickets here!">{this.props.user1choice.name}</a> </p>
      
        <p>User Two: <a href={this.props.user2choice.url} target="_blank" aria-label="Click to get your tickets here!">{this.props.user2choice.name}</a></p>
      </div>
    );
  }
}

export default DisplayLinks;