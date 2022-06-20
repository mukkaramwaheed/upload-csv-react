import React, { useState, Suspense, useEffect } from 'react';
import Title from './components/Title';
import styles from './App.module.css';
import Papa from 'papaparse';
import { getEquation } from './components/utilis';
// import { ERROR_MEG, SUCCESS_MEG } from './components/Constant';
const Message = React.lazy(() => import('./components/Message'));

function App() {
  const [data, setData] = useState({
    meg: '',
    error: false,
  });
  const [target, setTarget] = useState();
  const [csvData, setCsvData] = useState({
    allValues: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 9],
    // allValues: [12,13,14,15,16,17]
  });


  const result = getEquation([...new Set(csvData.allValues)], [4,13,8,12]);
  console.log('change 1', result);

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
        
      },
    });
  };

  const resetState = () => {
    setData({
      meg: '',
      error: false,
    });
    setCsvData({
      allValues: [],
      selected: '',
    });
  };
  useEffect(() => {
    if (target === '') {
      resetState();
    }
  }, [target]);
  return (
    <>
      <header className={styles.header}>
        <Title text='Upload CSV ' isWhiteText={true} />
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
