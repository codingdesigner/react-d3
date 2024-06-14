import React from 'react';

import styles from './Menu.css';

export interface MenuProps {
  prop?: string;
}

export function Menu({ prop = 'default value' }: MenuProps) {
  return (
    <ul className={styles.Menu}>
      <li><a href='/'>Home</a></li>
      <li><a href='/next'>Next</a></li>
    </ul>
  );
}
