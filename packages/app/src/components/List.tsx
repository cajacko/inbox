import * as React from 'react';
import { FlatList, ListRenderItem, RefreshControl } from 'react-native';
import View from 'src/components/View';
import platform from 'src/utils/platform';
import styled from 'styled-components';

interface IFooterProps {
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

interface IProps extends IFooterProps {
  onRefresh: () => void;
  refreshing?: boolean;
}

const Spacing = styled(View)<{ height?: number }>`
  height: ${({ height }) => height || 0};
`;

/**
 * Display some spacing in the header or footer. Only for android. As
 * contentInset does not work on android
 */
const AndroidSpacing = ({ contentInset }: IFooterProps, isTop: boolean) => {
  if (platform() !== 'android') return null;
  if (!contentInset) return null;
  if (isTop && !contentInset.top) return null;
  if (!isTop && !contentInset.bottom) return null;

  return <Spacing height={isTop ? contentInset.top : contentInset.bottom} />;
};

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
    ListHeaderComponent={AndroidSpacing(props, true)}
    ListFooterComponent={AndroidSpacing(props, false)}
    {...props}
  />
);

export default List;
