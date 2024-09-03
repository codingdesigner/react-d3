'use client'
import React, { useState } from 'react';

import styles from './Pagination.module.css';

export interface PageButtonProps {
  pageNumber: number,
  curPage: number,
  onClickFunction: any,
}

const PageButton = ({ pageNumber, curPage, onClickFunction }: PageButtonProps) => {
  const buttonStyle = (pageNumber === curPage) ? styles.ButtonCurrentPage : styles.Button;
  return (<button className={buttonStyle} onClick={() => onClickFunction(pageNumber)}>{pageNumber}</button>)
};

export interface PaginationProps {
  curPage?: number,
  totalPages?: number,
  maxVisiblePages?: number;
}

export function Pagination({ totalPages = 14, maxVisiblePages = 5 }: PaginationProps) {
  const [curPage, setCurPage] = useState(10)

  const onPageButtonClick = (newPage: any) => {
    setCurPage(newPage);
  };

  const adjustedMaxVisiblePages = maxVisiblePages - 2

  let leftWing;
  let rightWing;
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


  let visibleStart = curPage - leftWing;
  let visibleEnd = curPage + rightWing;
  if (visibleStart <= 1) {
    visibleStart = 1;
    visibleEnd = maxVisiblePages - 1;
  } else if (visibleEnd >= totalPages) {
    visibleStart = totalPages - adjustedMaxVisiblePages;
    visibleEnd = totalPages;
  }

  const visiblePages = [1, totalPages];
  for (let i = visibleStart; i <= visibleEnd; i++) {
    (visiblePages.indexOf(i) === -1) && visiblePages.push(i)
  }

  let buttons = [];
  let activeElipsis = false;
  for (let i = 1; i <= totalPages; i++) {
    // is within range of visible pages
    if (visiblePages.indexOf(i) !== -1) {
      buttons.push(<li className={styles.ListItem} key={i}>
        <PageButton pageNumber={i} curPage={curPage} onClickFunction={onPageButtonClick} />
      </li>)
      activeElipsis = false;
    } else if (activeElipsis === false) {
      buttons.push(<li className={styles.ListItem} key={i}>
        …
      </li>);
      activeElipsis = true;
    }

  }

  return (
    <ul className={styles.Pagination}>
      {buttons}
    </ul>
  );
}
