import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import Message from '../Components/message';
import classes from './ChatRoom.module.css';
import OnlineUsers from '../Components/onlineuser';

class ChatRoom extends Component{

    state={
        messageTyped: "",
        messages: [],
        online: []
    }

    componentDidMount(){
        if(this.props.data._id===""){
            this.props.history.push('/');
        }

        this.props.data.socket.on('roomMessage', (obj)=>{
            this.addMessage(obj);
        });

        this.props.data.socket.on('userConnected', (obj)=>{
            this.addUser(obj);
        });

        this.props.data.socket.on('userDisconnected', (obj)=>{
            this.delUser(obj);
        });
        
        axios.get("http://localhost:4000/getrooms/getonlineusers",{params:{
            _id: this.props.data._id
        }})
            .then(res=>{
                console.log(res);
                if(res.status===200){
                    res.data.forEach(element => {
                        this.addUser(element); 
                     });
                }
            });
    }

    addUser(obj){
        const ob={key: obj.id, user: obj.name};
        this.setState({online: [...this.state.online, ob]});
    }

    delUser(obj){
        const ob = this.state.online.filter((value)=>{
            return obj.key!==value.key
        });
        this.setState({online: [...ob]});
    }

    addMessage(obj){
        console.log(obj);
        const ob={from: obj.from, message: obj.message, time: obj.time};
        this.setState({messages: [...this.state.messages, ob]});
    }

    componentWillUnmount(){
        this.props.data.socket.removeAllListeners('roomMessage');
        this.props.data.socket.removeAllListeners('userConnected');
        this.props.data.socket.removeAllListeners('userDisconnected');
    }

    messageChangeHandler(e){
        this.setState({messageTyped: e.target.value});
    }

    sendMessage(e){
        const mess=this.state.messageTyped;
        if(mess===""){
            return;
        }
        this.props.data.socket.emit('messageRecieved',{
            message: mess
        });
        this.setState({messageTyped: ""});
        this.addMessage({
            from: "Me",
            message: mess,
            time: new Date().getTime()
        })
    }

    keyPressed(e){
        if(e.key==='Enter'){
            this.sendMessage();
        }
    }

    render(){
        return(
            <div className={classes.chatroom_outer_div}>
                <div className={classes.chatroom_header_div}>
                    <p className={[classes.header, classes.header_name].join(' ')}>{this.props.data.name}</p>
                    <p className={[classes.header, classes.header_room].join(' ')}>Room: {this.props.data.room}</p>
                </div>
                <div className={classes.chatroom_content}>
                    <div className={[classes.chatroom_content_comp, classes.chatroom_content_online].join(' ')}>
                        {
                            this.state.online.map((value, index)=>{
                                return(
                                    <OnlineUsers key={value.key}
                                        user={value.user}/>
                                );
                            })
                        }
                    </div>
                    <div className={[classes.chatroom_content_comp, classes.chatroom_content_message].join(' ')}>
                        {this.state.messages.map((value, index)=>{
                            return(
                                <Message key={index}
                                    from={value.from}
                                    message={value.message}
                                    time={value.time}/>
                            );
                        })}
                    </div>
                </div>
                <div className={classes.chatroom_input_div}>
                    <input className={classes.chatroominput} type="text" value={this.state.messageTyped} onChange={(e)=>this.messageChangeHandler(e)}
                        onKeyDown={(e)=>this.keyPressed(e)}></input>
                    <button className={classes.chatroombutton} onClick={(e)=>this.sendMessage(e)}>Send</button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state=>{
    return{
        data: state
    }
}

export default connect(mapStateToProps, null)(ChatRoom);