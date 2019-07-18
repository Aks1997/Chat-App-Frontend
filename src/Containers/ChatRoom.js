import React, { Component } from 'react';
import { connect } from 'react-redux';

import Message from '../Components/message';
//import Classes from './ChatRoom.module.css';

class ChatRoom extends Component{

    state={
        messageTyped: "",
        messages: []
    }

    componentDidMount(){
        this.props.data.socket.on('roomMessage', (obj)=>{
            this.addMessage(obj);
        });
    }

    addMessage(obj){
        console.log(obj);
        const ob={from: obj.from, message: obj.message, time: obj.time};
        this.setState({messages: [...this.state.messages, ob]});
    }

    componentWillUnmount(){
        this.props.data.socket.removeAllListeners('roomMessage');
    }

    messageChangeHandler(e){
        this.setState({messageTyped: e.target.value});
    }

    sendMessage(e){
        const mess=this.state.messageTyped;
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
            <div>
                {this.state.messages.map((value, index)=>{
                    return(
                        <Message key={index}
                            from={value.from}
                            message={value.message}
                            time={value.time}/>
                    );
                })}
                <input type="text" value={this.state.messageTyped} onChange={(e)=>this.messageChangeHandler(e)}
                    onKeyDown={(e)=>this.keyPressed(e)}></input>
                <button onClick={(e)=>this.sendMessage(e)}>Send</button>
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