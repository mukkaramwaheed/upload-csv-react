import React, { useState, Suspense } from 'react';
import Title from './components/Title';
import styles from './App.module.css';
import Papa from 'papaparse';
import { ERROR_MEG, SUCCESS_MEG } from './components/Constant';
const Message = React.lazy(() => import('./components/Message'));

function App() {
  const [data, setData] = useState({
    meg: '',
    error: false,
  });
  const [target, setTarget] = useState('');

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
        let value = getValueFromCsvData(results?.meta?.fields);
        if (value && value !== undefined && value !== '') {
          let record = calculateResult(target, value);
          setData((data) => ({
            ...data,
            meg: `${SUCCESS_MEG} ${record}`,
            error: false,
          }));
        } else {
          setData((data) => ({
            ...data,
            meg: ERROR_MEG,
            error: true,
          }));
        }
      },
    });
  };

  /**
   * Add and subtract the number from target number
   * @returns number
   */

  const calculateResult = (targetNum, value) => {
    let record = 0;
    if (value < 0) {
      let useCsvValue = parseInt(targetNum) + parseInt(value);
      record = parseInt(useCsvValue) + parseInt(Math.abs(value));
    } else {
      let useCsvValue = parseInt(targetNum) + parseInt(value);
      record = parseInt(useCsvValue) - parseInt(value);
    }
    return record;
  };

  /**
   * Select single value from csv record
   * @returns number
   */
  const getValueFromCsvData = (arr) => {
    let value = '';
    for (let val of arr) {
      if (Number(val) && !isNaN(val)) {
        value = val;
        break;
      }
    }
    return value;
  };

  return (
    <>
      <header className={styles.header}>
        <Title text='Upload CSV' isWhiteText={true} />
      </header>
      <div className={`${styles.container} ${styles.textCenter}`}>
        <div className={`${styles.marg10}`}>
          <Suspense fallback={<div>Loading...</div>}>
            {data?.meg && <Message data={data} />}
          </Suspense>
        </div>
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
