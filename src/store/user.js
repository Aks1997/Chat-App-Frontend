import actions from '../Actions/actions';
import openSocket from 'socket.io-client';

const initialState = {
    socket: openSocket('http://localhost:4000'),
    _id: "",
    id: "",
    name: "Akhil",
    room: "Cricket"
}

const userReducer = (state = initialState, action)=>{
    switch(action.type){
        case actions.addUser:
            const newState = {...state};
            newState._id = action._id;
            newState.id = action.id;
            newState.name = action.name;
            newState.room = action.room;
            return newState;
        default:
            return state;
    }
}

export default userReducer;