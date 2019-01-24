import * as React from 'react';
import { Provider } from 'react-redux';
import { Router as EntryRouter } from 'react-router';
import SafeAreaView from 'src/components/SafeAreaView';
import AppLoading from 'src/lib/components/AppLoading';
import ErrorBoundary from 'src/lib/components/ErrorBoundary';
import Router from 'src/lib/components/Router';
import { entry } from 'src/lib/config/routes';
import errors from 'src/lib/utils/errors';
import history from 'src/lib/utils/history';
import store from 'src/lib/utils/store';
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
          <SafeAreaView>
            <AppLoading>
              <ErrorBoundary defaultError={errors.getError('100-007')}>
                <EntryRouter history={history}>
                  <Router routes={entry} testHookKey="mainRouter" />
                </EntryRouter>
              </ErrorBoundary>
            </AppLoading>
          </SafeAreaView>
        </Provider>
      </ErrorBoundary>
    </Container>
  );
};

export default App;
