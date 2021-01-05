import React, {Component} from 'react';
import PropTypes from 'prop-types';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import {Container} from "semantic-ui-react";
import './auth.css';


class SubLoginChoice extends Component {

    uiConfig = {
        // Popup signin flow rather than redirect flow.
        signInFlow: 'popup',

        signInOptions: [
            this.props.firebase.auth.EmailAuthProvider.PROVIDER_ID,
            this.props.firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            // this.props.firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        ],
        callbacks: {
            signInSuccessUrl: this.props.successRedirectUrl || "/",
            signInSuccessWithAuthResult: (authResult) => {
                // If true redirect to signInSuccessUrl
                return this.props.onSuccess(authResult)
            }
        }
    };

    render() {
            return (
                <Container className="loginContainer">
                    <h1>FirebaseUI-React</h1>
                    <h1> with Firebase Authentication</h1>

                    <p>Please sign-in:</p>
                    <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={this.props.firebase.auth()}/>
                </Container>
            );
    }
}


SubLoginChoice.propTypes = {
    firebase: PropTypes.any.isRequired,
    onSuccess: PropTypes.func.isRequired,
    onFail: PropTypes.func,
    successRedirectUrl: PropTypes.string,
};

export default SubLoginChoice