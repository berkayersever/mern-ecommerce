import React, { Component } from 'react';
import Navbar from'./components/container/Navbar/Navbar';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Navbar></Navbar>
            </div>
        );
    }
}

export default App;
