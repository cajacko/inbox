import sharedExample from "@cajacko/src/lib/sharedExample";
import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";

// tslint:disable-next-line
console.log(sharedExample(1, 2));

ReactDOM.render(<App />, document.getElementById("root") as HTMLElement);
registerServiceWorker();
