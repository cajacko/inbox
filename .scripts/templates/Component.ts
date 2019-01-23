/* eslint max-len: 0 */
import * as React from 'react';
// tslint:disable-next-line
import { Svg<%= imports %> } from 'src/components/Svg';
import getSvgProps from 'src/lib/utils/getSvgProps';

interface IProps {
  size: number;
  testID?: string;
}

/**
 * <%= name %> icon
 */
const <%= name %> = ({ size, testID }: IProps) => (
  <Svg testID={testID} {...getSvgProps(size, '<%= viewBox %>')}>
    <%- content %>
  </Svg>
);

export default <%= name %>;
