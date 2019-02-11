import * as React from 'react';
import { TextInputRef } from 'src/components/TextInput';
import Times from 'src/lib/assets/icons/Times';
import Button from 'src/lib/components/Button';
import TextInput from 'src/lib/components/Forms/TextInput';
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

export interface IPassedProps {
  fullScreen: boolean;
  close: () => void;
}

export interface IProps extends IPassedProps {
  setInputRef: (ref: TextInputRef | null) => void;
  onChange: (text: string) => void;
  value: string;
  saveDisabled: boolean;
}

/**
 * Show the add reminder view
 */
const AddReminder = ({
  fullScreen,
  close,
  setInputRef,
  onChange,
  value,
  saveDisabled,
}: IProps) => {
  const input = (
    <Input>
      <TextInput
        placeholder="AddReminder.Placeholder"
        backgroundColor={BACKGROUND_COLOR}
        testID="AddReminder__Input"
        value={value}
        onChange={onChange}
        ref={setInputRef}
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
            text="AddReminder.Save"
            analyticsAction="SAVE"
            analyticsCategory={analyticsCategory}
            type={getButtonType('TRANSPARENT')}
            baseWidth
            testID="AddReminder__Save"
            disabled={saveDisabled}
          />
        </Panel>
        {fullScreen && <InputPanel>{input}</InputPanel>}
      </Content>
    </Container>
  );
};

export default AddReminder;
