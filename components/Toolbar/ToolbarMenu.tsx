import React, { useState } from 'react';
import styles from 'components/Toolbar/ToolbarMenu.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Calendar from 'components/Calendar/Calendar';
import {
  faCalendar,
  faHeart,
  faFilter,
} from '@fortawesome/free-solid-svg-icons';

const ToolbarMenu = () => {
  const [isCalendarOpen, setCalendarOpen] = useState<boolean>(false);

  const links = [
    {
      icon: <FontAwesomeIcon icon={faCalendar} />,
      text: 'Kalenarz',
      onClick: () => setCalendarOpen((isCalendarOpen) => !isCalendarOpen),
    },
    {
      icon: <FontAwesomeIcon icon={faFilter} />,
      text: 'Filtruj',
      onClick: () => console.log('Test 2'),
    },
    {
      icon: <FontAwesomeIcon icon={faHeart} />,
      text: 'Ulubione',
      onClick: () => console.log('Test 3'),
    },
  ];

  return (
    <div>
      <ul className={styles.toolbarMenu}>
        {links.map((link, index) => {
          return (
            <li key={index} onClick={link.onClick}>
              <div className={styles.toolbarMenuIcon}>{link.icon}</div>
              <span>{link.text}</span>
            </li>
          );
        })}
      </ul>
      <Calendar isOpen={isCalendarOpen} setCalendarOpen={setCalendarOpen} />
    </div>
  );
};

export default ToolbarMenu;
