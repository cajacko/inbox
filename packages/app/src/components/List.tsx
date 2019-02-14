import * as React from 'react';
import { FlatList, ListRenderItem } from 'react-native';

interface IProps {
  contentContainerStyle?: { [key: string]: any };
  testID?: string;
  data: any[];
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
const List = (props: IProps) => <FlatList {...props} />;

export default List;
