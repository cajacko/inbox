import * as React from "react";
import "./App.css";
import Button from "./lib/components/Button";
import sharedExample from "./lib/sharedExample";

import logo from "./logo.svg";

// tslint:disable-next-line
console.log(sharedExample(1, 2));

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Button text="I am a button" />
      </div>
    );
  }
}

export default App;
