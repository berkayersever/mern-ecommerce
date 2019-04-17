import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Navbar as ReactNavbar } from 'react-bootstrap';
import { Button, Image, Nav, NavDropdown, Form, FormControl } from 'react-bootstrap';
// import { Button, Nav, NavDropdown, MenuItem, NavItem, Form, FormControl } from 'react-bootstrap';
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
            <div>
                <ReactNavbar bg="light" expand="lg">
                    <ReactNavbar.Brand href="#home">PokéStore</ReactNavbar.Brand>
                    <ReactNavbar.Toggle aria-controls="basic-navbar-nav" />
                    <ReactNavbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link onClick={() => this.linkFunc('/')}>Home</Nav.Link>
                            <Nav.Link onClick={() => this.linkFunc('/about')}>About</Nav.Link>
                            <Nav.Link onClick={() => this.linkFunc('/cart')}>Cart</Nav.Link>
                            <NavDropdown title="Profile" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Nav className="mr-auto">
                            <Nav.Link onClick={() => this.props.user ? this.logout() : this.login()} reoundedCircle>
                                {this.props.user ? <Nav>Logout</Nav> : <Nav>Login</Nav>}
                            </Nav.Link>
                            {/*<Nav.Link onClick={() => this.props.user ? this.logout() : this.login()} >*/}
                            {/*{this.props.user ?*/}
                            {/*<Nav.Link>Logout</Nav.Link>*/}
                            {/*// <Image src={this.props.user.profile_picture} alt={this.props.user.nickname} fluid />*/}
                            {/*: <Nav.Link>Login</Nav.Link>}*/}
                            {/*</Nav.Link>*/}
                        </Nav>


                        <Form inline>
                            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                            <Button variant="outline-success">Search</Button>
                        </Form>
                    </ReactNavbar.Collapse>
                </ReactNavbar>
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