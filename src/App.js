import React, { useState, useEffect } from 'react';
import styles from './App.module.css';
import Title from './components/Title';
import Papa from 'papaparse';
import { getEquation } from './components/utilis';

function App() {
  const [data, setData] = useState({
    formula: '',
    result: '',
    sumValues: [],
    values: [],
  });

  const [target, setTarget] = useState(532);
  const handlerTarget = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    setTarget(value);
  };

  const handlerCsv = (event) => {
    //Parse csv data
    Papa.parse(event?.target?.files[0], {
      header: true,
      skipEmptyLines: false,
      complete: function (results) {
        setData((data) => ({
          ...data,
          values: results?.meta?.fields,
        }));
      },
    });
  };

  const info = (data) => {
    if (data && data.length > 0) {
      let copyData = [...data];
      let result = getEquation([...new Set(copyData)], [4, 13, 16]);
      return result;
    }
  };

  useEffect(() => {
    info(data.values);
  }, [data.values]);

  return (
    <>
      {/* <header className={styles.header}>
        <Title text='Upload CSV ' isWhiteText={true} />
      </header> */}
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
