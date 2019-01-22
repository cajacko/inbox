import * as React from 'react';
import { Provider } from 'react-redux';
import AppLoading from 'src/lib/components/AppLoading';
import ErrorBoundary from 'src/lib/components/ErrorBoundary';
import Router from 'src/lib/components/Router';
import { entry } from 'src/lib/config/routes';
import errors from 'src/lib/utils/errors';
import store from 'src/lib/utils/store';
import { Router as EntryRouter } from 'src/packages/react-router';
import testHook from 'src/utils/testHook';
import { Container } from './App.style';

/**
 * The main entry file. Sets up the global structure of the app, including any
 * providers etc
 */
const App = () => {
  testHook('root', undefined);

  return (
    <Container>
      <ErrorBoundary defaultError={errors.getError('100-004')}>
        <Provider store={store.get()}>
          <AppLoading>
            <ErrorBoundary defaultError={errors.getError('100-007')}>
              <EntryRouter>
                <Router routes={entry} testHookKey="mainRouter" />
              </EntryRouter>
            </ErrorBoundary>
          </AppLoading>
        </Provider>
      </ErrorBoundary>
    </Container>
  );
};

export default App;
