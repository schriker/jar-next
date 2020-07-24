import React, { useState } from 'react';
import styles from 'components/Calendar/Calendar.module.css';
import Shadow from 'components/Shadow/Shadow';
import { useTransition, animated } from 'react-spring';
import { DayPickerSingleDateController } from 'react-dates';
import moment from 'moment';

type CalenderPropsType = {
  isOpen: boolean;
  setCalendarOpen: (isOpen: boolean) => void;
};

const Calendar = ({ isOpen, setCalendarOpen }: CalenderPropsType) => {
  moment.locale('pl');
  const [focused, setFocused] = useState<boolean>(true);
  const transitions = useTransition(isOpen, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  const onMonthChange = (month: moment.Moment) => {
    console.log('Month changed.', month);
  };

  return (
    <div className={styles.wrapper}>
      <Shadow isOpen={isOpen} />
      {transitions.map(
        ({ item, key, props }) =>
          item && (
            <animated.div className={styles.calendar} key={key} style={props}>
              <DayPickerSingleDateController
                date={moment()}
                onDateChange={(date) => console.log(date)}
                focused={focused}
                transitionDuration={0}
                isDayBlocked={() => false} // Block all days except one with streams
                onNextMonthClick={onMonthChange}
                onPrevMonthClick={onMonthChange}
                numberOfMonths={2}
                onOutsideClick={() => setCalendarOpen(false)}
                onFocusChange={() => setFocused(true)}
                hideKeyboardShortcutsPanel={true}
              />
            </animated.div>
          )
      )}
    </div>
  );
};

export default Calendar;
