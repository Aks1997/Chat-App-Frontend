import React from 'react';

import classes from './createRoom.module.css';

const createroom = (props)=>{
    return(
        <div className={classes.roomdiv}>
            <h1 className={classes.roomheader}>Create Room</h1>
            <div className={classes.roominputdiv}>
                <input className={classes.roominput} type="text" placeholder="Your Name" onChange={props.nameChangeHandler} required/>
                <input className={classes.roominput} type="text" placeholder="Room Name" onChange={props.roomChangeHandler} required/>
                <input className={classes.roominput} type="password" placeholder="Password" onChange={props.passChangeHandler} required/>
            </div>
            <button className={classes.roombutton} onClick={props.buttonClickedHandler}>Submit</button>
        </div>
    )
}

export default createroom;