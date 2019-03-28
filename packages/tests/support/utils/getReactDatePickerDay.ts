/**
 * Get the day with leading 0's
 */
const getReactDatePickerDay = (day: number) => {
  const leading = `000000000${String(day)}`;

  return leading.substr(leading.length - 3);
};

export default getReactDatePickerDay;
