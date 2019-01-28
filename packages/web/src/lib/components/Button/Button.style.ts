import { View } from 'src/components';
import { IType } from 'src/lib/config/styles/buttons';
import unit from 'src/utils/unit';
import styled from 'styled-components';

interface IInnerProps {
  type: IType;
}

interface IOuterProps {
  type: IType;
  fullHeight?: boolean;
  baseWidth?: number;
}

/**
 * Get the theme styles from the type object
 */
const getTypeThemeStyles = (type: IType) => {
  if (!type) {
    throw new Error('You must pass in a button type from config/styles/buttons');
  }

  if (type.DEFAULT) return type.DEFAULT;

  return type;
};

/**
 * Get the styles for the text component
 */
export const textStyles = (type: IType) => {
  const { textColor, backgroundColor } = getTypeThemeStyles(type);

  const styles = {
    _dangerouslySetColor: textColor,
    backgroundColor,
    type: 'button',
  };

  return styles;
};

/**
 * Get the styles for the icon component
 */
export const iconStyles = (type: IType) => {
  const { iconColor, backgroundColor, iconSize } = getTypeThemeStyles(type);

  const styles = {
    _dangerouslySetColor: iconColor,
    backgroundColor,
    size: iconSize,
  };

  return styles;
};

/**
 * Get the outer container styles
 */
const outerStyle = ({ type, fullHeight, baseWidth }: IOuterProps) => {
  const { width, height } = getTypeThemeStyles(type);

  const heightStyle = fullHeight ? '100%' : unit(height);

  const widthStyle = baseWidth || !width ? '' : `width: ${unit(width)}`;

  return `
    ${widthStyle};
    ${heightStyle ? `height: ${heightStyle}` : ''};
    position: relative;
  `;
};

/**
 * Get the inner container styles
 */
const innerStyle = ({ type }: IInnerProps) => {
  const {
    borderRadius,
    backgroundColor,
    paddingHorizontal,
    shadow,
  } = getTypeThemeStyles(type);

  return `
    ${paddingHorizontal ? `padding-left: ${unit(paddingHorizontal)}` : ''}
    ${paddingHorizontal ? `padding-right: ${unit(paddingHorizontal)}` : ''}
    ${borderRadius ? `border-radius: ${unit(borderRadius)}` : ''};
    ${backgroundColor ? `background-color: ${backgroundColor}` : ''};
    ${shadow || ''};
  `;
};

/**
 * Return the override styles
 */
export const nativeStyles = ({ styles }: { styles?: React.CSSProperties }) => {
  if (styles) return styles;

  return {
    flex: 1,
  };
};

export const Outer = styled(View)<IOuterProps>`
  ${outerStyle};
`;

export const Inner = styled(View)<IInnerProps>`
  flex: 1;
  align-items: center;
  justify-content: center;
  ${innerStyle};
`;
