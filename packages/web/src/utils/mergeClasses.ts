/**
 * Merge 2 classes together
 */
const mergeClasses = (class1?: string, class2?: string) =>
  `${class1 || ''} ${class2 || ''}`;

export default mergeClasses;
