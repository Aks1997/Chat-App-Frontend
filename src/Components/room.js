import React from 'react';

import classes from './room.module.css';

const Room = (props)=>{
    return(
        <div className={classes.roomdiv}>
            <h3 className={classes.roomheader}>{props.name}</h3>
            <p className={classes.roomcount}>Number of users in group are {props.users.length}</p>
            <button className={classes.roomjoin} onClick={props.click}>Join</button>
        </div>
    );
}

export default Room;