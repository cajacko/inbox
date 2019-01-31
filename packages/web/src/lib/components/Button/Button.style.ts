import { View } from 'src/components';
import { IType } from 'src/lib/config/styles/buttons';
import applyPadding from 'src/lib/utils/applyPadding';
import unit from 'src/utils/unit';
import styled from 'styled-components';

interface IGenericProps {
  type?: IType;
  isHovering: boolean;
}

interface IOuterProps {
  type?: IType;
  fullHeight?: boolean;
  baseWidth?: boolean;
  isHovering: boolean;
}

/**
 * Get the theme styles from the type object
 */
const getTypeThemeStyles = ({ type, isHovering }: IGenericProps) => {
  if (!type) {
    throw new Error('You must pass in a button type from config/styles/buttons');
  }

  const finalType = type.DEFAULT || type;

  if (!isHovering) return finalType;

  const hoverProps = finalType.hover || {};

  return { ...finalType, ...hoverProps };
};

/**
 * Get the styles for the text component
 */
export const textStyles = (props: IGenericProps) => {
  const { textColor, backgroundColor } = getTypeThemeStyles(props);

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
export const iconStyles = (props: IGenericProps) => {
  const { iconColor, backgroundColor, iconSize } = getTypeThemeStyles(props);

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
const outerStyle = ({ fullHeight, baseWidth, ...props }: IOuterProps) => {
  const { width, height } = getTypeThemeStyles(props);

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
const innerStyle = (props: IGenericProps) => {
  const {
    borderRadius,
    backgroundColor,
    paddingHorizontal,
    shadow,
  } = getTypeThemeStyles(props);

  return `
    ${applyPadding({ horizontal: paddingHorizontal })}
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

export const Inner = styled(View)<IGenericProps>`
  flex: 1;
  align-items: center;
  justify-content: center;
  ${innerStyle};
`;
