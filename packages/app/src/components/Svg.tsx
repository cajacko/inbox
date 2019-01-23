/* eslint require-jsdoc: 0 id-length: 0 */
import * as React from 'react';
import RNSvg, { Path as RNPath } from 'react-native-svg';

interface ISvg {
  testID?: string;
}

interface IProps {
  d: string;
}

const getSvgProps = ({ testID, ...props }: ISvg) => ({
  ...props,
});

const getProps = (props: IProps) => props;

export const Svg = (props: ISvg) => <RNSvg {...getSvgProps(props)} />;

export const Path = (props: IProps) => <RNPath {...getProps(props)} />;
