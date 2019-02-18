import * as React from 'react';
import Button from 'src/lib/components/Button';
import CentredContainer from 'src/lib/components/Layout/CentredContainer';
import Status from 'src/lib/components/Status';
import Text from 'src/lib/components/Text';
import { Text as TextType } from 'src/lib/types/general';
import getButtonType from 'src/lib/utils/getButtonType';
import { version } from '../../../../package.json';
import { Spacing, Version } from './Login.style';

interface IProps {
  login: () => void;
  cancel: () => void;
  errorText?: TextType;
  loggingIn: boolean;
  description?: string;
}

/**
 * Login scene
 */
const Login = ({
  errorText,
  login,
  loggingIn,
  description,
  cancel,
}: IProps) => (
  <CentredContainer testID="Login">
    {({ backgroundColor }) => (
      <React.Fragment>
        <Spacing>
          <Text
            type="h2"
            text="General.Title"
            backgroundColor={backgroundColor}
            testID="Login__Title"
            center
          />
        </Spacing>

        <Spacing>
          <Text
            text={
              description
                ? { _textFromConst: description }
                : 'Login.Description'
            }
            backgroundColor={backgroundColor}
            center
          />
        </Spacing>

        <Spacing center>
          {loggingIn ? (
            <Button
              analyticsAction="CANCEL_LOGIN"
              analyticsCategory="LOGIN"
              text="Login.Cancel"
              action={cancel}
              testID="Login__Cancel"
              type={getButtonType('CONTAINED.SECONDARY')}
            />
          ) : (
            <Button
              analyticsAction="LOGIN"
              analyticsCategory="LOGIN"
              text="Login.Button"
              action={login}
              testID="Login__Button"
              type={getButtonType('CONTAINED.PRIMARY')}
            />
          )}
        </Spacing>

        <Spacing>
          <Status
            spinnerTestID="Login__Loading"
            errorTextTestID="Login__ErrorText"
            isLoading={loggingIn}
            errorText={errorText}
            loadingText="Login.Loading"
            backgroundColor={backgroundColor}
          />
        </Spacing>

        <Version>
          <Text
            text={{ _textFromConst: `v${version}` }}
            backgroundColor={backgroundColor}
            testID="Login__VersionText"
            type="overline"
            center
          />
        </Version>
      </React.Fragment>
    )}
  </CentredContainer>
);

export default Login;
