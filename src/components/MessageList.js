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
    this.compareDates = this.compareDates.bind(this);
  }

  getSortDate(message){
    return message.editedAt || message.createdAt;
  }

  compareDates(date1, date2){
    let result = true;
    result = result && date1.getDate() === date2.getDate();
    result = result && date1.getMonth() === date2.getMonth();
    result = result && date1.getFullYear() === date2.getFullYear();
    return result;
  }

  isNextDayBlock(message){
    let index = this.state.messageList.indexOf(message);
    if(index === 0) return true;
    let currentmessage = this.state.messageList[index];
    let previousMessage = this.state.messageList[index - 1];
    let result = !this.compareDates(new Date(this.getSortDate(currentmessage)), new Date(this.getSortDate(previousMessage)));
    return result;
  }

  render() {
    return (
      <div className = 'message-list'>
        {this.state.messageList.map(message => (
          <div key={message.id}>
            <div>
              <DateLine isVisible={this.isNextDayBlock(message)} date={ this.getSortDate(message) }></DateLine>
            </div>
            <Message messageData={{message: message, id: this.state.id}}></Message>
          </div>
        ))}
      </div>
    )
  }
}

export default MessageList;