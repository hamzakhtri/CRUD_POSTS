import React, { Component } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './screens/Home';

class App extends Component {
  render() {
    return (
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    );
  }
}

export default App;
