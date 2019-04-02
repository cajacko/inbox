import * as React from 'react';
import Button from 'src/lib/components/Button';
import Text from 'src/lib/components/Text';
import openUrl from 'src/utils/openUrl';
import { buttonStyles, Container, Wrapper } from './ReminderLink.style';

interface IProps {
  url: string;
  backgroundColor: string;
  padding?: number;
}

/**
 * Displays the link for a reminder
 */
const ReminderLink = ({ url, backgroundColor, padding }: IProps) => (
  <Container padding={padding}>
    <Button
      analyticsAction="PRESS_LINK"
      analyticsCategory="REMINDER_LINK"
      action={openUrl(url)}
      styles={buttonStyles}
    >
      {({ isHovering }) => (
        <Wrapper isHovering={isHovering}>
          <Text
            text={{ _textFromConst: url }}
            backgroundColor={backgroundColor}
            numberOfLines={1}
          />
          <Text
            text={{ _textFromConst: 'VIEW LINK' }}
            type="subtitle2"
            backgroundColor={backgroundColor}
            highlight
          />
        </Wrapper>
      )}
    </Button>
  </Container>
);

export default ReminderLink;
