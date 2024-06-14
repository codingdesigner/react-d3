import React from 'react';

import styles from './Menu.module.css';

export function Menu() {
  return (
    <ul className={styles.Menu}>
      <li><a href='/'>Home</a></li>
      <li><a href='/next'>Next</a></li>
    </ul>
  );
}
