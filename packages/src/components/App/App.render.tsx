import * as React from 'react';
import ErrorBoundary from '../ErrorBoundary';
import Text from '../Text';

/**
 * The main entry file. Sets up the global structure of the app, including any providers etc
 */
const App = () => (
  <ErrorBoundary>
    <Text text="All good" />
  </ErrorBoundary>
);

// const App = ({ children }: IProps) => (
//   <ErrorBoundary>
//     <StoreProvider>
//       <SafeAreaView>
//         <AppLoading>
//           <ErrorBoundary>
//               <Router />
//           </ErrorBoundary>
//         </AppLoading>
//       </SafeAreaView>
//     </StoreOrChildren>
//   </ErrorBoundary>
// );

export default App;
