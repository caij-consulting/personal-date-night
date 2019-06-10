import React from 'react';

const DisplayLinks = (props) => {

    return(
        <div>
            <h1>Display Links</h1>
            <h2>You can buy your tickets here:</h2>
    {/*}
            <p>User One: <a href="{`eventObject.id.url`}">{eventObject.id.title}</a></p>
            <p>User Two: <a href="{`eventObject.id.url`}">{eventObject.id.title}</a></p>
    */}
            <p>User One: <a href="#">{eventObject.id.title}</a></p>
            <p>User Two: <a href="#">{eventObject.id.title}</a></p>
    
            <button>Email me the links to buy my tickets later</button> 
            <button type="reset">Start Again</button> 
        </div>
    );
}
export default DisplayLinks;