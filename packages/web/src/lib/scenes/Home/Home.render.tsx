import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import HeaderWithDrawer from 'src/lib/components/Layout/HeaderWithDrawer';
import { IPassedProps } from 'src/lib/components/Layout/HeaderWithDrawer/HeaderWithDrawer.component';
import ReminderList from 'src/lib/components/ReminderList';
import { BACKGROUND_COLORS } from 'src/lib/config/styles/textIconColors';
import { SelectorStatus } from 'src/lib/store/reminders/selectors';
import { Container } from './Home.style';

interface IRenderProps {
  addButtonSpacing: number;
  maxContentWidth: number;
  isFullWidth: boolean;
}

/**
 * Get the header props
 */
const getHeaderProps = (props: RouteComponentProps): IPassedProps => {
  switch (props.location.pathname) {
    case '/':
      return {
        activeKey: 'inbox',
        backgroundColor: BACKGROUND_COLORS.PRIMARY_DARK,
        title: 'General.Title',
      };
    case '/done':
      return {
        activeKey: 'done',
        backgroundColor: BACKGROUND_COLORS.GREEN_DARK,
        title: 'General.Done',
      };
    default:
      return {
        activeKey: null,
        backgroundColor: BACKGROUND_COLORS.PRIMARY_DARK,
        title: 'General.Title',
      };
  }
};

/**
 * Get the test id for the scene container
 */
const getTestId = (props: RouteComponentProps): string | undefined => {
  switch (props.location.pathname) {
    case '/':
      return 'Home';
    case '/done':
      return 'Done';
    default:
      return undefined;
  }
};

/**
 * Get the list to display
 */
const getList = (props: RouteComponentProps): SelectorStatus => {
  switch (props.location.pathname) {
    case '/done':
      return 'DONE';
    default:
      return 'INBOX';
  }
};

/**
 * Dummy home scene scene
 */
const Home = (props: RouteComponentProps) => (
  <HeaderWithDrawer {...getHeaderProps(props)}>
    {({ addButtonSpacing, maxContentWidth, isFullWidth }: IRenderProps) => (
      <Container testID={getTestId(props)}>
        <ReminderList
          list={getList(props)}
          isFullWidth={isFullWidth}
          bottomMargin={addButtonSpacing}
          maxContentWidth={maxContentWidth}
        />
      </Container>
    )}
  </HeaderWithDrawer>
);

export default withRouter(Home);
