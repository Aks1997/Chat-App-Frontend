import React from 'react';

import classes from './message.module.css';

const Message = (props)=>{
    let date = new Date(props.time).toTimeString();
    //let date= moment(props.date).format('DD-MM-YYYY HH:mm');
    var mess;
    if(props.from.toLowerCase()==='me'){
        mess=classes.message_me;
    }
    else{
        mess=classes.message_from;
    }
    return(
        <div className={classes.message_outer_div}>
            {
                props.from.toLowerCase()!=='me' ?
                <div className={classes.details}>
                    <h4>{props.from}</h4>
                    <h6>{date}</h6>
                </div> :
                null
            }
            <div className={[mess, classes.message_common].join(' ')}>
                <p className={classes.messdiv}>{props.message}</p>
            </div>
            {
                props.from.toLowerCase()==='me' ?
                <div className={classes.details}>
                    <h4>{props.from}</h4>
                    <h6>{date}</h6>
                </div> :
                null
            }
        </div>
    );
}

export default Message;