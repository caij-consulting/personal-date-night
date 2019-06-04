import React, { Component, Fragment } from 'react';
class EmailForm extends Component {
    render() {
        return(
            <Fragment>
                <h1>EmailForm</h1>
                <form>
                    <div>
                        <label htmlFor="userOne">user one email</label>
                        <input type="text" id="userOne" defaultValue="email"/>
                    </div>
                    <div>
                        <label htmlFor="userTwo">user two email</label>
                        <input type="text" id="userTwo" defaultValue="email"/>
                    </div>
                </form>
            </Fragment>
        )
    }
}
export default EmailForm;