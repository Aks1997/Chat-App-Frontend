import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import Room from '../Components/room';
import Popup from '../Components/popup';

class RoomList extends Component{

    state={
        name:"",
        room:"",
        password:"",
        warning:"",
        base_url: "http://localhost:4000",
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
                    <h4>Room: {this.state.room}</h4>
                    <input type="text" placeholder="Your Name" onChange={(e)=>this.nameChangeHandler(e)}></input>
                    <br/>
                    <br/>
                    <input type="password" placeholder="password" onChange={(e)=>this.passChangeHandler(e)}></input>
                    <br/>
                    <button onClick={(e)=>this.onSubmit(e)}>Submit</button>
                </div>;

        return(
            <div>
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