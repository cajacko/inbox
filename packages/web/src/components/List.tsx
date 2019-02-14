import * as React from 'react';
import View from 'src/components/View';
import { Children } from 'src/lib/types/libs';
import styled from 'styled-components';

interface IProps {
  contentContainerStyle?: { [key: string]: any };
  testID?: string;
  data: any[];
  keyExtractor?: (item: any, index: number) => string;
  renderItem: (props: { item: any; index: number }) => Children;
  contentInset?: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
}

const ScrollDiv = styled(View)`
  overflow-y: scroll;
  overflow-x: hidden;
  flex: 1;
  -webkit-overflow-scrolling: touch;
  align-items: center;
`;

interface IInnerProps {
  contentInset?: IProps['contentInset'];
}

/**
 * Get the inner margin based off the inset
 */
const innerMargin = ({ contentInset }: IInnerProps) => {
  if (!contentInset) return '';

  /**
   * Apply the position style
   */
  const apply = (pos: string) => {
    const val = contentInset[pos];

    if (!val) return '';

    return `margin-${pos}: ${val};`;
  };

  return `
    ${apply('top')}
    ${apply('left')}
    ${apply('right')}
    ${apply('bottom')}
  `;
};

const Inner = styled(View)<IInnerProps>`
  display: block;
  ${innerMargin}
`;

/**
 * Render a scrollable list
 */
const List = ({
  testID,
  contentContainerStyle,
  data,
  renderItem,
  keyExtractor,
  contentInset,
}: IProps) => (
  <ScrollDiv testID={testID}>
    <Inner style={contentContainerStyle} contentInset={contentInset}>
      {data.map((item, index) => (
        <React.Fragment
          key={keyExtractor ? keyExtractor(item, index) : item.key}
        >
          {renderItem({ item, index })}
        </React.Fragment>
      ))}
    </Inner>
  </ScrollDiv>
);

export default List;
