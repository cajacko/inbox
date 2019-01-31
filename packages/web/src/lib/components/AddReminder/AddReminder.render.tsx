import * as React from 'react';
import { View } from 'src/components';
import Text from 'src/lib/components/Text';
import { BACKGROUND_COLORS } from 'src/lib/config/styles/textIconColors';

/**
 * Show the add reminder view
 */
const AddReminder = () => (
  <View testID="AddReminder">
    <Text
      text={{ _textFromConst: 'Add Reminder' }}
      backgroundColor={BACKGROUND_COLORS.WHITE}
    />
  </View>
);

export default AddReminder;
