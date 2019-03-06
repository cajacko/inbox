/* eslint max-lines: 0 */
import enGB from 'date-fns/locale/en-GB';
import * as React from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import {
  BACKGROUND_COLORS,
  COLORS_FOR_BACKGROUND,
} from 'src/lib/config/styles/textIconColors';
import CustomDate from 'src/lib/modules/CustomDate';
import { Children } from 'src/lib/types/libs';
import marketingCopy from 'src/lib/utils/marketingCopy';
import { createGlobalStyle } from 'styled-components';

registerLocale('en-GB', enGB);

interface IProps {
  onChange: () => void;
  showTimeOnly?: boolean;
  testID?: string;
  backgroundComponent: Children;
}

const daySpacing = 14;
const headingColor = BACKGROUND_COLORS.GREY_LIGHTER;
const backgroundColor = BACKGROUND_COLORS.WHITE;
const selectedBackgroundColor = BACKGROUND_COLORS.PRIMARY;

const GlobalStyle = createGlobalStyle`
  .react-datepicker {
    background-color: ${backgroundColor};
    color: ${COLORS_FOR_BACKGROUND[backgroundColor].greyedOut};
    font-size: 14px;
  }

  .react-datepicker__navigation:hover,
  .react-datepicker__day:hover,
  .react-datepicker__time-list-item:hover {
    opacity: 0.5;
  }

  .react-datepicker__navigation {
    width: 50%;
    cursor: pointer;
    padding: ${daySpacing}px;
    appearance: none;
    border: none;
    background-color: ${headingColor};
    color: ${COLORS_FOR_BACKGROUND[headingColor].default};
  }

  .react-datepicker__navigation--previous {
    float: left;
    text-align: left;
  }

  .react-datepicker__navigation--next {
    text-align: right;
  }

  .react-datepicker__month-container {
    display: flex;
    flex-direction: column;
  }

  .react-datepicker__header {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${headingColor};
  }

  .react-datepicker__current-month {
    font-weight: 600;
    color: ${COLORS_FOR_BACKGROUND[headingColor].default};
  }

  .react-datepicker__month {
    display: flex;
    flex-direction: column;
  }

  .react-datepicker__day-names {
    display: flex;
    flex-direction: row;
  }

  .react-datepicker__day-name {
    display: flex;
    flex: 1;
    padding: ${daySpacing}px;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    color: ${COLORS_FOR_BACKGROUND[headingColor].default};
  }

  .react-datepicker__week {
    display: flex;
    flex-direction: row;
  }

  .react-datepicker__day {
    display: flex;
    flex: 1;
    cursor: pointer;
    padding: ${daySpacing}px;
    align-items: center;
    justify-content: center;
  }

  .react-datepicker__day--today {
    font-weight: 600;
  }

  .react-datepicker__day--selected {
    background-color: ${selectedBackgroundColor};
    color: ${COLORS_FOR_BACKGROUND[selectedBackgroundColor].default};
    border-radius: 50%;
  }

  .react-datepicker-time__header {
    display: flex;
    flex: 1;
    padding: ${daySpacing}px;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    color: ${COLORS_FOR_BACKGROUND[headingColor].default};
  }

  .react-datepicker__time-list {
    list-style: none;
    margin: 0;
    padding: 0;
    height: 200px;
    overflow: auto;
  }

  .react-datepicker__time-list-item {
    display: flex;
    flex: 1;
    padding: 10px ${daySpacing}px;
    align-items: center;
    justify-content: center;
    width: 200px;
    cursor: pointer;
  }
`;

/**
 * Render the datepicker
 */
class DatePickerComponent extends React.Component<IProps> {
  /**
   * Initialise the class, set the initial state and bind the methods
   */
  constructor(props: IProps) {
    super(props);

    this.state = {};

    this.defaultSelectedDate = new CustomDate();
  }

  private defaultSelectedDate: CustomDate;

  /**
   * Render the component
   */
  public render() {
    // eslint-disable-next-line
    const selected = new Date(this.defaultSelectedDate.getTime());

    return (
      <React.Fragment>
        <GlobalStyle />
        <DatePicker
          calendarClassName={this.props.testID}
          inline
          onChange={this.props.onChange}
          locale="en-GB"
          selected={selected}
          showTimeSelect={!!this.props.showTimeOnly}
          showTimeSelectOnly={!!this.props.showTimeOnly}
          timeIntervals={15}
          dateFormat="h:mm aa"
          timeCaption={marketingCopy.get('DatePicker.Time')}
        />
      </React.Fragment>
    );
  }
}

export default DatePickerComponent;
