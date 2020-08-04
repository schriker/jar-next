import React from 'react';
import qs from 'qs';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { toggleHideWatched } from 'store/slices/appData';
import { useTypedSelector } from 'store/rootReducer';
import SwitchButton from 'components/SwitchButton/SwitchButton';
import styles from 'components/ToggleWatched/ToggleWatched.module.css';

const ToggleWatched = () => {
  const router = useRouter();
  const hideWatched = useTypedSelector(
    (state) => state.appData.server.hideWatched
  );
  const dispatch = useDispatch();

  const onChange = () => {
    const query = {
      ...router.query,
    };
    delete query.streamer;
    delete query.page;
    const queryString = qs.stringify(query);
    dispatch(toggleHideWatched());
    if (Object.keys(query).length) {
      router.push(
        `/[streamer]?${queryString}`,
        `/${router.query.streamer}?${queryString}`
      );
    } else {
      router.push(`/[streamer]`, `/${router.query.streamer}`);
    }
  };

  return (
    <div className={styles.wrapper}>
      <SwitchButton checked={hideWatched} onChange={onChange} />
      <span onClick={onChange}>Ukryj obejrzane</span>
    </div>
  );
};

export default ToggleWatched;
