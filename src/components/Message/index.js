import React from 'react';
const Message = ({ data, styling }) => {
  return data?.result === true ? (
    <>
      <div className={`${styling.marg10}`}>
        <b>Csv values:</b> {data?.values.join(',')}
      </div>
      <div className={`${styling.marg10}`}>
        <b>Formula to calculate the target value:</b> {data?.formula}
      </div>
      <div className={`${styling.marg10}`}>
        <b>Calculated value from formula is:</b> {data?.formulaValue}
      </div>
    </>
  ) : (
    <>
      <div className={`${styling.marg10}`}>{data?.meg}</div>
    </>
  );
};
export default Message;
