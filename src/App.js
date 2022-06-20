import React, { useState, Suspense, useEffect } from 'react';
import Title from './components/Title';
import styles from './App.module.css';
import Papa from 'papaparse';
import { getEquation } from './components/utilis';

function App() {
  const [data, setData] = useState({
    formula: '',
    result: ''
  });
  const [target, setTarget] = useState();

  const calResult = getEquation(
    [...new Set([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])],
    [4, 13, 8, 12]
  );
  console.log('change 1', calResult);
  const handlerTarget = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    setTarget(value);
  };

  const handlerCsv = (event) => {
    //Reset meg state
    setData((data) => ({
      ...data,
      meg: '',
      error: false,
    }));

    //Parse csv data
    Papa.parse(event?.target?.files[0], {
      header: true,
      skipEmptyLines: false,
      complete: function (results) {
          const data = getEquation(
            [...new Set(results)],
            [4, 13, 8, 12]
          );
        console.log('change ', data);

      },
    });
  };

  return (
    <>
      <header className={styles.header}>
        <Title text='Upload CSV ' isWhiteText={true} />
      </header>
      <div className={`${styles.container} ${styles.textCenter}`}>
        <div className={`${styles.marg10}`}>
          <span className={`${styles.margRight15}`}>
            Set target
            <b className={`${styles.danger}`}>*</b>
          </span>
          <input
            type='text'
            name='target'
            placeholder='Set target value'
            autoComplete='off'
            onChange={handlerTarget}
            value={target}
          />
        </div>
        <input
          disabled={target ? false : true}
          type='file'
          name='file'
          onChange={handlerCsv}
          onClick={(e) => (e.target.value = null)}
          accept='.csv'
        />
      </div>
    </>
  );
}

export default App;
