import { useState } from 'react';
import Title from './components/Title';
import styles from './App.module.css';

function App() {


  return (
    <>
      <header className={styles.header}>
        <Title text="Upload CSV" isWhiteText={true} />
      </header>
      
    </>
  );
}

export default App;
