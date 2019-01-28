import * as React from 'react';
import { Button as UIButton, View } from 'src/components';
import Text from 'src/lib/components/Text';
import { IType } from 'src/lib/config/styles/buttons';
import { Text as TextType } from 'src/lib/types/general';
import { Children } from 'src/lib/types/libs';
import {
  iconStyles,
  Inner,
  nativeStyles,
  Outer,
  textStyles,
} from './Button.style';

export interface IProps {
  action?: () => void;
  baseWidth?: number;
  children?: Children;
  fullHeight?: boolean;
  noButton?: boolean;
  noContent?: boolean;
  numberOfLines?: number;
  styles?: React.CSSProperties;
  testID?: string;
  text?: TextType;
  textTestID?: string;
  type: IType;
  icon?: Component;
  iconLeft?: boolean;
  iconRight?: boolean;
}

type Component = (props: { [key: string]: any }) => JSX.Element;

/**
 * Standard button component, can take text or icons
 */
const Button = (props: IProps) => {
  // @ts-ignore
  const ButtonComponent: Component = props.noButton ? View : UIButton;

  const nativeStylesProp = nativeStyles({
    styles: props.styles,
  });

  const buttonProps = {
    action: props.noButton ? undefined : props.action,
    style: nativeStylesProp,
    testID: props.testID,
  };

  let IconOnly = null;
  let RightIcon = null;
  let LeftIcon = null;

  if (props.icon) {
    const Icon = props.icon;

    const IconComponent = <Icon {...iconStyles(props.type)} />;

    if (props.iconLeft) {
      LeftIcon = IconComponent;
    } else if (props.iconRight || props.text) {
      RightIcon = IconComponent;
    } else {
      IconOnly = IconComponent;
    }
  }

  return props.children || props.noContent ? (
    <ButtonComponent {...buttonProps}>{props.children || null}</ButtonComponent>
  ) : (
    <Outer
      type={props.type}
      fullHeight={props.fullHeight}
      baseWidth={props.baseWidth}
    >
      <ButtonComponent {...buttonProps}>
        <Inner type={props.type}>
          {props.text ? (
            <React.Fragment>
              {LeftIcon}
              <Text
                testID={props.textTestID}
                text={props.text}
                {...textStyles(props.type)}
                numberOfLines={props.numberOfLines}
              />
              {RightIcon}
            </React.Fragment>
          ) : (
            IconOnly
          )}
        </Inner>
      </ButtonComponent>
    </Outer>
  );
};

export default Button;
