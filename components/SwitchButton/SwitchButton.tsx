import React from 'react';
import Switch from 'react-switch';

type SwitchButtonPropsType = {
  checked: boolean;
  onChange: () => void;
};

const SwitchButton = ({ checked, onChange }: SwitchButtonPropsType) => {
  return (
    <Switch
      checked={checked}
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
  );
};

export default SwitchButton;
