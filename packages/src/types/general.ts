export interface IError {
  label: string;
  title: string;
  message: string;
  code: string;
}

export type Text = string | { _textFromConst: string };
