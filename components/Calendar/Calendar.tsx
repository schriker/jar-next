import React, { useState } from 'react';
import { DayPickerSingleDateController } from 'react-dates';
import moment from 'moment';

type CalenderPropsType = {
  isOpen: boolean;
  setCalendarOpen: (isOpen: boolean) => void;
};

const Calendar = ({ isOpen, setCalendarOpen }: CalenderPropsType) => {
  moment.locale('pl');
  const [focused, setFocused] = useState<boolean>(true);
  return (
    <DayPickerSingleDateController
      date={moment()}
      onDateChange={(date) => console.log(date)}
      focused={focused}
      isOutsideRange={() => false} // Can check the oldest video in db and disable those days and go no more than today day
      transitionDuration={0}
      numberOfMonths={2}
      onOutsideClick={() => setCalendarOpen(false)}
      onFocusChange={() => setFocused(true)}
      hideKeyboardShortcutsPanel={true}
    />
  );
};

export default Calendar;
