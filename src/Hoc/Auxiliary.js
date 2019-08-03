import React,{ Component } from 'react';
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import actions from '../Actions/actions';
import Main from '../Containers/Main';
import Chatroom from '../Containers/ChatRoom';
import Popup from '../Components/popup';
import classes from './Auxiliary.module.css';

class Aux extends Component{

    state={
        popup: null
    }

    componentDidMount(){
        this.props.data.socket.on('roomCreationStatus', (obj)=>this.roomStatus(obj));
    }

    componentWillUnmount(){
        console.log("unmount");
        this.props.data.socket.removeListener('roomCreationStatus', (obj)=>this.roomStatus(obj));
    }

    roomStatus(obj){
        if(obj.status){
            this.props.onChangeDetails(obj._id, obj.id, obj.name, obj.room);
            console.log(this.props.data);
            this.props.data.socket.emit('setDetails', { 
                _id: obj._id,
                id: obj.id,
                name: obj.name,
                room: obj.room
            })
            console.log(obj);
            if(obj.type==="CREATE"){
                this.props.history.push({
                    pathname: "/room"
                })
            }else if(obj.type==="JOIN"){
                this.props.history.push({
                    pathname: "/room"
                })   
            }
        }
        else{
            this.createPopup(obj.message, "Close");
        }
    }

    createPopup(message, buttonMess){
        console.log("popup creation")
        const mess=<Popup message={message}
            buttonMess={buttonMess}
            closePopup={(e)=>this.closePopup(e)}/>
        this.setState({popup: mess});
    }

    closePopup(e){
        this.setState({popup: null});
    }   

    render(){
        return(
            <div className={classes.header}>
                {this.state.popup}
                <Route path="/" exact component={Main}/>
                <Route path="/room" exact component={Chatroom}/>
            </div>
        )   
    }
}

const mapStateToProps = state =>{
    return {
        data: state
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        onChangeDetails: (_id, id, name, room) => dispatch({type: actions.addUser, _id, id, name, room})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Aux));