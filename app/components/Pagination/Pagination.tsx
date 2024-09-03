'use client'
import React, { useState } from 'react';

import styles from './Pagination.module.css';

export interface PageButtonProps {
  pageNumber: number,
  curPage: number,
  onClickFunction: (page: number) => void, // Fix: Specify the type for better type safety
}

const PageButton = ({ pageNumber, curPage, onClickFunction }: PageButtonProps) => {
  const buttonStyle = (pageNumber === curPage) ? styles.ButtonCurrentPage : styles.Button;
  return (
    <button className={buttonStyle} onClick={() => onClickFunction(pageNumber)}>
      {pageNumber}
    </button>
  );
};

export interface PaginationProps {
  totalPages?: number,
  maxVisiblePages?: number;
}

export function Pagination({ totalPages = 14, maxVisiblePages = 5 }: PaginationProps) {
  // use state to manage curPage
  const [curPage, setCurPage] = useState(10)

  // button action to change current page
  const onPageButtonClick = (newPage: any) => {
    setCurPage(newPage);
  };

  // account for the first and last page
  const adjustedMaxVisiblePages = maxVisiblePages - 2

  // Calculate how many items should be on either side of curPage
  let leftWing: number;
  let rightWing: number;
  if (adjustedMaxVisiblePages % 2 === 0) {
    if (curPage <= totalPages * 0.5) {
      leftWing = adjustedMaxVisiblePages / 2 - 1;
      rightWing = adjustedMaxVisiblePages / 2;
    } else {
      leftWing = adjustedMaxVisiblePages / 2;
      rightWing = adjustedMaxVisiblePages / 2 - 1;
    }
  } else {
    leftWing = Math.floor(adjustedMaxVisiblePages / 2);
    rightWing = Math.floor(adjustedMaxVisiblePages / 2);
  }

  // which buttons to show?
  let visibleStart = curPage - leftWing;
  let visibleEnd = curPage + rightWing;
  if (visibleStart <= 1) {
    visibleStart = 1;
    visibleEnd = maxVisiblePages - 1;
  } else if (visibleEnd >= totalPages) {
    visibleStart = totalPages - adjustedMaxVisiblePages;
    visibleEnd = totalPages;
  }

  // Build an array of visible buttons
  const visiblePages: number[] = [1, totalPages];
  for (let i = visibleStart; i <= visibleEnd; i++) {
    if (!visiblePages.includes(i)) visiblePages.push(i);
  }

  // Sort pages to ensure correct order
  visiblePages.sort((a, b) => a - b);

  // Generate button components
  let buttons: JSX.Element[] = [];
  let activeElipsis = false;
  for (let i = 1; i <= totalPages; i++) {
    if (visiblePages.includes(i)) {
      buttons.push(
        <li className={styles.ListItem} key={i}>
        <PageButton pageNumber={i} curPage={curPage} onClickFunction={onPageButtonClick} />
        </li>
      );
      activeElipsis = false;
    } else if (!activeElipsis) {
      buttons.push(
        <li className={styles.ListItem} key={`ellipsis-${i}`}>
        …
        </li>
      );
      activeElipsis = true;
    }
  }

  return (
    <ul className={styles.Pagination}>
      {buttons}
    </ul>
  );
}
