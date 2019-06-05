import React, { Component, Fragment } from 'react';

class EmailForm extends Component {
    constructor() {
        super();
        this.state= {
            userEmailsSent: false,
            validEmails: false,
            userOneEmail: "",
            userTwoEmail: "",
            userOneEventUrl: "",
            userTwoEventUrl: ""
        } 
    }

    // checkValidEmail= (userOne, userTwo) => {
    //     //check if @ and . exists for both users
    //     //if yes, push to userOneEmail & userTwoEmail
    //     //if not, display error message "Please enter a valid email address"
    // }

    // checkBothEmailsEntered = () => {
    //     //if userOneEmail && userTwoEmail === true,
    //     //then send email
    //     //if one is false, then display error "Please enter both emails"
    // }

    // sendEmail = (userOne, userTwo) => {
    //     //take emails and send email
    //     this.setState = {
    //         userEmailsSent: true,
    //     }
    // }


    render() {
        return (
            <Fragment>
                <h1>EmailForm</h1>
                <form>
                    <div>
                        <label htmlFor="userOne">user one email</label>
                        <input type="email" name="userOne" id="userOne" defaultValue={this.props.userOneEmail} required />
                    </div>
                    <div>
                        <label htmlFor="userTwo">user two email</label>
                        <input type="email" name="userTwo" id="userTwo" defaultValue={this.props.userTwoEmail} required />
                    </div>
                    <button onClick={this.sendEmail}>Send Email</button>
                </form>
                {/* {userEmailsSent && (
                    <p>Thank you. The links have been sent to your emails.</p>
                )} */}
            </Fragment>
        )
    }
}

export default EmailForm;