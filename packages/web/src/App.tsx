import * as React from 'react';
import './App.css';
import Button from './lib/components/Button';
import sharedExample from './lib/sharedExample';

// eslint-disable-next-line
console.log(sharedExample(1, 2));

/**
 * The example app
 */
const App = () => (
  <div className="App">
    <header className="App-header">
      <span className="App-title">Welcome to React</span>
    </header>

    <p className="App-intro">
      To get started, edit <code>src/App.tsx</code> and save to reload.
    </p>

    <Button text="I am a button" />
  </div>
);

export default App;
