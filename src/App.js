import React, { useState, useEffect, Suspense } from 'react';
import styles from './App.module.css';
import Title from './components/Title';
import Papa from 'papaparse';
import {
  checkValuesExistInCsv,
  createEquation,
  createUniqueAndValidArray,
  showMeg,
} from './components/utilis';
const Message = React.lazy(() => import('./components/Message'));
function App() {
  const [data, setData] = useState({
    formula: '',
    result: '',
    meg: '',
    sumValues: [],
    values: [],
    formulaValue: '',
  });
  const targetArr = [3, 4, 8, 7, 12, 5];
  const [target, setTarget] = useState('');
  const handlerTarget = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value) {
      setTarget(parseFloat(value));
    } else {
      setTarget('');
    }
  };

  const handlerCsv = (event) => {
    resetState();
    //Parse csv data
    Papa.parse(event?.target?.files[0], {
      header: true,
      skipEmptyLines: false,
      complete: function (results) {
        let csvValues = results?.meta?.fields;
        setData((data) => ({
          ...data,
          values: csvValues,
        }));
        parseCsvValues(csvValues);
      },
    });
  };

  const parseCsvValues = (parseValues) => {
    if (parseValues && parseValues?.length > 0) {
      let result = createUniqueAndValidArray(parseValues);
      if (result && result?.length > 0) {
        let status = result?.find(
          (val) => parseFloat(val) === parseFloat(target)
        );
        if (status) {
          setData((data) => ({
            ...data,
            result: false,
            meg: showMeg('success', 'Target value found in csv'),
          }));
        } else if (result && !status) {
          let valuesExist = checkValuesExistInCsv(targetArr, result);
          if (valuesExist) {
            let getData = createEquation(result);
            if (getData?.value === target) {
              setData((data) => ({
                ...data,
                result: true,
                formula: getData?.equation,
                formulaValue: getData?.value,
                meg: showMeg('success', 'Value matched with the target value'),
              }));
            } else {
              setData((data) => ({
                ...data,
                result: false,
                meg: showMeg('error', 'Target value not created'),
              }));
            }
          } else {
            setData((data) => ({
              ...data,
              result: false,
              meg: showMeg(
                'error',
                'Values that need to create target number not found in csv'
              ),
            }));
          }
        } else {
          setData((data) => ({
            ...data,
            result: false,
            meg: showMeg('error', 'Invalid csv'),
          }));
        }
      } else {
        setData((data) => ({
          ...data,
          result: false,
          meg: showMeg('error', 'Invalid csv or no number found'),
        }));
      }
    }
  };

  const resetState = () => {
    setData((data) => ({
      ...data,
      formula: '',
      result: '',
      meg: '',
      sumValues: [],
      values: [],
      formulaValue: '',
    }));
  };
  useEffect(() => {
    if (target === '') {
      resetState();
    }
  }, [target]);

  return (
    <>
      <header className={styles.header}>
        <Title text='React CSV parser' isWhiteText={true} />
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
        <Suspense fallback={<div>Loading...</div>}>
          <Message data={data} styling={styles} />
        </Suspense>
      </div>
    </>
  );
}

export default App;
