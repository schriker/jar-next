import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Dropdown from 'components/Dropdown/Dropdown';
import styles from 'components/Sort/Sort.module.css';

type SortPropsType = {
  isOpen: boolean;
  close: () => void;
};

const Sort = ({ close, isOpen = true }: SortPropsType) => {
  const [value, setValue] = useState<string>('');
  const router = useRouter();
  console.log(router.query);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Make RouteChange with query
    console.log('Selected:', e.target.value);
    setValue(e.target.value);
  };
  return (
    <div className={styles.wrapper}>
      <Dropdown isOpen={isOpen} close={close}>
        <div className={styles.sort}>
          <span>Sortuj według:</span>
          <div className={styles.option}>
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
          <div className={styles.option}>
            <input
              type="radio"
              id="time"
              name="sort"
              value="time"
              onChange={onChange}
              checked={value === 'time'}
            />
            <label htmlFor="time">Czasu trwania</label>
          </div>
          {router.query.search && (
            <div className={styles.option}>
              <input
                type="radio"
                id="date"
                name="sort"
                value="date"
                onChange={onChange}
                checked={value === 'date'}
              />
              <label htmlFor="date">Daty nagrania</label>
            </div>
          )}
        </div>
      </Dropdown>
    </div>
  );
};

export default Sort;
