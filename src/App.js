import { useState } from 'react'
import Title from './components/Title'
import Message from './components/Message';
import styles from './App.module.css'
import Papa from 'papaparse'
import { ERROR_MEG, SUCCESS_MEG } from './components/Constant';

function App() {

  const [data, setData] = useState({
    meg: '',
    error: false

  })
  const number = 532;
  const changeHandler = (event) => {
    Papa.parse(event?.target?.files[0], {
      header: true,
      skipEmptyLines: false,
      complete: function (results) {
        let result = results?.meta?.fields?.filter((val) => {
          let value = parseInt(val)
          if (!isNaN(val) && val > 0) {
            return parseInt(value)
          }
        })
        if (result?.length > 0 && result !== undefined) {
          let getLargestNumber = Math.max(...result)
          let targetValue = number - getLargestNumber;
          targetValue += getLargestNumber
          setData((data) => ({ ...data, meg: `${SUCCESS_MEG} ${targetValue}`, error: false }));
        } else {
          setData((data) => ({
            ...data,
            meg: ERROR_MEG,
            error: true,
          }));
        }
      },
    })
  }
  return (
    <>
      <header className={styles.header}>
        <Title text='Upload CSV' isWhiteText={true} />
      </header>
      <div className={`${styles.container}`}>
        <input
          type='file'
          name='file'
          onChange={changeHandler}
          accept='.csv'
          style={{ display: 'block', margin: '10px auto' }}
        />
      <Message data={data} />
      </div>
    </>
  );
}

export default App
