import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import styles from 'components/Toolbar/ToolbarMenu.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const Calendar = dynamic(() => import('components/Calendar/Calendar'), {
  ssr: false,
});
const Sort = dynamic(() => import('components/Sort/Sort'), {
  ssr: false,
});
import {
  faCalendar,
  faHeart,
  faFilter,
} from '@fortawesome/free-solid-svg-icons';

const ToolbarMenu = () => {
  const [isCalendarOpen, setCalendarOpen] = useState<boolean>(false);
  const [isSortOpen, setSortOpen] = useState<boolean>(false);

  const links = [
    {
      icon: <FontAwesomeIcon icon={faCalendar} />,
      text: 'Kalendarz',
      child: <Calendar isOpen={isCalendarOpen} setCalendarOpen={setCalendarOpen} />,
      onClick: () => setCalendarOpen((isCalendarOpen) => !isCalendarOpen),
    },
    {
      icon: <FontAwesomeIcon icon={faFilter} />,
      text: 'Sortuj',
      child: <Sort isOpen={isSortOpen} close={() => setSortOpen(false)} />,
      onClick: () => setSortOpen((isOpen) => !isOpen),
    },
    {
      icon: <FontAwesomeIcon icon={faHeart} />,
      text: 'Ulubione',
      child: null,
      onClick: () => console.log('Test 3'),
    },
  ];

  return (
    <div>
      <ul className={styles.toolbarMenu}>
        {links.map((link, index) => {
          return (
            <li key={index}>
              <a onClick={link.onClick}>
                <div className={styles.toolbarMenuIcon}>{link.icon}</div>
                <span>{link.text}</span>
              </a>
              {link.child}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ToolbarMenu;
