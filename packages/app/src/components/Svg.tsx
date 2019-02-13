/* eslint require-jsdoc: 0 id-length: 0 */
import * as React from 'react';
import RNSvg, { Path as RNPath } from 'react-native-svg';
import { Children } from 'src/lib/types/libs';

interface ISvg {
  testID?: string;
  children: Children;
}

interface IProps {
  d: string;
  fill?: string;
}

const getSvgProps = ({ testID, ...props }: ISvg) => ({
  ...props,
});

const getProps = (props: IProps) => props;

export const Svg = (props: ISvg) => <RNSvg {...getSvgProps(props)} />;

export const Path = (props: IProps) => <RNPath {...getProps(props)} />;
