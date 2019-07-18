import React from 'react';

const createroom = (props)=>{
    return(
        <div>
            <h1>Create Room</h1>
            <input type="text" placeholder="Your Name" onChange={props.nameChangeHandler} required/>
            <input type="text" placeholder="Room Name" onChange={props.roomChangeHandler} required/>
            <input type="password" placeholder="Password" onChange={props.passChangeHandler} required/>
            <button onClick={props.buttonClickedHandler}>Submit</button>
        </div>
    )
}

export default createroom;