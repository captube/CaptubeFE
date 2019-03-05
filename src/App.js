import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import MainLayout from './layout/MainLayout';

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <Route path="/" exact component={MainLayout}/>
                </div>
            </Router>
        );
    }
}

export default App;
