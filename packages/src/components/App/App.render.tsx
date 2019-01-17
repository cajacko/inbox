import * as React from 'react';
import ErrorBoundary from 'src/lib/components/ErrorBoundary';
import View from 'src/lib/components/Layout/View';
import Text from 'src/lib/components/Text';
import { BACKGROUND_COLORS } from 'src/lib/config/styles/textIconColors';

/**
 * The main entry file. Sets up the global structure of the app, including any
 * providers etc
 */
const App = () => (
  <ErrorBoundary>
    <View>
      <Text
        backgroundColor={BACKGROUND_COLORS.WHITE}
        error
        text={{ _textFromConst: 'All good' }}
      />
    </View>
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
