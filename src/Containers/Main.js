import React, { Component } from 'react';
import { connect } from 'react-redux';

import Createroom from '../Components/createRoom';
import RoomList from './roomList';
import Popup from '../Components/popup';

class Main extends Component{

    state ={
        name:"",
        room:"",
        password:"",
        popup: null
    }

    nameChangeHandler(e){
        this.setState({name: e.target.value},function(){
            console.log(this.state.name);
        });
    }

    roomChangeHandler(e){
        this.setState({room: e.target.value},function(){
            console.log(this.state.room);
        });
    }

    passChangeHandler(e){
        this.setState({password: e.target.value},function(){
            console.log(this.state.password);
        });
    }

    buttonClickedHandler(e){
        if(this.state.name!=="" && this.state.room!=="" && this.state.password!==""){
            this.props.data.socket.emit('createRoom', {
                name: this.state.name,
                room: this.state.room,
                password: this.state.password
            });
        }
        else{
            this.createPopup("All Fields Required!", "Close");
        }
    }

    createPopup(message, buttonMess){
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
            <div>
                <Createroom nameChangeHandler={(e)=>this.nameChangeHandler(e)}
                    roomChangeHandler={(e)=>this.roomChangeHandler(e)}
                    passChangeHandler={(e)=>this.passChangeHandler(e)}
                    buttonClickedHandler={(e)=>this.buttonClickedHandler(e)}/>
                {this.state.popup}
                <RoomList/>
            </div>
        )
    }
}

const mapStateToProps = state =>{
    return {
        data: state
    }
}

export default connect(mapStateToProps, null)(Main);