/* eslint require-jsdoc: 0 id-length: 0 */
import * as React from 'react';
import mergeClasses from 'src/utils/mergeClasses';

interface ISvg extends React.SVGProps<SVGSVGElement> {
  testID?: string;
}

interface IProps {
  d: string;
}

const getSvgProps = ({
  testID,
  ...props
}: ISvg): React.SVGProps<SVGSVGElement> => ({
  className: mergeClasses('', testID),
  ...props,
});

const getProps = (props: IProps) => props;

export const Svg = (props: ISvg) => <svg {...getSvgProps(props)} />;

export const Path = (props: IProps) => <path {...getProps(props)} />;
