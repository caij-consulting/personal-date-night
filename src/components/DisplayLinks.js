import React, { Component } from 'react';

class DisplayLinks extends Component {

  render() {
    return(
      <div className="toLinks">
        <button>This button here is to close modal</button>
        <h2>Congratulations! You've successfully chosen your events!</h2>
        <p>You can buy your tickets here:</p>
        <p>User One: <a href={this.props.user1choice.url}>{this.props.user1choice.name}</a></p>
        <p>User Two: <a href={this.props.user2choice.url}>{this.props.user2choice.name}</a></p>
      </div>
    );
  }
}

export default DisplayLinks;