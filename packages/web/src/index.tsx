import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from 'src/lib/components/App';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html, body, #root {
    display: flex;
    flex: 1;
    padding: 0;
    margin: 0;
    height: 100vh;
    width: 100vw;
  }
`;

/**
 * The entry component, only needed to add the global css
 */
const Entry = () => (
  <React.Fragment>
    <GlobalStyle />
    <App />
  </React.Fragment>
);

ReactDOM.render(<Entry />, document.getElementById('root') as HTMLElement);
