import * as React from 'react';
import { Provider } from 'react-redux';
import { Router as EntryRouter } from 'react-router';
import SafeAreaView from 'src/components/SafeAreaView';
import AppLoading from 'src/lib/components/AppLoading';
import ErrorBoundary from 'src/lib/components/ErrorBoundary';
import Router from 'src/lib/components/Router';
import { entry } from 'src/lib/config/routes';
import { WHITE } from 'src/lib/config/styles/colors';
import * as AddReminderModal from 'src/lib/context/AddReminderModal';
import * as RepeatModal from 'src/lib/context/RepeatModal';
import * as SnoozeModal from 'src/lib/context/SnoozeModal';
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
          <SafeAreaView backgroundColor={WHITE} barStyle="dark-content">
            <ErrorBoundary defaultError={errors.getError('100-014')}>
              <AppLoading>
                <ErrorBoundary defaultError={errors.getError('100-007')}>
                  <EntryRouter history={history}>
                    <ErrorBoundary defaultError={errors.getError('100-012')}>
                      <SnoozeModal.Provider>
                        <RepeatModal.Provider>
                          <AddReminderModal.Provider>
                            <ErrorBoundary
                              defaultError={errors.getError('100-013')}
                            >
                              <Router routes={entry} testHookKey="mainRouter" />
                            </ErrorBoundary>
                          </AddReminderModal.Provider>
                        </RepeatModal.Provider>
                      </SnoozeModal.Provider>
                    </ErrorBoundary>
                  </EntryRouter>
                </ErrorBoundary>
              </AppLoading>
            </ErrorBoundary>
          </SafeAreaView>
        </Provider>
      </ErrorBoundary>
    </Container>
  );
};

export default App;
