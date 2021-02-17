import React from 'react';
import '../styles/MessageList.css'
import likeImage from '../assets/like.png';

class Message extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      id: this.props.messageData.message.id,
      userId: this.props.messageData.message.userId,
      avatar: this.props.messageData.message.avatar,
      text: this.props.messageData.message.text,
      date: new Date(this.props.messageData.message.createdAt),
      // currentUserId: this.props.messageData.message.userId,
      isCurrentUserMessage: this.props.messageData.id === this.props.messageData.message.userId,
      isLiked: false,
    };
    this.likeMessage = this.likeMessage.bind(this);
  };

  getHours(){
    return this.state.date.getUTCHours();
  }

  getMinutes(){
    return this.state.date.getMinutes();
  }

  likeMessage(event){
    if(!this.state.isCurrentUserMessage){
      this.setState({
        isLiked: !this.state.isLiked,
      });
    }
  }
  
  render() {
    return (
      <div className={this.state.isCurrentUserMessage ? 'current-user-message-block' : 'user-message-block'}>
        <img className={this.state.isCurrentUserMessage ? 'user-avatar-hidden' : 'user-avatar'} src = {this.state.avatar} alt = "avatar"></img>
        <div onClick={(e) => this.likeMessage(e)} className = {this.state.isCurrentUserMessage ? 'message current-user-message' : 'message'}>
          <div className = 'message-block'>
            <p className = 'message-text'>{this.state.text}</p>
            <div className = 'message-date-block'>
              <p className = 'message-date'>{this.getHours()}:{this.getMinutes()}</p>
            </div>
          </div>
          <div className = {this.state.isLiked ? 'like-block' : 'like-block-hidden'}>
            <img className = 'like-icon' src = { likeImage } alt = 'like icon'></img>
          </div>
        </div>
      </div>
    )
  }
}

export default Message;