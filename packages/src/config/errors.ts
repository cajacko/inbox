const errors = {
  '100-001': {
    label: 'General Error',
    message: 'Errors.General.Message',
    title: 'Errors.General.Title',
  },
  '100-002': {
    label: '404',
    message: 'Errors.404.Message',
    title: 'Errors.404.Title',
  },
  '100-003': {
    label: 'Dev Error',
    message: 'Errors.DevError.Message',
    title: 'Errors.DevError.Title',
  },
};

export type ErrorCode = keyof typeof errors;

export default errors;
