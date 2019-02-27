const NO_LOG = false;

const log = {
  AFTER: false,
  BEFORE: false,
  CONDITIONAL: false,
  LOGIN: false,
  NAVIGATE: false,
  SAVE_LOGS: true,
  VISIBLE: false,
  WAIT_FOR: false,
};

export const LOG_AS_HAPPENS = false;
export const LOG_IN_ERROR = true;
export const LOG_ERRORS_AS_HAPPEN = true;

export default (NO_LOG ? {} : log);
