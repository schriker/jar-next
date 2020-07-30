import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import qs from 'qs';
import parseURLQuery from 'helpers/parseURLQuery';
import Dropdown from 'components/Dropdown/Dropdown';
import styles from 'components/Sort/Sort.module.css';

type SortPropsType = {
  isOpen: boolean;
  close: () => void;
};

const Sort = ({ close, isOpen = true }: SortPropsType) => {
  const [value, setValue] = useState<string>('createdAt');
  const router = useRouter();
  useEffect(() => {
    const query = parseURLQuery(router.asPath, {});
    if (query.sort) {
      const [value] = Object.keys(query.sort);
      setValue(value);
    } else {
      setValue('createdAt');
    }
  }, [router.asPath]);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = parseURLQuery(router.asPath, {
      sort: { [e.target.value]: -1 },
    });
    const queryString = qs.stringify(query);
    setValue(e.target.value);
    router.push(`/[streamer]?${queryString}`, `/wonziu?${queryString}`);
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
              id="duration"
              name="sort"
              value="duration"
              onChange={onChange}
              checked={value === 'duration'}
            />
            <label htmlFor="duration">Czasu trwania</label>
          </div>
          <div className={styles.option}>
            <input
              type="radio"
              id="createdAt"
              name="sort"
              value="createdAt"
              onChange={onChange}
              checked={value === 'createdAt'}
            />
            <label htmlFor="createdAt">Daty nagrania</label>
          </div>
        </div>
      </Dropdown>
    </div>
  );
};

export default Sort;
