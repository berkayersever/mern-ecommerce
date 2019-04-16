import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import './Navbar.css';                                                                      // Import the css file for styling.
require('dotenv').config({path: '../../../../.env'});

export class Navbar extends Component {
    linkFunc(path) {
        this.props.history.push(path);
    }
    logout = () => {                                                                        // Logout function that will logout hte user from the initialState.
        axios.post('/api/logout', {})                                                       // Pass a empty since you are just logging out the user.
            .then(res => {                                                                  // Then will logout a user
                alert(res.data.message);
                this.props.history.go();                                                    // Reload the browser using this.props.history.go();
            }).catch(err => console.log('Logout Axios Error-------', err));
    };
    login = () => {                                                                         // Define your encodedURi since your are dealing with oAuth, so it can be secure, and oAuth and decode it.
        const redirectURI = encodeURIComponent(`${window.location.origin}/auth/callback`);  // Have your location origin, with your auth0 proxy which will be auth/calllback
        window.location = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/login?client=${process.env.REACT_APP_AUTH0_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${redirectURI}`;
    };                                                                                      // Redirect the user to your Auth0 domain, with the correct query parameters to retrieve code from auth0.
    render() {
        console.log(this.props.user);
        return (
            <div className='nav container'>
                <div className='desktop-nav'>
                    {/* Make sure every link uses linkFunc, except the login link. */}
                    <p className="nav-link" onClick={() => this.linkFunc('/')}>Home</p>
                    <p className="nav-link" onClick={() => this.linkFunc('/about')}>About</p>
                    <p className="nav-link" onClick={() => this.linkFunc('/cart')}>Cart</p>
                    {/* Conditionally render the login button based if the user has data(it's login) else logout */}
                    {/* Conditional render the user image if logged in. */}
                    <div className="nav-link" onClick={() => this.props.user ? this.logout() : this.login()} >
                        {this.props.user ?
                            <div>
                                <p>Logout</p>
                                <img className='user-image' src={this.props.user.profile_picture} alt={this.props.user.nickname} />
                            </div>
                            : <p>Login</p>}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
};

export default withRouter(connect(mapStateToProps)(Navbar));                                // Then wrap our Component with the Higher-Order Component and the connect double invoked.