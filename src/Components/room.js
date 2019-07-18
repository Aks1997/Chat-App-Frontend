import React from 'react';

const Room = (props)=>{
    return(
        <div>
            <h3>{props.name}</h3>
            <p>Number of users in group are {props.users.length}</p>
            <button onClick={props.click}>Join</button>
        </div>
    );
}

export default Room;