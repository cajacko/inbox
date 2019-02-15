import * as React from 'react';
import { List } from 'src/components';
import NoReminders from 'src/lib/components/NoReminders';
import Reminder from 'src/lib/components/Reminder';
import sync from 'src/lib/utils/sync';
import {
  BACKGROUND_COLOR,
  Container,
  contentContainerStyle,
  contentInset,
} from './ReminderList.style';

export interface IContainerStateProps {
  reminders: string[];
  syncing: boolean;
}

interface IProps extends IContainerStateProps {
  bottomMargin?: number;
  maxContentWidth?: number;
  isFullWidth: boolean;
}

/**
 * Render an individual item
 */
const renderItem = (reminders: IProps['reminders'], isFullWidth: boolean) => ({
  item,
  index,
}: {
  item: string;
  index: number;
  }) => (
  <Reminder
    isFullWidth={isFullWidth}
    isFirst={index === 0}
    isLast={reminders.length - 1 === index}
    id={item}
  />
);

/**
 * Get the key for the list item
 */
const keyExtractor = (item: string) => item;

/**
 * On refresh run the sync action
 */
const onRefresh = () => sync('manual');

/**
 * Display a list of reminders
 */
const ReminderList = ({
  reminders,
  bottomMargin,
  maxContentWidth,
  isFullWidth,
  syncing,
}: IProps) =>
  (reminders.length === 0 ? (
    <NoReminders backgroundColor={BACKGROUND_COLOR} />
  ) : (
    <Container testID="ReminderList">
      <List
        refreshing={syncing}
        onRefresh={onRefresh}
        contentInset={contentInset(bottomMargin)}
        contentContainerStyle={contentContainerStyle(
          !isFullWidth,
          maxContentWidth
        )}
        testID="ReminderList__Scroll"
        data={reminders}
        keyExtractor={keyExtractor}
        renderItem={renderItem(reminders, isFullWidth)}
      />
    </Container>
  ));

export default ReminderList;
