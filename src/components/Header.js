import React from 'react';
import '../styles/Header.css'

class Header extends React.Component {
  constructor(props){
    super();
    this.state = {
      chatName: 'My chat',
      usersCount: [...new Set(props.messages.map(message => message.userId))].length,
      messagesCount: props.messages.length,
      lastMessageTime: new Date(props.messages[props.messages.length - 1].editedAt || props.messages[props.messages.length - 1].createdAt)
    };
  }

  getHours(){
    return this.state.lastMessageTime.getHours();
  }

  getMinutes(){
    return this.state.lastMessageTime.getMinutes();
  }

  render() {
    return (
      <div className = 'header'>
        <div className = 'main-info'>
          <h3>{ this.state.chatName }</h3>
          <p>{ this.state.usersCount} participants</p>
          <p>{ this.state.messagesCount} messages</p>
        </div>
        <p>last message at {this.getHours()}:{this.getMinutes()}</p>
      </div>
    )
  }
}

export default Header;