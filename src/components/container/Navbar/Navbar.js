import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './Navbar.css';              // Import the css file for styling.

class Navbar extends Component {
    linkFunc(path) {
        this.props.history.push(path);
    }
    render() {
        return (
            <div className='nav container'>
                <div className='desktop-nav'>
                    {/* Make sure every link uses linkFunc, except the login link. */}
                    <p className="nav-link" onClick={() => this.linkFunc('/')}>Home</p>
                    <p className="nav-link" onClick={() => this.linkFunc('/about')}>About</p>
                    <p className="nav-link" onClick={() => this.linkFunc('/cart')}>Cart</p>
                    <p className="nav-link" >Login</p>
                </div>
            </div>
        );
    }
}

export default withRouter(Navbar);  // Then wrap our Component with the Higher-Order Component.