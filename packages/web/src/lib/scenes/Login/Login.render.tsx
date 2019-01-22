import * as React from 'react';
import Button from 'src/lib/components/Button';
import ErrorText from 'src/lib/components/ErrorText';
import CentredContainer from 'src/lib/components/Layout/CentredContainer';
import Text from 'src/lib/components/Text';
import { Text as TextType } from 'src/lib/types/general';
import { version } from '../../../../package.json';
import { Spacing, Version } from './Login.style';

interface IProps {
  login: () => void;
  errorText?: TextType;
}

/**
 * Login scene
 */
const Login = ({ errorText, login }: IProps) => (
  <CentredContainer testID="Login">
    {({ backgroundColor }) => (
      <React.Fragment>
        <Spacing>
          <Text
            type="h2"
            text="Login.Title"
            backgroundColor={backgroundColor}
            testID="Login__Title"
            center
          />
        </Spacing>

        <Spacing>
          <Text
            text="Login.Description"
            backgroundColor={backgroundColor}
            center
          />
        </Spacing>

        <Spacing>
          <Button text="Login.Button" action={login} testID="Login__Button" />
        </Spacing>

        {errorText && (
          <ErrorText
            text={errorText}
            backgroundColor={backgroundColor}
            testID="Login__ErrorText"
            height={50}
          />
        )}

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
