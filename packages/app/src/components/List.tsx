import * as React from 'react';
import { FlatList, ListRenderItem, RefreshControl } from 'react-native';

interface IProps {
  contentContainerStyle?: { [key: string]: any };
  testID?: string;
  data: any[];
  onRefresh: () => void;
  refreshing?: boolean;
  keyExtractor?: (item: any, index: number) => string;
  renderItem: ListRenderItem<any>;
  contentInset?: {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
  };
}

/**
 * Render a scrollable list
 */
const List = ({ onRefresh, refreshing, ...props }: IProps) => (
  <FlatList
    refreshControl={
      <RefreshControl
        enabled={!!onRefresh}
        refreshing={!!refreshing}
        onRefresh={onRefresh}
      />
    }
    {...props}
  />
);

export default List;
