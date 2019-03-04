import * as React from 'react';
import Button from 'src/lib/components/Button';
import Text from 'src/lib/components/Text';
import { Text as TextType } from 'src/lib/types/general';
import {
  Container,
  ICON_SIZE,
  IconWrapper,
  SubTitle,
} from './Suggestion.style';

type Component = (props: { [key: string]: any }) => JSX.Element;

export interface ISuggestion {
  icon: Component;
  title: TextType;
  text?: TextType;
  action: () => void;
}

export interface IProps extends ISuggestion {
  backgroundColor: string;
  analyticsCategory: string;
  analyticsAction: string;
}

/**
 * Display a suggestion
 */
const Suggestion = ({
  action,
  analyticsAction,
  analyticsCategory,
  backgroundColor,
  icon: Icon,
  text,
  title,
}: IProps) => (
  <Button
    action={action}
    analyticsAction={analyticsAction}
    analyticsCategory={analyticsCategory}
    styles={{ flex: 1, flexDirection: 'row' }}
  >
    {({ isHovering }) => (
      <Container isHovering={isHovering}>
        <IconWrapper>
          <Icon size={ICON_SIZE} backgroundColor={backgroundColor} />
        </IconWrapper>
        <Text
          text={title}
          backgroundColor={backgroundColor}
          type="body2"
          center
        />
        {text && (
          <SubTitle>
            <Text
              text={text}
              backgroundColor={backgroundColor}
              type="caption"
              center
            />
          </SubTitle>
        )}
      </Container>
    )}
  </Button>
);

export default Suggestion;
