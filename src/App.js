import React, { Component } from 'react';
import Header from './components/Header'
import MapReact from './components/MapReact'

export default class App extends Component {

  render() {

    return (
      <div className="App container">
        <Header />
        <MapReact />
      </div>
    );
  }

}


