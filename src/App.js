import React, { Component } from 'react';
import Home from'./components/container/Home/Home';
import Navbar from'./components/container/Navbar/Navbar';
import routes from './routes';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Navbar></Navbar>
                {routes}
            </div>
        );
    }
}

export default App;
