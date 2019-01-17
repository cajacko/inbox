import * as React from 'react';
import AppLoading from 'src/lib/components/AppLoading';
import ErrorBoundary from 'src/lib/components/ErrorBoundary';
import Temp from 'src/lib/components/ErrorBoundary/ErrorBoundary.render';
import Text from 'src/lib/components/Text';
import { BACKGROUND_COLORS } from 'src/lib/config/styles/textIconColors';

/**
 * The main entry file. Sets up the global structure of the app, including any
 * providers etc
 */
const App = () => (
  <ErrorBoundary>
    <AppLoading>
      <Temp hasError title="Temp.Title" message="Temp.Message">
        <Text
          backgroundColor={BACKGROUND_COLORS.WHITE}
          error
          text={{ _textFromConst: 'All good' }}
        />
      </Temp>
    </AppLoading>
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
