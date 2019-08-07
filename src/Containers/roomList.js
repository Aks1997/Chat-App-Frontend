import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import Room from '../Components/room';
import Popup from '../Components/popup';
import classes from './roomList.module.css';
class RoomList extends Component{

    state={
        name:"",
        room:"",
        password:"",
        warning:"",
        base_url: "http://104.198.170.77:4000",
        rooms:[],
        roomsToShow:null,
        showpopup:false
    }

    componentDidMount(){
        axios.get(this.state.base_url+"/getrooms")
            .then(res=>{
                console.log(res);
                const data = res.data.map((value, index)=>{
                    return({
                        name: value.name,
                        users: value.users,
                        _id: value._id
                    });
                });
                this.setState({rooms: data}, ()=>{
                    const view = this.state.rooms.map((value, index)=>{
                        return(
                            <Room key={index}
                                _id={value._id}
                                name={value.name}
                                users={value.users}
                                click={(e)=>this.roomJoin(e, value.name)}/>
                        );
                    });
                    this.setState({roomsToShow: view});
                });
            })
            .catch(err=>{
                console.log(err);
            });
    }

    roomJoin(e, name){
        this.setState({showpopup: true, room: name, warning: ""});
    }

    nameChangeHandler(e){
        this.setState({name: e.target.value});
    }

    passChangeHandler(e){
        this.setState({password: e.target.value});
    }

    onSubmit(e){
        this.setState({warning: ""});
        if(this.state.name!=="" && this.state.password!==""){
            if(this.state.name.length>20){
                this.setState({warning: "Name length Can't exceed 20 characters"});
                return;
            }
            this.setState({showpopup: false}, ()=>{
                this.props.data.socket.emit('joinRoom', {
                    name: this.state.name,
                    room: this.state.room,
                    password: this.state.password
                });
            });
        }
        else{
            this.setState({warning: "Both Fields Are Mandatory!"});
        }
    }

    closePopup(e){
        this.setState({showpopup: false});
    }

    render(){

        const inp =<div>
                    <h4 className={classes.roomname}>Room: {this.state.room}</h4>
                    <input className={classes.roominput} type="text" placeholder="Your Name" onChange={(e)=>this.nameChangeHandler(e)}></input>
                    <br/>
                    <br/>
                    <input className={classes.roominput} type="password" placeholder="password" onChange={(e)=>this.passChangeHandler(e)}></input>
                    <br/>
                    <button className={classes.btn} onClick={(e)=>this.onSubmit(e)}>Submit</button>
                </div>;

        return(
            <div className={classes.roomlistdiv}>
                {this.state.showpopup ?
                    <Popup
                    buttonMess={"Close"}
                    closePopup={(e)=>this.closePopup(e)}
                    warning={this.state.warning}>
                        {inp}
                    </Popup>   :
                    null 
                }
                {this.state.roomsToShow}
            </div>    
        );
    }
}

const mapStateToProps = state =>{
    return{
        data: state
    }
}

export default connect(mapStateToProps, null)(RoomList);