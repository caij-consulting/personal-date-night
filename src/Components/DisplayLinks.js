import React, { Component, Fragment } from 'react';

class DisplayLinks extends Component {
    render() {
        return(
            <Fragment>
                <h1>Display Links</h1>
                <h2>You can buy your tickets here</h2>
                <div>User One: [NAME OF EVENT] <a href="">{data link from API}</a></div>
                <div>User Two: [NAME OF EVENT] <a href="">{data link from API}</a></div>
                <button>Email me the links to buy my tickets later</button>
                <button type="reset">Start Again</button>
            </Fragment>
        )
    }
}
export default DisplayLinks;