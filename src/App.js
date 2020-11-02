import React, { Component } from 'react';
import './App.css';

import JokesTray from './JokesTray';

class App extends Component {
  render() {
    return(
      <div className='App'>
        <JokesTray />
      </div>
    )
  }
}

export default App;
