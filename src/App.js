import React, { Component } from 'react';
// import Home from'./components/container/Home/Home';
import Navbar from'./components/container/Navbar/Navbar';
import routes from './routes';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { login, logout } from './redux/reducer';
import axios from 'axios';
import './App.css';

class App extends Component {
    componentDidMount() {                           // In it's componentDidMount get the session, and if it has data set your intialState user to it.
        axios.get('/api/user-data')
            .then(res => {
                const { dispatch } = this.props;    // Destruct the dispatch props from this.props that will be responsible for dispatching or initiating actions from your reducer.
                if(res.data.user) {                 // Dispatch the login function with the user data.
                    dispatch(login(res.data.user));
                } else {                            // Else logout the user from the intialState.
                    dispatch(logout());             // Dispatch the logout the user by default if there is no data in session.
                }
            })
    }
    render() {
        return (
            <div className="App">
                <Navbar></Navbar>
                {routes}
            </div>
        );
    }
}

export default withRouter(connect()(App));          // Connect your app to your reducer.