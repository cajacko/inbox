const NO_LOG = true;

const log = {
  AFTER: false,
  BEFORE: false,
  CONDITIONAL: false,
  VISIBLE: false,
  WAIT_FOR: false,
};

export default (NO_LOG ? {} : log);
