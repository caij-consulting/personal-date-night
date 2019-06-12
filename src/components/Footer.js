import React, { Component } from "react";

class Footer extends Component {
  render() {
    return(
      <footer>
        <p>Created by CAIJ Consulting: <a href="http://www.canrozanes.com/" target="_blank" aria-label="go to Can Rozanes's website" rel="noopener noreferrer">Can</a>, <a href="http://www.anniebombanie.com" target="_blank" aria-label="go to Annie Liew's website" rel="noopener noreferrer">Annie</a>, <a href="http://www.irenetruong.com/" target="_blank" aria-label="go to Irene Truong's website" rel="noopener noreferrer">Irene</a>, and <a href="http://www.jamieyeung.ca/" target="_blank" aria-label="go to Jamie Yeung's website" rel="noopener noreferrer">Jamie</a> | Powered by <a href="https://developer.ticketmaster.com/products-and-docs/apis/getting-started/" target="_blank" aria-label="go to Ticketmaster's API website" rel="noopener noreferrer">Ticketmaster</a></p>
      </footer>
    )
  }
}

export default Footer;