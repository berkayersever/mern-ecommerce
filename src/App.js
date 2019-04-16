import React, { Component } from 'react';
import Home from'./components/container/Home/Home';
import Navbar from'./components/container/Navbar/Navbar';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Navbar></Navbar>
                <Home></Home>
            </div>
        );
    }
}

export default App;
