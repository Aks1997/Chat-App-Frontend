import React from 'react';

const Message = (props)=>{
    let date = new Date(props.time).toString();
    return(
        <div>
            <h4>{props.from}</h4>
            <h6>{date}</h6>
            <p>{props.message}</p>
        </div>
    );
}

export default Message;