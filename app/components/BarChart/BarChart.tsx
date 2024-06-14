import React from 'react';

import styles from './BarChart.module.css';

export interface BarChartProps {
  prop?: string;
}

export function BarChart({prop = 'default value'}: BarChartProps) {
  return <div className={styles.BarChart}>BarChart {prop}</div>;
}
