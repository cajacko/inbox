import AppError from 'src/lib/modules/AppError';
import { Children } from 'src/lib/types/libs';

interface IProps {
  children: Children;
  [key: string]: any;
}

/**
 * Return the component props without the child prop
 */
const propsWithoutChildren = (props: IProps) => {
  if (!props || typeof props !== 'object') {
    throw new AppError(
      'Invalid props passed to propsWithoutChildren',
      '100-003'
    );
  }

  const newProps = Object.assign({}, props);

  delete newProps.children;

  return newProps;
};

export default propsWithoutChildren;
