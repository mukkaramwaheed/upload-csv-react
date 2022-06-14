import React from 'react';
import meg from './Message.module.css'

const Message = ({ data }) => {
    const infoClass = data?.error ? meg.danger : meg.success;
    return <div className={`${meg.textCenter} ${infoClass}`}> {data?.meg}</div>;
}

export default Message;