import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleHideWatched } from 'store/slices/appData';
import { useTypedSelector } from 'store/rootReducer';
import Switch from 'react-switch';
import styles from 'components/ToggleWatched/ToggleWatched.module.css';

const ToggleWatched = () => {
  const hideWatched = useTypedSelector(
    (state) => state.appData.server.hideWatched
  );
  const dispatch = useDispatch();

  const onChange = () => {
    dispatch(toggleHideWatched());
  };

  return (
    <div className={styles.wrapper}>
      <Switch
        checked={hideWatched}
        handleDiameter={9}
        width={35}
        uncheckedIcon={false}
        checkedIcon={false}
        onColor="#f00"
        onHandleColor="#fff"
        offHandleColor="#bbb"
        offColor="#2C2C2C"
        height={15}
        onChange={onChange}
        activeBoxShadow="0px 0px 1px 2px rgba(0, 0, 0, 0.2)"
      />
      <span onClick={onChange}>Ukryj obejrzane</span>
    </div>
  );
};

export default ToggleWatched;
