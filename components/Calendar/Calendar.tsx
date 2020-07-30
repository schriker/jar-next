import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Dropdown from 'components/Dropdown/Dropdown';
import { fetchDates } from 'helpers/api';
import styles from 'components/Calendar/Calendar.module.css';
import { useTransition, animated } from 'react-spring';
import { DayPickerSingleDateController } from 'react-dates';
import moment from 'moment';

type CalenderPropsType = {
  isOpen: boolean;
  setCalendarOpen: (isOpen: boolean) => void;
};

moment.locale('pl');

const Calendar = ({ isOpen, setCalendarOpen }: CalenderPropsType) => {
  const [date, setDate] = useState<moment.Moment>(moment());
  const [focused, setFocused] = useState<boolean>(true);

  const [dates, setDates] = useState<{ [key: string]: number }>({});
  const [datesSet, setDatesSet] = useState<Set<string> | null>(null);
  useEffect(() => {
    const fetchStreamsDates = async () => {
      const response = await fetchDates('wonziu');
      setDates(response);
      setDatesSet(new Set(Object.keys(response)));
    };
    fetchStreamsDates();
  }, []);

  const isDayBlockedHandler = (day: any) => {
    if (datesSet?.size) {
      const date = moment(day).format('YYYY-MM-DD');
      return !datesSet.has(date);
    } else {
      return false;
    }
  };

  const router = useRouter();
  const onDateChange = (day: moment.Moment | null) => {
    const date = moment(day).format('YYYY-MM-DD');
    router.push(`/[streamer]?date=${date}`, `/wonziu?date=${date}`);
    setDate(moment(day));
    setCalendarOpen(false);
  };

  useEffect(() => {
    if (!router.query.date) {
      setDate(moment());
    }
  }, [router.query.date]);

  const renderCalendarDay = (day: moment.Moment) => {
    const videos = dates[moment(day).format('YYYY-MM-DD')];
    return (
      <div>
        <span>{moment(day).format('DD')}</span>
        {videos && <span className={styles.videosCount}>{videos}</span>}
      </div>
    );
  };

  return (
    <div className={styles.wrapper}>
      <Dropdown isOpen={isOpen} close={() => setCalendarOpen(false)}>
        <DayPickerSingleDateController
          date={date}
          onDateChange={onDateChange}
          focused={focused}
          transitionDuration={0}
          isDayBlocked={isDayBlockedHandler}
          onOutsideClick={() => setCalendarOpen(false)}
          onFocusChange={() => setFocused(true)}
          hideKeyboardShortcutsPanel={true}
          daySize={45}
          renderDayContents={renderCalendarDay}
        />
      </Dropdown>
    </div>
  );
};

export default Calendar;
