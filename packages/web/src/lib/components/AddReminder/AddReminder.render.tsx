import * as React from 'react';
import Times from 'src/lib/assets/icons/Times';
import Button from 'src/lib/components/Button';
import Text from 'src/lib/components/Text';
import getButtonType from 'src/lib/utils/getButtonType';
import {
  BACKGROUND_COLOR,
  Container,
  Content,
  Input,
  InputPanel,
  Panel,
} from './AddReminder.style';

const analyticsCategory = 'ADD_REMINDER_SCENE';

interface IProps {
  fullScreen: boolean;
  close: () => void;
}

/**
 * Show the add reminder view
 */
const AddReminder = ({ fullScreen, close }: IProps) => {
  const input = (
    <Input>
      <Text
        text={{ _textFromConst: 'Reminder to add...' }}
        backgroundColor={BACKGROUND_COLOR}
        greyedOut
      />
    </Input>
  );

  return (
    <Container testID="AddReminder" fullScreen>
      <Content fullScreen>
        <Panel fullScreen>
          <Button
            action={close}
            testID="AddReminder__Cancel"
            icon={Times}
            analyticsAction="CLOSE"
            analyticsCategory={analyticsCategory}
            type={getButtonType('ICON.GREYED_OUT')}
          />

          {!fullScreen && input}

          <Button
            text={{ _textFromConst: 'Save' }}
            analyticsAction="SAVE"
            analyticsCategory={analyticsCategory}
            type={getButtonType('TRANSPARENT')}
            baseWidth
          />
        </Panel>
        {fullScreen && <InputPanel>{input}</InputPanel>}
      </Content>
    </Container>
  );
};

export default AddReminder;
