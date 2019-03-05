import * as React from 'react';
import { TextInputRef } from 'src/components/TextInput';
import Check from 'src/lib/assets/icons/Check';
import Clock from 'src/lib/assets/icons/Clock';
import Times from 'src/lib/assets/icons/Times';
import Trash from 'src/lib/assets/icons/Trash';
import Button from 'src/lib/components/Button';
import TextInput from 'src/lib/components/Forms/TextInput';
import getButtonType from 'src/lib/utils/getButtonType';
import {
  BACKGROUND_COLOR,
  CHECK_COLOR,
  Container,
  Content,
  Input,
  InputPanel,
  Panel,
  Right,
  SNOOZE_COLOR,
} from './AddReminder.style';

const analyticsCategory = 'ADD_REMINDER_SCENE';

export interface IPassedProps {
  fullScreen: boolean;
  close: (closeAllModals?: boolean) => void;
  id?: string;
}

export interface IProps extends IPassedProps {
  setInputRef: (ref: TextInputRef | null) => void;
  onChange: (text: string) => void;
  value: string;
  saveDisabled: boolean;
  onSave: () => void;
  onDone: (val: boolean) => () => void;
  isNew: boolean;
  onDelete: () => void;
  isDone: boolean;
  isSnoozed: boolean;
  onSnooze: () => void;
}

/**
 * Show the add reminder view
 */
const AddReminder = (props: IProps) => {
  const inputBelow = !props.isNew || props.fullScreen;

  const input = (
    <Input>
      <TextInput
        placeholder="AddReminder.Placeholder"
        backgroundColor={BACKGROUND_COLOR}
        testID="AddReminder__Input"
        value={props.value}
        onChange={props.onChange}
        ref={props.setInputRef}
        onSubmit={props.onSave}
      />
    </Input>
  );

  return (
    <Container
      testID={props.isNew ? 'AddReminder' : 'AddReminder--Edit'}
      fullScreen
    >
      <Content fullScreen>
        <Panel fullScreen>
          <Button
            action={props.close}
            testID="AddReminder__Cancel"
            icon={Times}
            analyticsAction="CLOSE"
            analyticsCategory={analyticsCategory}
            type={getButtonType('ICON.GREYED_OUT')}
          />

          {!inputBelow && input}

          <Right>
            <Button
              action={props.onSnooze}
              testID="AddReminder__Snooze"
              _dangerouslySetIconColor={
                props.isSnoozed ? SNOOZE_COLOR : undefined
              }
              icon={Clock}
              analyticsAction="SNOOZE"
              analyticsCategory={analyticsCategory}
              type={getButtonType('ICON.GREYED_OUT')}
            />

            {!props.isNew && (
              <React.Fragment>
                <Button
                  action={props.onDelete}
                  testID="AddReminder__Delete"
                  icon={Trash}
                  analyticsAction="DELETE"
                  analyticsCategory={analyticsCategory}
                  type={getButtonType('ICON.GREYED_OUT')}
                />
                <Button
                  action={props.onDone(!props.isDone)}
                  testID="AddReminder__Done"
                  _dangerouslySetIconColor={
                    props.isDone ? CHECK_COLOR : undefined
                  }
                  icon={Check}
                  analyticsAction="DONE"
                  analyticsCategory={analyticsCategory}
                  type={getButtonType('ICON.GREYED_OUT')}
                />
              </React.Fragment>
            )}

            <Button
              action={props.onSave}
              text="AddReminder.Save"
              analyticsAction="SAVE"
              analyticsCategory={analyticsCategory}
              type={getButtonType('TRANSPARENT')}
              baseWidth
              testID="AddReminder__Save"
              disabled={props.saveDisabled}
            />
          </Right>
        </Panel>
        {inputBelow && <InputPanel>{input}</InputPanel>}
      </Content>
    </Container>
  );
};

export default AddReminder;
