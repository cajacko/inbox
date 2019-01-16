import * as React from "react";

interface IProps {
  text: string;
}

const Text = ({ text }: IProps) => <span>{text}</span>;

export default Text;
