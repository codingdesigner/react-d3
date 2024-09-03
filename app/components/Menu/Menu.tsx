import React from 'react';

import styles from './Menu.module.css';

export function Menu() {
  return (
    <ul className={styles.Menu}>
      <li><a href='/'>Home</a></li>
      <li><a href='/pages/bar-chart'>Bar Chart</a></li>
      <li><a href='/pages/line-plot'>Line Plot</a></li>
      <li><a href='/pages/pagination'>Pagination</a></li>
    </ul>
  );
}
