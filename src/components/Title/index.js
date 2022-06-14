import React from 'react';
import styles from './Title.module.css'; 

const Title = ({text, type, isWhiteText}) => {
  if (type === "h2") {
    return <h2 className={styles.h2}>{text}</h2>;
  }
  return <h1 className={`${styles.h1} ${isWhiteText ? styles.title : ""}`}>{text}</h1>
}

export default Title;