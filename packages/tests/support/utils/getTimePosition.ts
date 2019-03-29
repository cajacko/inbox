import * as moment from 'moment';

const times: string[] = [];
const setTime = new Date(2018, 1, 1, 0, 0);

while (setTime.getDate() === 1) {
  const timeString = moment(setTime).format('HH:mm');
  times.push(timeString);
  setTime.setMinutes(setTime.getMinutes() + 15);
}

const getTimePosition = (time: string) => {
  const index = times.findIndex(timeString => timeString === time);

  if (index === -1) {
    throw new Error(`Could not get the index for the specifed time: ${time}`);
  }

  return index;
};

export default getTimePosition;
