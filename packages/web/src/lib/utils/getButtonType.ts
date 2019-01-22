import get from 'lodash/get';
import buttons, { IType } from 'src/lib/config/styles/buttons';
import AppError from 'src/lib/modules/AppError';

/**
 * Get the button type
 */
const getButtonType = (id: string) => {
  const type: IType | undefined = get(buttons, id);

  if (!type) {
    throw new AppError('Could not get button type', '100-003');
  }

  return type;
};

export default getButtonType;
