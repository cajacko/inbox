export interface ICondition {
  positive: boolean;
  wait: boolean;
}

const ensureCondition = (condition: string): ICondition => {
  switch (condition) {
    case 'will be':
      return {
        positive: true,
        wait: true,
      };

    case 'will not be':
      return {
        positive: false,
        wait: true,
      };

    case 'is':
      return {
        positive: true,
        wait: false,
      };

    case 'is not':
      return {
        positive: false,
        wait: false,
      };

    default:
      throw new Error(`Received and unexpected condition: ${condition}`);
  }
};

export default ensureCondition;
