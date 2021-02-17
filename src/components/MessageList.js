import React from 'react';
import '../styles/MessageList.css';
import Message from './Message';
import DateLine from './DateLine';

class MessageList extends React.Component {
  constructor(props){
    super();
    this.state = {
      messageList: props.messagesData.messages,
      id: props.messagesData.id,
    };
    this.isNextDayBlock = this.isNextDayBlock.bind(this);
    this.getSortDate = this.getSortDate.bind(this);
  }

  getSortDate(message){
    return message.editedAt || message.createdAt;
  }

  isNextDayBlock(message){
    let index = this.state.messageList.indexOf(message);
    let currentmessage = this.state.messageList[index];
    let nextMessage = this.state.messageList[index + 1];
    return index === 0 ? true : nextMessage ? this.getSortDate(currentmessage) === this.getSortDate(nextMessage) : false;
  }

  render() {
    return (
      <div className = 'message-list'>
        {this.state.messageList.map(message => (
          <div key={message.id}>
            <div>
              <DateLine isVisible={!this.isNextDayBlock(message) ? false : true} date={ this.getSortDate(message) }></DateLine>
            </div>
            <Message messageData={{message: message, id: this.state.id}}></Message>
          </div>
        ))}
      </div>
    )
  }
}

export default MessageList;