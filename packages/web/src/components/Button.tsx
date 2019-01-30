import * as React from 'react';
import { Children } from 'src/lib/types/libs';
import mergeClasses from 'src/utils/mergeClasses';

interface IProps {
  action?: () => void;
  children: Children;
  className?: string;
  testID?: string;
  style: React.CSSProperties;
}

/**
 * Merge the default styles with the custom ones
 */
const getStyles = (customStyles: React.CSSProperties) => ({
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
  display: 'flex',
  margin: 0,
  padding: 0,
  ...customStyles,
});

type event = React.KeyboardEvent<HTMLDivElement>;

type Ref = React.RefObject<HTMLDivElement>;

/**
 * On the enter key call the action
 */
const onKeyPress = (action?: () => void) => (e: event) => {
  if (!action) return;

  if (e.key === 'Enter') {
    action();
  }
};

/**
 * Render a button for the web
 */
const Button = React.forwardRef((
  {
    action, children, className, testID, style, ...props
  }: IProps,
  ref: Ref
) => (
    <div
      tabIndex={0}
      role="button"
      onClick={action}
      onKeyPress={onKeyPress(action)}
      className={mergeClasses(className, testID)}
      style={getStyles(style)}
      ref={ref}
      {...props}
    >
      {children}
    </div>
));

export default Button;
