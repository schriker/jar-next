import React, { useState } from 'react';
import Dropdown from 'components/Dropdown/Dropdown';
import styles from 'components/Sort/Sort.module.css';

type SortPropsType = {
  isOpen: boolean;
  close: () => void;
};

const Sort = ({ close, isOpen }: SortPropsType) => {
  const [value, setValue] = useState<string>('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Make RouteChange with query
    setValue(e.target.value);
  };

  return (
    <div className={styles.wrapper}>
      <Dropdown isOpen={isOpen} close={close}>
        <div className={styles.sort}>
          <span>Sortuj według:</span>
          <div>
            <input
              type="radio"
              id="views"
              name="sort"
              value="views"
              onChange={onChange}
              checked={value === 'views'}
            />
            <label htmlFor="views">Wyświetleń</label>
          </div>
          <div>
            <input
              type="radio"
              id="time"
              name="sort"
              value="time"
              onChange={onChange}
              checked={value === 'time'}
            />
            <label htmlFor="time">Długości</label>
          </div>
        </div>
      </Dropdown>
    </div>
  );
};

export default Sort;
